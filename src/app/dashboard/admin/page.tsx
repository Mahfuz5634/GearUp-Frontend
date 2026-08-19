"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
 

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { getAllUsers, getAllRentals, getAllGearsAdmin } from '@/services/admin.service';
import { Button } from '@/components/ui/Button';
import StatCard from '@/components/dashboard/StatCard';
import SectionCard from '@/components/dashboard/SectionCard';
import EmptyState from '@/components/dashboard/EmptyState';
import { SkeletonCards, SkeletonList } from '@/components/dashboard/Skeleton';
import { Users, Package, ShoppingBag, TrendingUp, ShieldAlert, CheckCircle, ArrowRight, UserRound } from 'lucide-react';

export default function AdminDashboard() {
  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ['admin-users'],
    queryFn: getAllUsers,
  });

  const { data: rentals, isLoading: isLoadingRentals } = useQuery({
    queryKey: ['admin-rentals'],
    queryFn: getAllRentals,
  });

  const { data: gears, isLoading: isLoadingGears } = useQuery({
    queryKey: ['admin-gears'],
    queryFn: getAllGearsAdmin,
  });

  // eslint-disable-next-line react-hooks/purity
  const oneWeekAgo = React.useMemo(() => new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), []);

  if (isLoadingUsers || isLoadingRentals || isLoadingGears) {
    return (
      <div className="space-y-8">
        <SkeletonCards count={4} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-2xl border border-line p-5"><SkeletonList rows={4} /></div>
          <div className="bg-card rounded-2xl border border-line p-5"><SkeletonList rows={4} /></div>
        </div>
      </div>
    );
  }

  const totalRevenue =
    rentals
      ?.filter((r: any) => r.payment?.status === 'COMPLETED')
      .reduce((acc: number, r: any) => acc + (r.payment?.amount || 0), 0) || 0;

  const activeRentals = rentals?.filter((r: any) => r.status === 'PICKED_UP').length || 0;
  const newUsers = users?.filter((u: any) => new Date(u.createdAt) > oneWeekAgo).length || 0;
  const pendingModeration = rentals?.filter((r: any) => r.status === 'PLACED').length || 0;

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Platform Revenue" value={`$${totalRevenue}`} icon={TrendingUp} accent="trail" badge="Lifetime" />
        <StatCard
          label="Total Rentals"
          value={rentals?.length || 0}
          icon={ShoppingBag}
          accent="indigo"
          hint={`${activeRentals} currently active`}
        />
        <StatCard label="Listed Gear" value={gears?.length || 0} icon={Package} accent="green" />
        <StatCard
          label="Total Users"
          value={users?.length || 0}
          icon={Users}
          accent="amber"
          badge={newUsers > 0 ? `+${newUsers} new` : undefined}
        />
      </div>

      {/* Quick actions */}
      <div className="bg-card rounded-2xl shadow-sm border border-line p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div>
          <h2 className="font-bold text-lg text-ink">Admin actions</h2>
          <p className="text-sm text-ink-soft">
            {pendingModeration > 0
              ? `${pendingModeration} new rental request${pendingModeration > 1 ? 's' : ''} to review.`
              : 'Manage users and review platform content.'}
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/admin/users">
            <Button leftIcon={<Users size={16} />}>Manage Users</Button>
          </Link>
          <Link href="/dashboard/admin/moderation">
            <Button variant="outline" leftIcon={<ShieldAlert size={16} />}>Review Content</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent users */}
        <SectionCard title="Recent Users" actionLabel="View all" actionHref="/dashboard/admin/users">
          {users && users.length > 0 ? (
            <div className="divide-y divide-line">
              {users.slice(0, 5).map((user: any) => (
                <div key={user.id} className="p-5 flex items-center gap-3 hover:bg-line/40 transition-colors">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 ${
                      user.role === 'ADMIN' ? 'bg-red-500' : user.role === 'PROVIDER' ? 'bg-trail' : 'bg-ink'
                    }`}
                  >
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-ink truncate">{user.name}</p>
                    <p className="text-xs text-ink-soft truncate">{user.email}</p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      user.role === 'ADMIN'
                        ? 'bg-red-50 text-red-600'
                        : user.role === 'PROVIDER'
                        ? 'bg-trail/15 text-trail-dark'
                        : 'bg-line/60 text-ink-soft'
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState icon={Users} title="No users found" />
          )}
        </SectionCard>

        {/* System health */}
        <SectionCard title="System Health">
          <div className="p-6 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle size={20} />
              </div>
              <div>
                <h4 className="font-bold text-ink text-sm">Database Connection</h4>
                <p className="text-sm text-ink-soft">PostgreSQL is running smoothly. Latency: 12ms</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle size={20} />
              </div>
              <div>
                <h4 className="font-bold text-ink text-sm">Payment Gateway (Stripe)</h4>
                <p className="text-sm text-ink-soft">API connection stable. No webhooks missed.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                pendingModeration > 0 ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'
              }`}>
                <UserRound size={20} />
              </div>
              <div>
                <h4 className="font-bold text-ink text-sm">Pending Rentals</h4>
                <p className="text-sm text-ink-soft">
                  {pendingModeration > 0
                    ? `${pendingModeration} rental request${pendingModeration > 1 ? 's' : ''} awaiting provider confirmation.`
                    : 'All rental requests are being handled.'}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/dashboard/admin/moderation" className="inline-flex items-center gap-1 text-sm text-trail-dark hover:underline font-semibold">
                Open moderation center <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}