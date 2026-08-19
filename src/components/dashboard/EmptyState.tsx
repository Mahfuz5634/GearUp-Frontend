import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`p-12 text-center flex flex-col items-center ${className}`}>
      <div className="w-20 h-20 bg-line/60 rounded-full flex items-center justify-center text-ink-soft mb-5">
        <Icon size={32} />
      </div>
      <h3 className="text-xl font-bold text-ink mb-2">{title}</h3>
      {description && <p className="text-ink-soft max-w-md mb-6">{description}</p>}
      {action}
    </div>
  );
}