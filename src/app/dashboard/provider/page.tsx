"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
 

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { getProviderOrders, getProviderGear } from '@/services/provider.service';
import { Button } from '@/components/ui/Button';
import StatCard from '@/components/dashboard/StatCard';
import SectionCard from '@/components/dashboard/SectionCard';
import StatusBadge from '@/components/dashboard/StatusBadge';
import EmptyState from '@/components/dashboard/EmptyState';
import { SkeletonCards, SkeletonList } from '@/components/dashboard/Skeleton';
import { Package, ShoppingCart, DollarSign, Activity, AlertTriangle, Plus, ArrowRight } from 'lucide-react';

export default function ProviderDashboard() {
  const { data: orders, isLoading: isLoadingOrders } = useQuery({
    queryKey: ['provider-orders'],
    queryFn: getProviderOrders,
  });

  const { data: gears, isLoading: isLoadingGear } = useQuery({
    queryKey: ['provider-gear'],
    queryFn: getProviderGear,
  });

  if (isLoadingOrders || isLoadingGear) {
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

  const totalEarnings =
    orders
      ?.filter((o: any) => o.status === 'PAID' || o.status === 'PICKED_UP' || o.status === 'RETURNED')
      .reduce((acc: number, order: any) => acc + (order.payment?.amount || 0), 0) || 0;

  const activeOrders = orders?.filter((o: any) => o.status !== 'RETURNED' && o.status !== 'CANCELLED').length || 0;
  const pendingConfirmations = orders?.filter((o: any) => o.status === 'PLACED').length || 0;

  const stockAlerts = (gears || []).filter(
    (g: any) => g.stock === 0 || (g.stock > 0 && g.stock <= 2)
  );

  const recentOrders = orders?.slice(0, 5) || [];

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Earnings" value={`$${totalEarnings}`} icon={DollarSign} accent="trail" />
        <StatCard label="Active Rentals" value={activeOrders} icon={Activity} accent="indigo" />
        <StatCard
          label="Needs Attention"
          value={pendingConfirmations}
          icon={ShoppingCart}
          accent={pendingConfirmations > 0 ? 'red' : 'amber'}
          badge={pendingConfirmations > 0 ? 'Confirm now' : undefined}
        />
        <StatCard
          label="Listed Gear"
          value={gears?.length || 0}
          icon={Package}
          accent="green"
          hint={stockAlerts.length > 0 ? `${stockAlerts.length} stock alert${stockAlerts.length > 1 ? 's' : ''}` : 'All stocked up'}
        />
      </div>

      {/* Quick actions */}
      <div className="bg-card rounded-2xl shadow-sm border border-line p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div>
          <h2 className="font-bold text-lg text-ink">Quick actions</h2>
          <p className="text-sm text-ink-soft">
            {pendingConfirmations > 0
              ? `${pendingConfirmations} order${pendingConfirmations > 1 ? 's' : ''} waiting for your confirmation.`
              : 'Review incoming orders or list new gear to keep earning.'}
          </p>
        </div>
        <div className="flex gap-3">
          {pendingConfirmations > 0 && (
            <Link href="/dashboard/provider/orders">
              <Button leftIcon={<ShoppingCart size={16} />}>Confirm Orders</Button>
            </Link>
          )}
          <Link href="/dashboard/provider/gear/new">
            <Button variant="outline" leftIcon={<Plus size={16} />}>Add New Gear</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent orders */}
        <SectionCard title="Recent Orders" actionLabel="View all" actionHref="/dashboard/provider/orders">
          {recentOrders.length > 0 ? (
            <div className="divide-y divide-line">
              {recentOrders.map((order: any) => (
                <div key={order.id} className="p-5 flex items-center gap-4 hover:bg-line/40 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-line/60 flex items-center justify-center text-ink-soft shrink-0">
                    <ShoppingCart size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-ink truncate">{order.gear?.name}</p>
                    <p className="text-xs text-ink-soft">Customer: {order.customer?.name}</p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={ShoppingCart}
              title="No orders yet"
              description="New rental requests from customers will appear here."
              action={
                <Link href="/dashboard/provider/gear/new">
                  <Button variant="outline" leftIcon={<Plus size={16} />}>List New Gear</Button>
                </Link>
              }
            />
          )}
        </SectionCard>

        {/* Stock alerts */}
        <SectionCard title="Stock Alerts" actionLabel="My Gear" actionHref="/dashboard/provider/gear">
          {stockAlerts.length > 0 ? (
            <div className="divide-y divide-line">
              {stockAlerts.map((gear: any) => (
                <div key={gear.id} className="p-5 flex items-center gap-4 hover:bg-line/40 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <AlertTriangle size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-ink truncate">{gear.name}</p>
                    <p className="text-xs text-ink-soft">{gear.brand}</p>
                  </div>
                  {gear.stock === 0 ? (
                    <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-full">Out of stock</span>
                  ) : (
                    <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-1 rounded-full">{gear.stock} left</span>
                  )}
                  <Link
                    href={`/dashboard/provider/gear/edit/${gear.id}`}
                    className="text-trail-dark hover:underline flex items-center gap-1 text-sm font-semibold"
                  >
                    Restock <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Package}
              title="All stocked up"
              description="Your inventory has healthy stock levels. Great job!"
            />
          )}
        </SectionCard>
      </div>
    </div>
  );
}