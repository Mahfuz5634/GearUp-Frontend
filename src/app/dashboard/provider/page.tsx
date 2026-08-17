"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { getProviderOrders, getProviderGear } from '@/services/provider.service';
import { Loader } from '@/components/ui/Loader';
import { Button } from '@/components/ui/Button';
import { Package, ShoppingCart, DollarSign, Activity, Settings, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export default function ProviderDashboard() {
  const { data: orders, isLoading: isLoadingOrders } = useQuery({
    queryKey: ['provider-orders'],
    queryFn: getProviderOrders,
  });

  const { data: gears, isLoading: isLoadingGear } = useQuery({
    queryKey: ['provider-gear'],
    queryFn: getProviderGear,
  });

  if (isLoadingOrders || isLoadingGear) return <div className="flex justify-center py-32"><Loader size={48} /></div>;

  const totalEarnings = orders
    ?.filter((o: any) => o.status === 'PAID' || o.status === 'PICKED_UP' || o.status === 'RETURNED')
    .reduce((acc: number, order: any) => acc + (order.payment?.amount || 0), 0) || 0;

  const activeOrders = orders?.filter((o: any) => o.status !== 'RETURNED' && o.status !== 'CANCELLED').length || 0;
  const pendingConfirmations = orders?.filter((o: any) => o.status === 'PLACED').length || 0;

  return (
    <div className="bg-paper min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-display text-3xl text-ink tracking-tight mb-2">Provider Dashboard</h1>
            <p className="text-ink-soft">Manage your inventory, fulfill orders, and track earnings.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/dashboard/provider/gear">
              <Button variant="outline" leftIcon={<Package size={16} />}>My Gear</Button>
            </Link>
            <Link href="/dashboard/provider/orders">
              <Button leftIcon={<ShoppingCart size={16} />}>Manage Orders</Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card p-6 rounded-2xl shadow-sm border border-line">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-50 text-trail-dark rounded-full flex items-center justify-center">
                <DollarSign size={24} />
              </div>
              <div>
                <p className="text-sm text-ink-soft font-medium">Total Earnings</p>
                <h3 className="font-display text-2xl text-ink tracking-tight">${totalEarnings}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-card p-6 rounded-2xl shadow-sm border border-line">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-trail/10 text-trail-dark rounded-full flex items-center justify-center">
                <Activity size={24} />
              </div>
              <div>
                <p className="text-sm text-ink-soft font-medium">Active Rentals</p>
                <h3 className="font-display text-2xl text-ink tracking-tight">{activeOrders}</h3>
              </div>
            </div>
          </div>

          <div className="bg-card p-6 rounded-2xl shadow-sm border border-line">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center relative">
                <ShoppingCart size={24} />
                {pendingConfirmations > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </div>
              <div>
                <p className="text-sm text-ink-soft font-medium">Needs Attention</p>
                <h3 className="font-display text-2xl text-ink tracking-tight">{pendingConfirmations}</h3>
              </div>
            </div>
          </div>

          <div className="bg-card p-6 rounded-2xl shadow-sm border border-line">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                <Package size={24} />
              </div>
              <div>
                <p className="text-sm text-ink-soft font-medium">Listed Gear</p>
                <h3 className="font-display text-2xl text-ink tracking-tight">{gears?.length || 0}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders Snippet */}
          <div className="bg-card rounded-2xl shadow-sm border border-line overflow-hidden">
            <div className="p-6 border-b border-line flex justify-between items-center">
              <h2 className="text-lg font-bold text-ink">Recent Orders</h2>
              <Link href="/dashboard/provider/orders" className="text-sm text-trail-dark hover:underline flex items-center gap-1">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="p-0">
              {orders && orders.length > 0 ? (
                <ul className="divide-y divide-line">
                  {orders.slice(0, 5).map((order: any) => (
                    <li key={order.id} className="p-6 hover:bg-line/50 transition-colors flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-ink">{order.gear?.name}</p>
                        <p className="text-sm text-ink-soft">Customer: {order.customer?.name}</p>
                      </div>
                      <Badge variant={order.status === 'PLACED' ? 'warning' : 'default'}>
                        {order.status}
                      </Badge>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-12 text-center text-ink-soft">No recent orders.</div>
              )}
            </div>
          </div>

          {/* Setup Profile Snippet */}
          <div className="bg-card rounded-2xl shadow-sm border border-line overflow-hidden flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 bg-line/60 text-ink-soft rounded-full flex items-center justify-center mb-6">
              <Settings size={32} />
            </div>
            <h2 className="text-xl font-bold text-ink mb-2">Provider Settings</h2>
            <p className="text-ink-soft mb-6 max-w-sm">
              Update your payment information and payout settings to ensure you get paid on time.
            </p>
            <Button variant="outline">Manage Settings</Button>
          </div>
        </div>

      </div>
    </div>
  );
}
