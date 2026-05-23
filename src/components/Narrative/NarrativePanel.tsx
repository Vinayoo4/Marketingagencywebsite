import { motion } from 'framer-motion';
import type { MetricSummary } from '../../types/certification';

interface Props {
  metrics?: MetricSummary;
}

function generateSummary(m: MetricSummary): string {
  const parts: string[] = [];
  const period = m.period ? ` in ${m.period}` : '';

  if (m.ctrChange !== undefined) {
    if (m.ctrChange > 0) {
      parts.push(`CTR improved by ${Math.abs(m.ctrChange)}%${period} — continue scaling top-performing creatives and increasing budget on winning segments.`);
    } else if (m.ctrChange < 0) {
      parts.push(`CTR dropped by ${Math.abs(m.ctrChange)}%${period}. Recommended action: A/B test headlines and review audience targeting.`);
    }
  }

  if (m.revenueChange !== undefined) {
    if (m.revenueChange > 0) {
      parts.push(`Revenue grew ${m.revenueChange}% — strong ROI alignment.`);
    } else if (m.revenueChange < 0) {
      parts.push(`Revenue declined ${Math.abs(m.revenueChange)}% — review pricing strategy and campaign mix.`);
    }
  }

  if (m.leadsGenerated !== undefined) {
    parts.push(`${m.leadsGenerated} leads generated${period}.`);
  }

  if (parts.length === 0) {
    return 'No metrics available for the selected period.';
  }

  return parts.join(' ');
}

export default function NarrativePanel({ metrics }: Props) {
  if (!metrics) {
    return (
      <div className="bg-slate-800/40 border border-slate-700/30 rounded-xl p-5">
        <p className="text-sm text-slate-400">Select a node to view narrative insights</p>
      </div>
    );
  }

  const summary = generateSummary(metrics);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-nandi-pink/10 to-nandi-blue/5 border border-nandi-pink/20 rounded-xl p-5 space-y-3"
    >
      <h4 className="text-sm font-semibold text-nandi-pink uppercase tracking-wider">Narrative Summary</h4>
      <div className="flex items-start gap-3">
        <div className="w-1.5 h-full min-h-[3rem] bg-nandi-pink/30 rounded-full shrink-0" />
        <p className="text-sm text-slate-200 leading-relaxed">{summary}</p>
      </div>
    </motion.div>
  );
}
