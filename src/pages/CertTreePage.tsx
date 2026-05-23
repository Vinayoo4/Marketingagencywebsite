import CertTree from '../components/CertTree/CertTree';
import NarrativePanel from '../components/Narrative/NarrativePanel';
import Badge from '../components/Gamification/Badge';
import { useEffect, useState } from 'react';
import type { MetricSummary } from '../types/certification';

const sampleMetrics: MetricSummary[] = [
  { ctrChange: 12, leadsGenerated: 48, revenueChange: 22, period: 'Q1 2026' },
  { ctrChange: -8, leadsGenerated: 32, revenueChange: 5, period: 'Q2 2026' },
  { ctrChange: 18, leadsGenerated: 62, revenueChange: 35, period: 'Q3 2026' },
];

export default function CertTreePage() {
  const [currentMetric, setCurrentMetric] = useState<MetricSummary>(sampleMetrics[0]);

  useEffect(() => {
    document.title = 'Certifications — Shri Nandi Agency';
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-slate-100 px-4 py-24 md:py-28">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Growth Intelligence</h1>
            <p className="text-slate-400 text-sm mt-1">Certification progression &amp; performance narrative</p>
          </div>
          <div className="hidden md:flex gap-2">
            <Badge label="Apprentice" icon="&#9733;" />
            <Badge label="Strategist" icon="&#9733;" earned={false} />
          </div>
        </div>

        <CertTree />

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Narrative Analytics</h3>
          <div className="flex gap-2">
            {sampleMetrics.map((m, i) => (
              <button
                key={i}
                onClick={() => setCurrentMetric(m)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  currentMetric === m
                    ? 'bg-nandi-pink/20 text-nandi-pink border border-nandi-pink/30'
                    : 'bg-slate-800 text-slate-400 border border-slate-700/30 hover:bg-slate-700'
                }`}
              >
                {m.period}
              </button>
            ))}
          </div>
          <NarrativePanel metrics={currentMetric} />
        </div>
      </div>
    </main>
  );
}
