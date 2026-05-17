import { randomUUID, scryptSync, timingSafeEqual } from 'node:crypto';
import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { readJsonFile, writeJsonFile } from './store.js';
import type { AdminUser, Inquiry, Service, Testimonial } from './types.js';

const app = express();
const PORT = Number(process.env.PORT || 3001);
const sessions = new Map<string, { userId: string; expiresAt: number }>();

app.use(cors());
app.use(express.json({ limit: '100kb' }));

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Try again later.' },
});

const adminLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please wait and retry.' },
});

type InquiryStore = { inquiries: Inquiry[] };
type ServicesStore = { services: Service[] };
type TestimonialsStore = { testimonials: Testimonial[] };
type AdminUsersStore = { admin_users: AdminUser[] };

function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, expectedHash] = storedHash.split(':');
  if (!salt || !expectedHash) {
    return false;
  }

  const calculated = scryptSync(password, salt, 64).toString('hex');
  const calculatedBuf = Buffer.from(calculated, 'hex');
  const expectedBuf = Buffer.from(expectedHash, 'hex');

  if (calculatedBuf.length !== expectedBuf.length) {
    return false;
  }

  return timingSafeEqual(calculatedBuf, expectedBuf);
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const session = sessions.get(token);
  if (!session || session.expiresAt < Date.now()) {
    sessions.delete(token);
    return res.status(401).json({ error: 'Session expired' });
  }

  next();
}

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/services', async (_req, res) => {
  const db = await readJsonFile<ServicesStore>('services.json');
  res.json(db.services);
});

app.get('/api/testimonials', async (_req, res) => {
  const db = await readJsonFile<TestimonialsStore>('testimonials.json');
  res.json(db.testimonials);
});

app.post('/api/inquiries', async (req, res) => {
  const payload = req.body as Partial<Inquiry>;
  const requiredFields = ['name', 'email', 'phone', 'business_name', 'business_stage', 'message'];

  for (const field of requiredFields) {
    if (!payload[field as keyof Inquiry]) {
      return res.status(400).json({ error: `Missing field: ${field}` });
    }
  }

  const allowedStages = ['idea', 'early', 'growing', 'established'];
  if (!allowedStages.includes(String(payload.business_stage))) {
    return res.status(400).json({ error: 'Invalid business_stage' });
  }

  const now = new Date().toISOString();
  const db = await readJsonFile<InquiryStore>('inquiries.json');

  const inquiry: Inquiry = {
    id: randomUUID(),
    name: String(payload.name),
    email: String(payload.email),
    phone: String(payload.phone),
    business_name: String(payload.business_name),
    business_stage: payload.business_stage as Inquiry['business_stage'],
    services_interested: Array.isArray(payload.services_interested)
      ? payload.services_interested.map(String)
      : [],
    message: String(payload.message),
    status: 'new',
    admin_notes: '',
    created_at: now,
    updated_at: now,
  };

  db.inquiries.unshift(inquiry);
  await writeJsonFile('inquiries.json', db);
  res.status(201).json({ success: true, inquiry });
});

app.post('/api/admin/login', loginLimiter, async (req, res) => {
  const { username, password } = req.body as { username?: string; password?: string };
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password are required' });
  }

  const db = await readJsonFile<AdminUsersStore>('admin_users.json');
  const user = db.admin_users.find((u) => u.username === username);

  if (!user || !verifyPassword(password, user.password_hash)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = randomUUID();
  sessions.set(token, { userId: user.id, expiresAt: Date.now() + 2 * 60 * 60 * 1000 });

  res.json({
    token,
    user: {
      id: user.id,
      username: user.username,
    },
  });
});

app.get('/api/inquiries', requireAdmin, adminLimiter, async (_req, res) => {
  const db = await readJsonFile<InquiryStore>('inquiries.json');
  res.json(db.inquiries);
});

app.patch('/api/inquiries/:id', requireAdmin, adminLimiter, async (req, res) => {
  const { id } = req.params;
  const { status, admin_notes } = req.body as { status?: Inquiry['status']; admin_notes?: string };

  const db = await readJsonFile<InquiryStore>('inquiries.json');
  const inquiry = db.inquiries.find((item) => item.id === id);

  if (!inquiry) {
    return res.status(404).json({ error: 'Inquiry not found' });
  }

  if (status && ['new', 'in_progress', 'closed'].includes(status)) {
    inquiry.status = status;
  }

  if (typeof admin_notes === 'string') {
    inquiry.admin_notes = admin_notes;
  }

  inquiry.updated_at = new Date().toISOString();
  await writeJsonFile('inquiries.json', db);
  res.json({ success: true, inquiry });
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Local backend running on http://localhost:${PORT}`);
});
