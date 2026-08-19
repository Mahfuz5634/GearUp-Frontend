import { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface SectionCardProps {
  title: string;
  children: ReactNode;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

export default function SectionCard({
  title,
  children,
  actionLabel,
  actionHref,
  className = '',
}: SectionCardProps) {
  return (
    <div className={`bg-card rounded-2xl shadow-sm border border-line overflow-hidden ${className}`}>
      <div className="p-5 border-b border-line flex items-center justify-between">
        <h2 className="font-bold text-lg text-ink">{title}</h2>
        {actionLabel && actionHref && (
          <Link
            href={actionHref}
            className="text-sm text-trail-dark hover:underline flex items-center gap-1 font-semibold"
          >
            {actionLabel} <ArrowRight size={14} />
          </Link>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}