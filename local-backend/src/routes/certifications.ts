import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { readJsonFile, writeJsonFile } from '../store.js';

const certLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests.' },
});

interface CertNode {
  id: string;
  label: string;
  year?: number;
  description?: string;
  prerequisites?: string[];
  status: string;
  xp?: number;
  resources?: { title: string; url?: string }[];
}

interface CertTree {
  id: string;
  title: string;
  description?: string;
  nodes: CertNode[];
}

const router = Router();

router.get('/api/certifications', certLimiter, async (_req, res) => {
  try {
    const data = await readJsonFile<CertTree>('certifications.json');
    res.json(data);
  } catch {
    res.status(404).json({ error: 'No certifications found' });
  }
});

router.patch('/api/certifications/:id', certLimiter, async (req, res) => {
  const id = req.params.id;
  const payload = req.body;

  try {
    const json = await readJsonFile<CertTree>('certifications.json');
    if (json.id !== id) {
      return res.status(400).json({ error: 'ID mismatch' });
    }

    const updates: CertNode[] = payload.nodes || [];
    const nodesMap = new Map(json.nodes.map((n) => [n.id, n]));
    updates.forEach((u) => {
      const existing = nodesMap.get(u.id) || {} as CertNode;
      nodesMap.set(u.id, { ...existing, ...u });
    });
    json.nodes = Array.from(nodesMap.values());

    await writeJsonFile('certifications.json', json);
    res.json(json);
  } catch {
    res.status(500).json({ error: 'Failed to update certifications' });
  }
});

export default router;
