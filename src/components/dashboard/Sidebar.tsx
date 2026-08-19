'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { Role } from '@/types';
import { Button } from '@/components/ui/Button';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Plus,
  Users,
  ShieldCheck,
  Compass,
  X,
  LogOut,
  LucideIcon,
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
}

const NAV_BY_ROLE: Record<Role, NavItem[]> = {
  CUSTOMER: [
    { href: '/dashboard/customer', label: 'Overview', icon: LayoutDashboard, exact: true },
    { href: '/gear', label: 'Browse Gear', icon: Compass },
  ],
  PROVIDER: [
    { href: '/dashboard/provider', label: 'Overview', icon: LayoutDashboard, exact: true },
    { href: '/dashboard/provider/orders', label: 'Orders', icon: ShoppingCart },
    { href: '/dashboard/provider/gear', label: 'My Gear', icon: Package },
    { href: '/dashboard/provider/gear/new', label: 'Add New Gear', icon: Plus, exact: true },
  ],
  ADMIN: [
    { href: '/dashboard/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
    { href: '/dashboard/admin/users', label: 'Manage Users', icon: Users },
    { href: '/dashboard/admin/moderation', label: 'Moderation', icon: ShieldCheck },
  ],
};

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  if (!user) return null;

  const items = NAV_BY_ROLE[user.role] || NAV_BY_ROLE.CUSTOMER;

  const isActive = (item: NavItem) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  const linkClass = (item: NavItem) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
      isActive(item) ? 'bg-ink text-white shadow-sm' : 'text-ink-soft hover:text-ink hover:bg-line/40'
    }`;

  const initials =
    (user.name || 'U')
      .split(' ')
      .map((w) => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'U';

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const content = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-4 border-b border-line lg:hidden">
        <p className="font-display text-lg text-ink">Menu</p>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-ink-soft hover:text-ink hover:bg-line/40"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {items.map((item) => (
          <Link key={item.href} href={item.href} onClick={onClose} className={linkClass(item)}>
            <item.icon size={18} />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-line space-y-2">
        <div className="flex items-center gap-3 px-3 py-2">
          <span className="w-9 h-9 rounded-full bg-ink text-trail flex items-center justify-center text-sm font-bold">
            {initials}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-bold text-ink truncate">{user.name}</p>
            <p className="text-xs text-ink-soft capitalize">{user.role.toLowerCase()}</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          leftIcon={<LogOut size={16} />}
          onClick={handleLogout}
        >
          Log out
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block w-60 shrink-0 border-r border-line bg-card sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
        {content}
      </aside>

      {open && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={onClose} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-card border-r border-line shadow-xl">
            {content}
          </aside>
        </div>
      )}
    </>
  );
}