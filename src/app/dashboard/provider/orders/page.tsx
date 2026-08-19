"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
 

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { getProviderOrders, updateOrderStatus } from '@/services/provider.service';
import { Button } from '@/components/ui/Button';
import StatusBadge from '@/components/dashboard/StatusBadge';
import EmptyState from '@/components/dashboard/EmptyState';
import { SkeletonList } from '@/components/dashboard/Skeleton';
import { ShoppingCart, Calendar, User, CheckCircle, Package } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProviderOrdersPage() {
  const queryClient = useQueryClient();

  const { data: orders, isLoading } = useQuery({
    queryKey: ['provider-orders'],
    queryFn: getProviderOrders,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => updateOrderStatus(id, status),
    onSuccess: () => {
      toast.success('Order status updated!');
      queryClient.invalidateQueries({ queryKey: ['provider-orders'] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to update order status');
    },
  });

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    updateMutation.mutate({ id: orderId, status: newStatus });
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  if (isLoading) {
    return (
      <div className="bg-card rounded-2xl border border-line p-5 max-w-5xl">
        <SkeletonList rows={5} />
      </div>
    );
  }

  const renderActions = (order: any) => {
    if (order.status === 'PLACED') {
      return (
        <div className="flex flex-wrap gap-2">
          <Button size="sm" onClick={() => handleStatusUpdate(order.id, 'CONFIRMED')} isLoading={updateMutation.isPending}>
            Confirm Order
          </Button>
          <Button size="sm" variant="danger" onClick={() => handleStatusUpdate(order.id, 'CANCELLED')} disabled={updateMutation.isPending}>
            Cancel
          </Button>
        </div>
      );
    }
    if (order.status === 'PAID') {
      return (
        <Button size="sm" variant="outline" onClick={() => handleStatusUpdate(order.id, 'PICKED_UP')} isLoading={updateMutation.isPending}>
          Mark Picked Up
        </Button>
      );
    }
    if (order.status === 'PICKED_UP') {
      return (
        <Button size="sm" variant="secondary" onClick={() => handleStatusUpdate(order.id, 'RETURNED')} isLoading={updateMutation.isPending}>
          Mark Returned
        </Button>
      );
    }
    if (order.status === 'CONFIRMED') {
      return (
        <Button size="sm" variant="danger" onClick={() => handleStatusUpdate(order.id, 'CANCELLED')} disabled={updateMutation.isPending}>
          Cancel
        </Button>
      );
    }
    if (order.status === 'RETURNED') {
      return <span className="text-sm text-ink-soft italic">Order complete</span>;
    }
    return null;
  };

  return (
    <div className="max-w-5xl">
      {orders && orders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {orders.map((order: any) => (
            <div key={order.id} className="bg-card rounded-2xl shadow-sm border border-line overflow-hidden hover:border-trail/30 transition-colors">
              <div className="p-5 border-b border-line flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-ink text-trail flex items-center justify-center shrink-0">
                    <ShoppingCart size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-ink truncate">{order.gear?.name}</p>
                    <p className="text-xs text-ink-soft font-mono">#{order.id.slice(-6).toUpperCase()}</p>
                  </div>
                </div>
                <StatusBadge status={order.status} />
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2 text-sm text-ink-soft">
                  <User size={15} className="shrink-0" />
                  <span className="font-medium text-ink">{order.customer?.name}</span>
                  <span className="text-xs text-ink-soft">({order.customer?.email})</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-ink-soft">
                  <Calendar size={15} className="shrink-0" />
                  {formatDate(order.startDate)} - {formatDate(order.endDate)}
                </div>
                {order.payment && (
                  <p className="text-sm text-ink-soft">
                    Payment: <span className="font-semibold text-ink">${order.payment.amount}</span>{' '}
                    <span className="text-xs text-ink-soft">({order.payment.status})</span>
                  </p>
                )}
                <div className="pt-2">{renderActions(order)}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-2xl shadow-sm border border-line">
          <EmptyState
            icon={CheckCircle}
            title="No Orders Yet"
            description="You haven't received any rental requests. Make sure your gear is priced competitively and has good descriptions."
            action={
              <Link href="/dashboard/provider/gear/new">
                <Button variant="outline" leftIcon={<Package size={16} />}>List New Gear</Button>
              </Link>
            }
          />
        </div>
      )}
    </div>
  );
}