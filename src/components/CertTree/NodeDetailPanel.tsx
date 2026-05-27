import { motion } from 'framer-motion';
import type { CertNode } from '../../types/certification';

interface Props {
  node: CertNode | null;
  nodeMap: Map<string, CertNode>;
  onMarkComplete?: () => void;
}

export default function NodeDetailPanel({ node, nodeMap, onMarkComplete }: Props) {
  if (!node) {
    return (
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 text-center">
        <p className="text-slate-400 text-sm">Select a node to view details</p>
      </div>
    );
  }

  const isLocked = node.status === 'locked';
  const isInProgress = node.status === 'in_progress';
  const isCompleted = node.status === 'completed';

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-800 border border-slate-700/50 rounded-xl p-5 space-y-4"
    >
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-lg font-semibold text-white">
            {node.label} {node.year ? `— ${node.year}` : ''}
          </h4>
          <span className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${
            isCompleted
              ? 'bg-nandi-gold/20 text-nandi-gold'
              : isInProgress
              ? 'bg-nandi-orange/20 text-nandi-orange'
              : 'bg-slate-600/30 text-slate-400'
          }`}>
            {node.status.replace('_', ' ')}
          </span>
        </div>
        {isCompleted && (
          <span className="text-2xl" role="img" aria-label="completed">&#10004;</span>
        )}
      </div>

      {node.description && (
        <p className="text-sm text-slate-300 leading-relaxed">{node.description}</p>
      )}

      {node.prerequisites && node.prerequisites.length > 0 && (
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wide">Prerequisites</p>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {node.prerequisites.map((p) => {
              const prereqNode = nodeMap.get(p);
              return (
                <span key={p} className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded">
                  {prereqNode?.label || p}
                </span>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex gap-2 pt-2">
        {isInProgress && onMarkComplete && (
          <button
            onClick={onMarkComplete}
            className="px-4 py-2 bg-nandi-gold hover:bg-nandi-gold/80 text-black text-sm font-semibold rounded-lg transition-colors"
          >
            Mark complete
          </button>
        )}
        {isLocked && (
          <p className="text-xs text-slate-400 italic">Complete prerequisites first</p>
        )}
        {isCompleted && (
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-nandi-blue text-white text-sm font-medium rounded-lg hover:bg-nandi-blue/80 transition-colors"
          >
            View certificate
          </button>
        )}
      </div>
    </motion.div>
  );
}
