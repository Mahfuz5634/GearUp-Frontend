"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProviderOrders, updateOrderStatus } from '@/services/provider.service';
import { Loader } from '@/components/ui/Loader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ShoppingCart, Calendar, User, CheckCircle } from 'lucide-react';
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
    }
  });

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    updateMutation.mutate({ id: orderId, status: newStatus });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PLACED': return <Badge variant="warning">NEW REQUEST</Badge>;
      case 'CONFIRMED': return <Badge variant="info">AWAITING PAYMENT</Badge>;
      case 'PAID': return <Badge variant="success">PAID (READY)</Badge>;
      case 'PICKED_UP': return <Badge variant="default" className="bg-purple-100 text-purple-800">IN USE</Badge>;
      case 'RETURNED': return <Badge variant="default" className="bg-line text-ink-soft">COMPLETED</Badge>;
      case 'CANCELLED': return <Badge variant="danger">CANCELLED</Badge>;
      default: return <Badge variant="default">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  if (isLoading) return <div className="flex justify-center py-32"><Loader size={48} /></div>;

  return (
    <div className="bg-paper min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="font-display text-3xl text-ink tracking-tight mb-2">Order Management</h1>
          <p className="text-ink-soft">View and update customer rental requests.</p>
        </div>

        <div className="bg-card rounded-2xl shadow-sm border border-line overflow-hidden">
          {orders && orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-paper text-ink-soft text-xs uppercase tracking-wider font-semibold border-b border-line">
                    <th className="p-6">Order Details</th>
                    <th className="p-6">Customer</th>
                    <th className="p-6">Rental Period</th>
                    <th className="p-6">Status</th>
                    <th className="p-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {orders.map((order: any) => (
                    <tr key={order.id} className="hover:bg-line/50 transition-colors">
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-line/60 flex items-center justify-center text-ink-soft">
                            <ShoppingCart size={18} />
                          </div>
                          <div>
                            <p className="font-bold text-ink">{order.gear?.name}</p>
                            <p className="text-xs text-ink-soft">ID: {order.id.slice(-6).toUpperCase()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-2">
                          <User size={16} className="text-ink-soft" />
                          <span className="text-sm font-medium text-ink">{order.customer?.name}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-2 text-sm text-ink-soft">
                          <Calendar size={16} className="text-ink-soft" />
                          {formatDate(order.startDate)} - {formatDate(order.endDate)}
                        </div>
                      </td>
                      <td className="p-6">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="p-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {order.status === 'PLACED' && (
                            <Button 
                              size="sm" 
                              onClick={() => handleStatusUpdate(order.id, 'CONFIRMED')}
                              isLoading={updateMutation.isPending}
                            >
                              Confirm Order
                            </Button>
                          )}
                          {order.status === 'PAID' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleStatusUpdate(order.id, 'PICKED_UP')}
                              isLoading={updateMutation.isPending}
                            >
                              Mark Picked Up
                            </Button>
                          )}
                          {order.status === 'PICKED_UP' && (
                            <Button 
                              size="sm" 
                              variant="secondary"
                              onClick={() => handleStatusUpdate(order.id, 'RETURNED')}
                              isLoading={updateMutation.isPending}
                            >
                              Mark Returned
                            </Button>
                          )}
                          {(order.status === 'PLACED' || order.status === 'CONFIRMED') && (
                            <Button 
                              size="sm" 
                              variant="danger"
                              onClick={() => handleStatusUpdate(order.id, 'CANCELLED')}
                              disabled={updateMutation.isPending}
                            >
                              Cancel
                            </Button>
                          )}
                          {order.status === 'RETURNED' && (
                            <span className="text-sm text-ink-soft italic">Order Complete</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-16 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-line/60 rounded-full flex items-center justify-center text-ink-soft mb-6">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-ink mb-2">No Orders Yet</h3>
              <p className="text-ink-soft max-w-md">
                You haven't received any rental requests. Make sure your gear is priced competitively and has good descriptions.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
