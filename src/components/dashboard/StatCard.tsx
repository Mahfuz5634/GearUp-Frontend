import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  accent?: 'trail' | 'green' | 'indigo' | 'amber' | 'red';
  hint?: string;
  badge?: string;
}

const ACCENTS: Record<string, string> = {
  trail: 'bg-trail/10 text-trail-dark',
  green: 'bg-emerald-50 text-emerald-600',
  indigo: 'bg-indigo-50 text-indigo-600',
  amber: 'bg-amber-50 text-amber-600',
  red: 'bg-red-50 text-red-600',
};

export default function StatCard({
  label,
  value,
  icon: Icon,
  accent = 'trail',
  hint,
  badge,
}: StatCardProps) {
  return (
    <div className="bg-card p-5 rounded-2xl shadow-sm border border-line hover:border-trail/30 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${ACCENTS[accent]}`}>
          <Icon size={22} />
        </div>
        {badge && (
          <span className="text-xs font-semibold text-ink-soft bg-line/60 px-2 py-1 rounded-full">
            {badge}
          </span>
        )}
      </div>
      <p className="text-sm text-ink-soft font-medium">{label}</p>
      <p className="font-display text-2xl text-ink tracking-tight mt-1">{value}</p>
      {hint && <p className="text-xs text-ink-soft mt-1.5">{hint}</p>}
    </div>
  );
}