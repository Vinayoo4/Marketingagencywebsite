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

export interface AdminUser {
  id: string;
  username: string;
  password_hash: string;
  created_at: string;
}
