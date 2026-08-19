import { Badge } from '@/components/ui/Badge';
import { OrderStatus } from '@/types';
import { Clock, CheckCircle2, CreditCard, PackageCheck, RotateCcw, XCircle, User, LucideIcon } from 'lucide-react';

interface StatusConfig {
  label: string;
  variant: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'blue';
  icon: LucideIcon;
  iconClass: string;
}

const STATUS_CONFIG: Record<OrderStatus, StatusConfig> = {
  PLACED: { label: 'New Request', variant: 'warning', icon: Clock, iconClass: 'text-amber-600' },
  CONFIRMED: { label: 'Awaiting Payment', variant: 'blue', icon: CreditCard, iconClass: 'text-blue-600' },
  PAID: { label: 'Paid · Ready', variant: 'purple', icon: PackageCheck, iconClass: 'text-purple-600' },
  PICKED_UP: { label: 'In Use', variant: 'success', icon: User, iconClass: 'text-emerald-600' },
  RETURNED: { label: 'Completed', variant: 'default', icon: RotateCcw, iconClass: 'text-ink-soft' },
  CANCELLED: { label: 'Cancelled', variant: 'danger', icon: XCircle, iconClass: 'text-red-600' },
};

export default function StatusBadge({ status }: { status: OrderStatus | string }) {
  const cfg: StatusConfig =
    STATUS_CONFIG[status as OrderStatus] ?? {
      label: status,
      variant: 'default',
      icon: CheckCircle2,
      iconClass: 'text-ink-soft',
    };
  const Icon = cfg.icon;
  return (
    <Badge variant={cfg.variant} className="gap-1">
      <Icon size={12} className={cfg.iconClass} />
      {cfg.label}
    </Badge>
  );
}