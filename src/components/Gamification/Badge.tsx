interface Props {
  label: string;
  icon?: string;
  earned?: boolean;
}

export default function Badge({ label, icon, earned = true }: Props) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${
        earned
          ? 'bg-nandi-gold/15 border-nandi-gold/30 text-nandi-gold'
          : 'bg-slate-700/50 border-slate-600/30 text-slate-500'
      }`}
    >
      {icon && <span className="text-sm">{icon}</span>}
      {label}
    </div>
  );
}
