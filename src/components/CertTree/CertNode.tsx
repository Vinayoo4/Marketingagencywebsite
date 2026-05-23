import { motion } from 'framer-motion';
import type { CertNode } from '../../types/certification';

interface Props {
  node: CertNode;
  index: number;
  onClick: () => void;
}

export default function CertNodeView({ node, index, onClick }: Props) {
  const isCompleted = node.status === 'completed';
  const isInProgress = node.status === 'in_progress';
  const isLocked = node.status === 'locked';

  const bg = isCompleted
    ? 'bg-nandi-gold'
    : isInProgress
    ? 'bg-nandi-orange'
    : 'bg-slate-700';

  const ring = isCompleted
    ? 'ring-2 ring-nandi-gold/50'
    : isInProgress
    ? 'ring-2 ring-nandi-orange/50'
    : '';

  return (
    <motion.button
      onClick={onClick}
      className={`relative flex flex-col items-center gap-1 ${isLocked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
      whileHover={isLocked ? undefined : { scale: 1.08 }}
      whileTap={isLocked ? undefined : { scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      aria-pressed={isCompleted}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
    >
      <motion.div
        className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center ${bg} ${ring} shadow-lg transition-shadow`}
        animate={
          isCompleted
            ? { boxShadow: ['0 0 8px #BF9113', '0 0 20px #BF9113', '0 0 8px #BF9113'] }
            : isInProgress
            ? { scale: [1, 1.03, 1] }
            : {}
        }
        transition={
          isCompleted
            ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            : isInProgress
            ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            : {}
        }
      >
        <span className="text-xs md:text-sm font-bold text-white drop-shadow-sm">
          {node.label}
        </span>
      </motion.div>
      <span className={`text-[10px] md:text-xs font-medium ${
        isCompleted ? 'text-nandi-gold' : isInProgress ? 'text-nandi-orange' : 'text-slate-500'
      }`}>
        {node.year || ''}
      </span>
    </motion.button>
  );
}
