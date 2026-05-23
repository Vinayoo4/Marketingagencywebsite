import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { CertificationTree, CertNode } from '../../types/certification';
import CertNodeView from './CertNode';
import NodeDetailPanel from './NodeDetailPanel';
import XPBar from '../Gamification/XPBar';
import { getLevel } from '../../constants/levels';

export default function CertTree() {
  const [tree, setTree] = useState<CertificationTree | null>(null);
  const [activeNode, setActiveNode] = useState<CertNode | null>(null);
  const [xp, setXp] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'chronological' | 'bfs'>('chronological');
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/certifications')
      .then((r) => r.json())
      .then((d: CertificationTree) => {
        setTree(d);
        const total = d.nodes.reduce((s, n) => s + (n.xp || 0), 0);
        setXp(total);
      })
      .catch(() => setTree(null));
  }, []);

  const markComplete = useCallback(async (nodeId: string) => {
    if (!tree) return;
    const updatedNodes = tree.nodes.map((n) =>
      n.id === nodeId ? { ...n, status: 'completed' as const } : n
    );
    const res = await fetch(`/api/certifications/${tree.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nodes: updatedNodes }),
    });
    if (!res.ok) return;
    const updated: CertificationTree = await res.json();
    setTree(updated);
    const total = updated.nodes.reduce((s, n) => s + (n.xp || 0), 0);
    const prevLevel = getLevel(xp);
    setXp(total);
    const newLevel = getLevel(total);
    const gained = updated.nodes.find((n) => n.id === nodeId);
    if (gained?.xp) {
      const msg = newLevel > prevLevel
        ? `+${gained.xp} XP — Level ${newLevel}!`
        : `+${gained.xp} XP`;
      setToast(msg);
      setTimeout(() => setToast(null), 2500);
    }
    setActiveNode((prev) =>
      prev?.id === nodeId ? { ...prev, status: 'completed' } : prev
    );
  }, [tree, xp]);

  const orderedNodes = tree?.nodes
    ? viewMode === 'bfs'
      ? bfsTraversal(tree.nodes)
      : [...tree.nodes].sort((a, b) => (a.year || 0) - (b.year || 0))
    : [];

  if (!tree) {
    return (
      <div className="text-center py-16">
        <div className="w-10 h-10 border-2 border-nandi-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-400 text-sm">Loading certification tree...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-20 right-6 z-50 bg-nandi-gold text-black px-4 py-2 rounded-lg shadow-lg text-sm font-semibold"
        >
          {toast}
        </motion.div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">{tree.title}</h2>
          <p className="text-xs text-slate-400 mt-0.5">{tree.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('chronological')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              viewMode === 'chronological'
                ? 'bg-nandi-blue text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Chronological
          </button>
          <button
            onClick={() => setViewMode('bfs')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              viewMode === 'bfs'
                ? 'bg-nandi-blue text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            BFS
          </button>
        </div>
      </div>

      <div className="bg-slate-800/40 border border-slate-700/30 rounded-xl p-6">
        <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
          {orderedNodes.map((node, i) => (
            <div key={node.id} className="flex items-center gap-4 md:gap-8">
              <CertNodeView node={node} index={i} onClick={() => setActiveNode(node)} />
              {i < orderedNodes.length - 1 && (
                <svg className="w-8 md:w-12 h-1" viewBox="0 0 48 4" preserveAspectRatio="none">
                  <motion.line
                    x1="0" y1="2" x2="48" y2="2"
                    stroke={node.status === 'completed' ? '#BF9113' : '#475569'}
                    strokeWidth="2"
                    strokeDasharray="4 2"
                    initial={{ strokeDashoffset: 48 }}
                    animate={{
                      strokeDashoffset: node.status === 'completed' ? 0 : 48,
                    }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <NodeDetailPanel node={activeNode} onMarkComplete={() => activeNode && markComplete(activeNode.id)} />
        </div>
        <div>
          <XPBar xp={xp} />
        </div>
      </div>
    </div>
  );
}

function bfsTraversal(nodes: CertNode[]): CertNode[] {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  const visited = new Set<string>();
  const result: CertNode[] = [];
  const queue: string[] = [];

  const roots = nodes.filter((n) => !n.prerequisites || n.prerequisites.length === 0);
  roots.forEach((r) => { if (!visited.has(r.id)) { visited.add(r.id); queue.push(r.id); } });

  while (queue.length > 0) {
    const currentId = queue.shift()!;
    const current = nodeMap.get(currentId);
    if (current) result.push(current);
    const children = nodes.filter((n) => n.prerequisites?.includes(currentId));
    children.forEach((c) => {
      if (!visited.has(c.id)) { visited.add(c.id); queue.push(c.id); }
    });
  }
  return result;
}
