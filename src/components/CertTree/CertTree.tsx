import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../lib/api';
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
  const [patchError, setPatchError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getCertifications()
      .then((d) => {
        setTree(d);
        const total = d.nodes.reduce((s, n) => s + (n.xp || 0), 0);
        setXp(total);
      })
      .catch(() => {
        setTree(null);
        setPatchError('Failed to load certifications');
      })
      .finally(() => setLoading(false));
  }, []);

  const markComplete = useCallback(async (nodeId: string) => {
    if (!tree) return;
    setPatchError(null);

    const newStatusMap = new Map(tree.nodes.map(n => [n.id, n.status]));
    newStatusMap.set(nodeId, 'completed');

    let changed = true;
    while (changed) {
      changed = false;
      for (const n of tree.nodes) {
        if (newStatusMap.get(n.id) === 'locked') {
          const prereqs = n.prerequisites || [];
          const allCompleted = prereqs.every(p => newStatusMap.get(p) === 'completed');
          if (allCompleted) {
            newStatusMap.set(n.id, 'in_progress');
            changed = true;
          }
        }
      }
    }

    const updatedNodes = tree.nodes.map((n) => ({
      ...n,
      status: newStatusMap.get(n.id) as 'locked' | 'in_progress' | 'completed'
    }));
    try {
      const updated = await api.updateCertification(tree.id, { nodes: updatedNodes });
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
    } catch {
      setPatchError('Failed to update. Please try again.');
    }
  }, [tree, xp]);

  const nodeMap = new Map((tree?.nodes || []).map((n) => [n.id, n]));

  const orderedNodes = tree?.nodes
    ? viewMode === 'bfs'
      ? bfsTraversal(tree.nodes)
      : [...tree.nodes].sort((a, b) => (a.year || 0) - (b.year || 0))
    : [];

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="w-10 h-10 border-2 border-nandi-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-400 text-sm">Loading certification tree...</p>
      </div>
    );
  }

  if (!tree || patchError) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-400 text-sm">{patchError || 'No certification data available'}</p>
        <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-nandi-blue text-white text-sm rounded-lg hover:bg-nandi-blue/80 transition-colors">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 bg-nandi-gold text-black px-4 py-2 rounded-lg shadow-lg text-sm font-semibold"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {patchError && (
        <div className="bg-red-900/30 border border-red-500/30 text-red-300 text-sm px-4 py-2 rounded-lg">
          {patchError}
          <button onClick={() => setPatchError(null)} className="ml-2 underline">Dismiss</button>
        </div>
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
              <CertNodeView node={node} index={i} onClick={() => {
                setActiveNode(node);
                if (node.status === 'in_progress') {
                  markComplete(node.id);
                }
              }} />
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
          <NodeDetailPanel node={activeNode} nodeMap={nodeMap} onMarkComplete={() => activeNode && markComplete(activeNode.id)} />
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
  roots.forEach((r) => {
    if (!visited.has(r.id)) { visited.add(r.id); queue.push(r.id); }
  });

  while (queue.length > 0) {
    const currentId = queue.shift()!;
    const current = nodeMap.get(currentId);
    if (current) result.push(current);
    const children = nodes.filter((n) => n.prerequisites?.includes(currentId));
    for (const c of children) {
      if (!visited.has(c.id)) { visited.add(c.id); queue.push(c.id); }
    }
  }
  return result;
}
