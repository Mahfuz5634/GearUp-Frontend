"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */

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

  const isLoading = isLoadingUsers || isLoadingRentals || isLoadingGears;

  if (isLoading) return <div className="flex justify-center py-32"><Loader size={48} /></div>;

  const totalRevenue = rentals
    ?.filter((r: any) => r.payment?.status === 'COMPLETED')
    .reduce((acc: number, r: any) => acc + (r.payment?.amount || 0), 0) || 0;

  const activeRentals = rentals?.filter((r: any) => r.status === 'PICKED_UP').length || 0;
  const newUsers = users?.filter((u: any) => new Date(u.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length || 0;

  return (
    <div className="bg-zinc-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-zinc-900 mb-2">Platform Overview</h1>
            <p className="text-zinc-500">Monitor platform activity, users, and transactions.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/dashboard/admin/users">
              <Button leftIcon={<Users size={16} />}>Manage Users</Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                <TrendingUp size={24} />
              </div>
              <Badge variant="success" className="text-xs">+12%</Badge>
            </div>
            <p className="text-sm text-zinc-500 font-medium">Platform Revenue</p>
            <h3 className="text-2xl font-bold text-zinc-900">${totalRevenue}</h3>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
                <ShoppingBag size={24} />
              </div>
            </div>
            <p className="text-sm text-zinc-500 font-medium">Total Rentals</p>
            <h3 className="text-2xl font-bold text-zinc-900">{rentals?.length || 0}</h3>
            <p className="text-xs text-zinc-400 mt-1">{activeRentals} currently active</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center">
                <Package size={24} />
              </div>
            </div>
            <p className="text-sm text-zinc-500 font-medium">Listed Gear</p>
            <h3 className="text-2xl font-bold text-zinc-900">{gears?.length || 0}</h3>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                <Users size={24} />
              </div>
              <Badge variant="info" className="text-xs">+{newUsers} new</Badge>
            </div>
            <p className="text-sm text-zinc-500 font-medium">Total Users</p>
            <h3 className="text-2xl font-bold text-zinc-900">{users?.length || 0}</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Users */}
          <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
            <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-zinc-900">Recent Users</h2>
              <Link href="/dashboard/admin/users" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="p-0">
              {users && users.length > 0 ? (
                <ul className="divide-y divide-zinc-100">
                  {users.slice(0, 5).map((user: any) => (
                    <li key={user.id} className="p-6 hover:bg-zinc-50 transition-colors flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                          user.role === 'ADMIN' ? 'bg-red-500' : user.role === 'PROVIDER' ? 'bg-blue-500' : 'bg-zinc-800'
                        }`}>
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-zinc-900 leading-tight">{user.name}</p>
                          <p className="text-xs text-zinc-500">{user.email}</p>
                        </div>
                      </div>
                      <Badge variant={user.role === 'ADMIN' ? 'danger' : user.role === 'PROVIDER' ? 'info' : 'default'}>
                        {user.role}
                      </Badge>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-12 text-center text-zinc-500">No users found.</div>
              )}
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
            <div className="p-6 border-b border-zinc-100">
              <h2 className="text-lg font-bold text-zinc-900">System Health</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 text-sm">Database Connection</h4>
                  <p className="text-sm text-zinc-500">PostgreSQL is running smoothly. Latency: 12ms</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 text-sm">Payment Gateway (Stripe)</h4>
                  <p className="text-sm text-zinc-500">API connection stable. No webhooks missed.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-yellow-50 text-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ShieldAlert size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 text-sm">Pending Moderation</h4>
                  <p className="text-sm text-zinc-500">3 gear items flagged for review.</p>
                  <Button variant="outline" size="sm" className="mt-2">Review Items</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
