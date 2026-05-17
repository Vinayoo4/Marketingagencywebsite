const API_BASE = (import.meta.env.VITE_API_BASE || '').replace(/\/$/, '');

function buildUrl(path: string): string {
  return API_BASE ? `${API_BASE}${path}` : path;
}

function getHeaders(): HeadersInit {
  const token = localStorage.getItem('snma_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(buildUrl(path), {
    method,
    headers: getHeaders(),
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const errorBody = (await res.json().catch(() => ({ error: 'Request failed' }))) as { error?: string };
    throw new ApiError(errorBody.error || `Request failed (${res.status})`, res.status);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  category: 'ecommerce_ops' | 'marketing' | 'branding' | 'ai_automation' | 'compliance';
  short_description: string;
  detailed_description: string;
  ideal_client: string;
  starting_price_inr: number;
  delivery_timeframe: string;
  highlights: string[];
  is_featured: boolean;
}

export interface Testimonial {
  id: string;
  client_name: string;
  company: string;
  project_type: string;
  quote: string;
  result_summary: string;
  metrics: {
    leads_increase_percent: number | null;
    revenue_increase_percent: number | null;
  };
  featured: boolean;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  business_name: string;
  business_stage: 'idea' | 'early' | 'growing' | 'established';
  services_interested: string[];
  message: string;
  status: 'new' | 'in_progress' | 'closed';
  admin_notes: string;
  created_at: string;
  updated_at: string;
}

export interface InquiryPayload {
  name: string;
  email: string;
  phone: string;
  business_name: string;
  business_stage: 'idea' | 'early' | 'growing' | 'established';
  services_interested: string[];
  message: string;
}

export interface AdminLoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
  };
}

export const api = {
  health: () => request<{ status: string }>('GET', '/health'),
  getServices: () => request<Service[]>('GET', '/api/services'),
  getTestimonials: () => request<Testimonial[]>('GET', '/api/testimonials'),
  createInquiry: (payload: InquiryPayload) => request<{ success: boolean; inquiry: Inquiry }>('POST', '/api/inquiries', payload),
  adminLogin: (username: string, password: string) =>
    request<AdminLoginResponse>('POST', '/api/admin/login', { username, password }),
  adminInquiries: () => request<Inquiry[]>('GET', '/api/inquiries'),
  adminUpdateInquiry: (id: string, data: Partial<Pick<Inquiry, 'status' | 'admin_notes'>>) =>
    request<{ success: boolean; inquiry: Inquiry }>('PATCH', `/api/inquiries/${id}`, data),
};
