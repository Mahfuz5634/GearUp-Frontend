"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
 

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { getMyRentals } from '@/services/rental.service';
import { getMyPayments } from '@/services/payment.service';
import { createReview } from '@/services/review.service';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import StatCard from '@/components/dashboard/StatCard';
import SectionCard from '@/components/dashboard/SectionCard';
import StatusBadge from '@/components/dashboard/StatusBadge';
import EmptyState from '@/components/dashboard/EmptyState';
import { SkeletonCards, SkeletonList } from '@/components/dashboard/Skeleton';
import { Calendar, CreditCard, MessageSquare, Package, Star, X, Compass, CheckCircle2, ReceiptText } from 'lucide-react';

const STATUS_ORDER: Record<string, number> = {
  PLACED: 0,
  CONFIRMED: 1,
  PAID: 2,
  PICKED_UP: 3,
  RETURNED: 4,
};

const TIMELINE = ['PLACED', 'CONFIRMED', 'PAID', 'PICKED_UP', 'RETURNED'];

export default function CustomerDashboard() {
  const queryClient = useQueryClient();
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedGearId, setSelectedGearId] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const { data: orders, isLoading } = useQuery({
    queryKey: ['my-rentals'],
    queryFn: getMyRentals,
  });

  const { data: payments } = useQuery({
    queryKey: ['my-payments'],
    queryFn: getMyPayments,
  });

  const reviewMutation = useMutation({
    mutationFn: () => createReview({ gearId: selectedGearId, rating, comment }),
    onSuccess: () => {
      toast.success('Review submitted successfully!');
      setReviewModalOpen(false);
      setRating(5);
      setComment('');
      queryClient.invalidateQueries({ queryKey: ['my-rentals'] });
      queryClient.invalidateQueries({ queryKey: ['gear', selectedGearId] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to submit review');
    },
  });

  const openReviewModal = (gearId: string) => {
    setSelectedGearId(gearId);
    setReviewModalOpen(true);
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const activeCount = orders?.filter((o: any) => o.status === 'PAID' || o.status === 'PICKED_UP').length || 0;
  const pendingPayment = orders?.filter((o: any) => o.status === 'CONFIRMED').length || 0;
  const completedCount = orders?.filter((o: any) => o.status === 'RETURNED').length || 0;
  const toReview = orders?.filter((o: any) => o.status === 'RETURNED').length || 0;

  const nextPayment = orders?.find((o: any) => o.status === 'CONFIRMED');
  const latestOrder = [...(orders || [])].sort(
    (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).find((o: any) => o.status !== 'CANCELLED');

  const currentStep = latestOrder ? STATUS_ORDER[latestOrder.status] ?? 0 : 0;

  const renderAction = (order: any) => {
    if (order.status === 'CONFIRMED') {
      return (
        <Link href={`/dashboard/customer/payment/${order.id}`}>
          <Button size="sm" className="bg-[#635BFF] hover:bg-[#5851df] text-white" leftIcon={<CreditCard size={14} />}>
            Pay Now
          </Button>
        </Link>
      );
    }
    if (order.status === 'RETURNED') {
      return (
        <Button size="sm" variant="outline" leftIcon={<MessageSquare size={14} />} onClick={() => openReviewModal(order.gearId)}>
          Review
        </Button>
      );
    }
    return <span className="text-sm text-ink-soft italic">No action required</span>;
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <SkeletonCards count={4} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card rounded-2xl border border-line p-5"><SkeletonList rows={4} /></div>
          <div className="bg-card rounded-2xl border border-line p-5"><SkeletonList rows={3} /></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Active Rentals" value={activeCount} icon={Package} accent="indigo" />
        <StatCard
          label="Awaiting Payment"
          value={pendingPayment}
          icon={CreditCard}
          accent="trail"
          badge={pendingPayment > 0 ? 'Action needed' : undefined}
        />
        <StatCard label="Completed Rentals" value={completedCount} icon={CheckCircle2} accent="green" />
        <StatCard label="Reviews to Leave" value={toReview} icon={MessageSquare} accent="amber" />
      </div>

      {/* Quick actions */}
      <div className="bg-card rounded-2xl shadow-sm border border-line p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div>
          <h2 className="font-bold text-lg text-ink">Next steps</h2>
          <p className="text-sm text-ink-soft">
            {nextPayment
              ? `You have ${pendingPayment} order${pendingPayment > 1 ? 's' : ''} waiting for payment.`
              : 'Your rentals are all up to date. Find something new for your next adventure.'}
          </p>
        </div>
        <div className="flex gap-3">
          {nextPayment && (
            <Link href={`/dashboard/customer/payment/${nextPayment.id}`}>
              <Button leftIcon={<CreditCard size={16} />}>Pay Now</Button>
            </Link>
          )}
          <Link href="/gear">
            <Button variant="outline" leftIcon={<Compass size={16} />}>Browse Gear</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rental cards */}
        <SectionCard
          title="My Rentals"
          className="lg:col-span-2"
        >
          {orders && orders.length > 0 ? (
            <div className="divide-y divide-line">
              {orders.map((order: any) => (
                <div key={order.id} className="p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-line/40 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-ink text-trail flex items-center justify-center shrink-0">
                    <Package size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-ink truncate">{order.gear?.name || 'Gear'}</p>
                    <div className="flex items-center gap-2 text-sm text-ink-soft mt-1">
                      <Calendar size={14} />
                      {formatDate(order.startDate)} - {formatDate(order.endDate)}
                    </div>
                    <p className="text-xs text-ink-soft mt-1">Provider: {order.gear?.provider?.name || 'Partner'}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={order.status} />
                    {renderAction(order)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Package}
              title="No rentals yet"
              description="You haven't placed any rental orders. Browse gear and start your first rental."
              action={
                <Link href="/gear">
                  <Button variant="outline">Browse Gear</Button>
                </Link>
              }
            />
          )}
        </SectionCard>

        {/* Timeline */}
        {latestOrder ? (
          <SectionCard title="Rental progress">
            <div className="p-6">
              <p className="text-sm text-ink-soft mb-6">
                <span className="font-bold text-ink">{latestOrder.gear?.name || 'Your rental'}</span> is currently{' '}
                <StatusBadge status={latestOrder.status} />
              </p>
              <ol className="space-y-0">
                {TIMELINE.map((step, i) => {
                  const done = i <= currentStep;
                  const isCurrent = i === currentStep && latestOrder.status !== 'RETURNED' && latestOrder.status !== 'CANCELLED';
                  return (
                    <li key={step} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <span
                          className={`w-4 h-4 rounded-full border-2 mt-0.5 ${done ? 'bg-trail border-trail' : 'border-line bg-card'}`}
                        />
                        {i < TIMELINE.length - 1 && (
                          <span className={`w-0.5 flex-1 my-1 ${i < currentStep ? 'bg-trail' : 'bg-line'}`} />
                        )}
                      </div>
                      <div className="pb-6">
                        <p className={`text-sm font-semibold ${done ? 'text-ink' : 'text-ink-soft/60'}`}>
                          {isCurrent ? 'Current: ' : ''}
                          {step.charAt(0) + step.slice(1).toLowerCase().replace('_', ' ')}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </SectionCard>
        ) : null}
      </div>

      {/* Payment history */}
      <SectionCard title="Payment History">
        {payments && payments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-paper text-ink-soft text-xs uppercase tracking-wider font-semibold border-b border-line">
                  <th className="p-5">Transaction</th>
                  <th className="p-5">Amount</th>
                  <th className="p-5">Method</th>
                  <th className="p-5">Status</th>
                  <th className="p-5">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {payments.map((payment: any) => (
                  <tr key={payment.id} className="hover:bg-line/40 transition-colors">
                    <td className="p-5">
                      <p className="text-xs font-mono text-ink-soft">{payment.transactionId || payment.id}</p>
                    </td>
                    <td className="p-5 font-bold text-ink">${payment.amount}</td>
                    <td className="p-5 text-sm text-ink-soft capitalize">{payment.method || 'Stripe'}</td>
                    <td className="p-5">
                      {payment.status === 'COMPLETED' ? (
                        <Badge variant="success">Completed</Badge>
                      ) : payment.status === 'PENDING' ? (
                        <Badge variant="warning">Pending</Badge>
                      ) : (
                        <Badge variant="danger">Failed</Badge>
                      )}
                    </td>
                    <td className="p-5 text-sm text-ink-soft">
                      {payment.paidAt || payment.createdAt ? formatDate(payment.paidAt || payment.createdAt) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            icon={ReceiptText}
            title="No payments yet"
            description="Payments you make for rental orders will appear here."
          />
        )}
      </SectionCard>

      {/* Review Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 backdrop-blur-sm px-4">
          <div className="bg-paper w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-line">
            <div className="px-6 py-4 border-b border-line flex justify-between items-center">
              <h3 className="font-display text-xl text-ink">Write a Review</h3>
              <button onClick={() => setReviewModalOpen(false)} className="text-ink-soft hover:text-ink">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`transition-colors ${star <= rating ? 'text-yellow-400' : 'text-line'}`}
                    >
                      <Star size={28} fill={star <= rating ? 'currentColor' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-3 border border-line rounded-xl focus:ring-2 focus:ring-trail outline-none"
                  rows={4}
                  placeholder="Share your experience with this gear..."
                  required
                />
              </div>
            </div>
            <div className="px-6 py-4 bg-card border-t border-line flex justify-end gap-3">
              <Button variant="outline" onClick={() => setReviewModalOpen(false)}>Cancel</Button>
              <Button onClick={() => reviewMutation.mutate()} isLoading={reviewMutation.isPending}>
                Submit Review
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}