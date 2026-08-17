'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { Compass, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <nav className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-9 h-9 rounded-xl bg-ink text-trail flex items-center justify-center shadow-sm">
            <Compass className="group-hover:rotate-45 transition-transform duration-500" size={22} />
          </span>
          <span className="text-2xl font-black text-ink tracking-tight">GearUp.</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/gear" className="text-sm font-semibold text-ink-soft hover:text-ink transition-colors">
            Browse Gear
          </Link>
          {user ? (
            <div className="flex items-center gap-4">
              <Link 
                href={`/dashboard/${user.role.toLowerCase()}`} 
                className="text-sm font-semibold text-ink-soft hover:text-ink transition-colors flex items-center gap-1"
              >
                <User size={16} /> Dashboard
              </Link>
              <Button 
                onClick={handleLogout} 
                variant="outline"
                size="sm"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/auth/login" className="text-sm font-semibold text-ink-soft hover:text-ink transition-colors">Login</Link>
              <Link href="/auth/register">
                <Button size="sm">Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}