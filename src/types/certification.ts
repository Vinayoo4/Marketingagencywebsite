export type NodeStatus = 'locked' | 'in_progress' | 'completed';

export interface CertNode {
  id: string;
  label: string;
  year?: number;
  description?: string;
  prerequisites?: string[];
  status: NodeStatus;
  xp?: number;
  resources?: { title: string; url?: string }[];
}

export interface CertificationTree {
  id: string;
  title: string;
  description?: string;
  nodes: CertNode[];
}

export interface MetricSummary {
  ctrChange?: number;
  leadsGenerated?: number;
  revenueChange?: number;
  campaignCount?: number;
  period?: string;
}
