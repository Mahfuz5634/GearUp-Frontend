"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { getMyRentals } from '@/services/rental.service';
import { Loader } from '@/components/ui/Loader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Calendar, CreditCard, MessageSquare, Package } from 'lucide-react';

export default function CustomerDashboard() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['my-rentals'],
    queryFn: getMyRentals,
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PLACED': return <Badge variant="warning">PLACED</Badge>;
      case 'CONFIRMED': return <Badge variant="info">CONFIRMED</Badge>;
      case 'PAID': return <Badge variant="success">PAID</Badge>;
      case 'PICKED_UP': return <Badge variant="default" className="bg-purple-100 text-purple-800">PICKED UP</Badge>;
      case 'RETURNED': return <Badge variant="default" className="bg-line text-ink-soft">RETURNED</Badge>;
      default: return <Badge variant="danger">{status}</Badge>;
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-display text-3xl text-ink tracking-tight mb-2">My Rentals</h1>
            <p className="text-ink-soft">Manage your rental requests, payments, and history.</p>
          </div>
          <Link href="/gear">
            <Button>Rent More Gear</Button>
          </Link>
        </div>
        
        <div className="bg-card rounded-2xl shadow-sm border border-line overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-paper text-ink-soft text-xs uppercase tracking-wider font-semibold border-b border-line">
                  <th className="p-6 w-1/3">Gear & Provider</th>
                  <th className="p-6">Rental Period</th>
                  <th className="p-6">Status</th>
                  <th className="p-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {orders?.map((order: any) => (
                  <tr key={order.id} className="hover:bg-line/50 transition-colors group">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-line/60 flex items-center justify-center text-ink-soft">
                          <Package size={24} />
                        </div>
                        <div>
                          <p className="font-bold text-ink group-hover:text-trail-dark transition-colors">
                            {order.gear?.name}
                          </p>
                          <p className="text-xs text-ink-soft mt-1">Provider: {order.gear?.provider?.name || 'Partner'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2 text-sm text-ink-soft font-medium">
                        <Calendar size={16} className="text-ink-soft" />
                        {formatDate(order.startDate)} - {formatDate(order.endDate)}
                      </div>
                    </td>
                    <td className="p-6">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="p-6 text-right">
                      {order.status === 'CONFIRMED' ? (
                        <Link href={`/dashboard/customer/payment/${order.id}`}>
                          <Button size="sm" className="bg-[#635BFF] hover:bg-[#5851df] text-white" leftIcon={<CreditCard size={14} />}>
                            Pay Now
                          </Button>
                        </Link>
                      ) : order.status === 'RETURNED' ? (
                        <Button size="sm" variant="outline" leftIcon={<MessageSquare size={14} />}>
                          Review
                        </Button>
                      ) : (
                        <span className="text-sm text-ink-soft italic">No action required</span>
                      )}
                    </td>
                  </tr>
                ))}
                
                {(!orders || orders.length === 0) && (
                  <tr>
                    <td colSpan={4} className="p-16 text-center">
                      <div className="mx-auto w-16 h-16 bg-line/60 rounded-full flex items-center justify-center mb-4 text-ink-soft">
                        <Package size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-ink mb-1">No rentals yet</h3>
                      <p className="text-ink-soft mb-6">You haven't placed any rental orders.</p>
                      <Link href="/gear">
                        <Button variant="outline">Browse Gear</Button>
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}