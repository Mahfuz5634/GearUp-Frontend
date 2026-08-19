'use client';

import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import Sidebar from '@/components/dashboard/Sidebar';
import { Menu } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const firstName = user?.name?.split(' ')[0] || 'there';
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-paper flex">
      <Sidebar open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <div className="flex-1 min-w-0">
        <header className="sticky top-16 z-30 bg-paper/90 backdrop-blur border-b border-line px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDrawerOpen(true)}
                className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-ink hover:bg-line/40"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
              <div>
                <h1 className="font-display text-xl sm:text-2xl text-ink tracking-tight">
                  Hi, {firstName}!
                </h1>
                <p className="text-xs text-ink-soft hidden sm:block">{today}</p>
              </div>
            </div>
            <span className="text-xs sm:text-sm text-ink-soft capitalize hidden sm:inline">
              {user?.role.toLowerCase()} dashboard
            </span>
          </div>
        </header>
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}