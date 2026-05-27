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
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-slate-100 px-4 py-24 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10 pointer-events-none" />
      <div className="absolute top-20 left-[10%] w-[300px] h-[300px] bg-violet-500/10 rounded-full blur-[120px] animate-float-slow pointer-events-none" />
      <div className="absolute bottom-20 right-[10%] w-[250px] h-[250px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse-slow pointer-events-none" />
      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nandi-pink/10 border border-nandi-pink/20 text-xs text-nandi-pink mb-4">
              Track Your Growth
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white font-display">Growth Intelligence</h1>
            <p className="text-slate-400 text-sm mt-1">Certification progression &amp; performance narrative</p>
          </div>
          <div className="hidden md:flex gap-2">
            <Badge label="Apprentice" icon="&#9733;" />
            <Badge label="Strategist" icon="&#9733;" earned={false} />
          </div>
        </div>

        <div className="glass-card-solid p-6">
          <CertTree />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Narrative Analytics</h3>
          <div className="flex gap-2">
            {sampleMetrics.map((m, i) => (
              <button
                key={i}
                onClick={() => setCurrentMetric(m)}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                  currentMetric === m
                    ? 'bg-gradient-to-r from-nandi-pink/20 to-nandi-blue/20 text-nandi-pink border border-nandi-pink/30 shadow-lg'
                    : 'bg-slate-800 text-slate-400 border border-slate-700/30 hover:bg-slate-700 hover:text-slate-200'
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
