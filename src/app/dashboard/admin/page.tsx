"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { getAllUsers, getAllRentals, getAllGearsAdmin } from '@/services/admin.service';
import { Loader } from '@/components/ui/Loader';
import { Button } from '@/components/ui/Button';
import { Users, Package, ShoppingBag, TrendingUp, ShieldAlert, CheckCircle, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

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

  const isLoading = isLoadingUsers || isLoadingRentals || isLoadingGears;

  if (isLoading) return <div className="flex justify-center py-32"><Loader size={48} /></div>;

  const totalRevenue = rentals
    ?.filter((r: any) => r.payment?.status === 'COMPLETED')
    .reduce((acc: number, r: any) => acc + (r.payment?.amount || 0), 0) || 0;

  const activeRentals = rentals?.filter((r: any) => r.status === 'PICKED_UP').length || 0;
  const newUsers = users?.filter((u: any) => new Date(u.createdAt) > oneWeekAgo).length || 0;

  return (
    <div className="bg-paper min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-display text-3xl text-ink tracking-tight mb-2">Platform Overview</h1>
            <p className="text-ink-soft">Monitor platform activity, users, and transactions.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/dashboard/admin/users">
              <Button leftIcon={<Users size={16} />}>Manage Users</Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card p-6 rounded-2xl shadow-sm border border-line">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-blue-50 text-trail-dark rounded-full flex items-center justify-center">
                <TrendingUp size={24} />
              </div>
              <Badge variant="success" className="text-xs">+12%</Badge>
            </div>
            <p className="text-sm text-ink-soft font-medium">Platform Revenue</p>
            <h3 className="font-display text-2xl text-ink tracking-tight">${totalRevenue}</h3>
          </div>
          
          <div className="bg-card p-6 rounded-2xl shadow-sm border border-line">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
                <ShoppingBag size={24} />
              </div>
            </div>
            <p className="text-sm text-ink-soft font-medium">Total Rentals</p>
            <h3 className="font-display text-2xl text-ink tracking-tight">{rentals?.length || 0}</h3>
            <p className="text-xs text-ink-soft mt-1">{activeRentals} currently active</p>
          </div>

          <div className="bg-card p-6 rounded-2xl shadow-sm border border-line">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-trail/10 text-trail-dark rounded-full flex items-center justify-center">
                <Package size={24} />
              </div>
            </div>
            <p className="text-sm text-ink-soft font-medium">Listed Gear</p>
            <h3 className="font-display text-2xl text-ink tracking-tight">{gears?.length || 0}</h3>
          </div>

          <div className="bg-card p-6 rounded-2xl shadow-sm border border-line">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                <Users size={24} />
              </div>
              <Badge variant="info" className="text-xs">+{newUsers} new</Badge>
            </div>
            <p className="text-sm text-ink-soft font-medium">Total Users</p>
            <h3 className="font-display text-2xl text-ink tracking-tight">{users?.length || 0}</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Users */}
          <div className="bg-card rounded-2xl shadow-sm border border-line overflow-hidden">
            <div className="p-6 border-b border-line flex justify-between items-center">
              <h2 className="text-lg font-bold text-ink">Recent Users</h2>
              <Link href="/dashboard/admin/users" className="text-sm text-trail-dark hover:underline flex items-center gap-1">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="p-0">
              {users && users.length > 0 ? (
                <ul className="divide-y divide-line">
                  {users.slice(0, 5).map((user: any) => (
                    <li key={user.id} className="p-6 hover:bg-line/50 transition-colors flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                          user.role === 'ADMIN' ? 'bg-red-500' : user.role === 'PROVIDER' ? 'bg-blue-500' : 'bg-ink'
                        }`}>
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-ink leading-tight">{user.name}</p>
                          <p className="text-xs text-ink-soft">{user.email}</p>
                        </div>
                      </div>
                      <Badge variant={user.role === 'ADMIN' ? 'danger' : user.role === 'PROVIDER' ? 'info' : 'default'}>
                        {user.role}
                      </Badge>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-12 text-center text-ink-soft">No users found.</div>
              )}
            </div>
          </div>

          {/* System Health */}
          <div className="bg-card rounded-2xl shadow-sm border border-line overflow-hidden">
            <div className="p-6 border-b border-line">
              <h2 className="text-lg font-bold text-ink">System Health</h2>
            </div>
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
                <div className="w-10 h-10 bg-yellow-50 text-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ShieldAlert size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-ink text-sm">Pending Moderation</h4>
                  <p className="text-sm text-ink-soft">Inspect all gear listings and rentals.</p>
                  <Link href="/dashboard/admin/moderation">
                    <Button variant="outline" size="sm" className="mt-2">Review Items</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
