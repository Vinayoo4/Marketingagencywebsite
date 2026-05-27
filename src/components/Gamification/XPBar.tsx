import { motion } from 'framer-motion';
import { LEVELS, getLevel } from '../../constants/levels';

interface Props {
  xp: number;
}

export default function XPBar({ xp }: Props) {
  const level = getLevel(xp);
  const currentThreshold = LEVELS[level];
  const nextThreshold = LEVELS[level + 1] || LEVELS[LEVELS.length - 1];
  const pct = Math.min(100, Math.round(((xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100));

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 space-y-2">
      <h4 className="text-sm font-medium text-white">Progress</h4>
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>Level {level}</span>
        <span>{xp} XP</span>
      </div>
      <div className="w-full h-2.5 bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-nandi-olive to-nandi-gold rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
      <p className="text-[10px] text-slate-500">
        {nextThreshold - xp > 0 ? `${nextThreshold - xp} XP to next level` : 'Max level'}
      </p>
    </div>
  );
}
