"use client";

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { getSingleGear } from '@/services/gear.service';
import { useAuth } from '@/providers/AuthProvider';
import toast from 'react-hot-toast';
import { Loader } from '@/components/ui/Loader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import { Calendar, ShieldCheck, Truck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function GearDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const gearId = params.id as string;
  const { user } = useAuth();

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { data: gear, isLoading } = useQuery({
    queryKey: ['gear', gearId],
    queryFn: () => getSingleGear(gearId),
    enabled: !!gearId,
  });

  const getTodayString = () => new Date().toISOString().split('T')[0];

  const handleRentClick = () => {
    if (!user) {
      toast.error('Please login as a Customer to rent gear!');
      router.push('/auth/login');
      return;
    }
    if (user.role !== 'CUSTOMER') {
      toast.error('Only customers can place rental orders!');
      return;
    }
    if (!startDate || !endDate) {
      toast.error('Please select both start and end dates.');
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      toast.error('End date cannot be before start date.');
      return;
    }

    sessionStorage.setItem(`rental_dates_${gearId}`, JSON.stringify({ startDate, endDate }));
    router.push(`/dashboard/customer/checkout/${gearId}`);
  };

  if (isLoading) return <div className="flex justify-center py-32"><Loader size={48} /></div>;
  if (!gear) return <div className="text-center mt-20 text-red-500">Gear not found!</div>;

  const days = startDate && endDate ? Math.max(1, Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))) : 0;
  const total = days * gear.price;

  return (
    <div className="bg-paper min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/gear" className="text-sm text-ink-soft hover:text-ink flex items-center gap-1 mb-6 w-fit font-medium">
          <ArrowLeft size={16} /> Back to Gear
        </Link>

        <div className="bg-card rounded-2xl shadow-sm border border-line overflow-hidden">
          {/* Header */}
          <div className="relative bg-ink text-white px-8 lg:px-12 py-10 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20">
              <div className="absolute inset-0 topo" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-trail shrink-0">
                <CategoryIcon name={gear.category?.name} size={32} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="info">{gear.category?.name || 'Category'}</Badge>
                  {gear.stock > 0 ? (
                    <Badge variant="success">In Stock ({gear.stock})</Badge>
                  ) : (
                    <Badge variant="danger">Out of Stock</Badge>
                  )}
                </div>
                <h1 className="font-display text-3xl lg:text-4xl tracking-tight mb-1">
                  {gear.name}
                </h1>
                <p className="text-zinc-300 font-medium">by {gear.brand}</p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 p-8 lg:p-12">
            {/* Description */}
            <div className="lg:col-span-3">
              <p className="text-ink-soft leading-relaxed mb-8">{gear.description}</p>

              <div className="grid grid-cols-2 gap-4 py-6 border-y border-line mb-8">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-line/60 text-moss flex items-center justify-center">
                    <ShieldCheck size={20} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">Verified Provider</p>
                    <p className="text-xs text-ink-soft">{gear.provider?.name || 'GearUp Partner'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-line/60 text-moss flex items-center justify-center">
                    <Truck size={20} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">Local Pickup</p>
                    <p className="text-xs text-ink-soft">Available instantly</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rental Form */}
            <div className="lg:col-span-2">
              <div className="bg-paper p-6 rounded-2xl border border-line sticky top-24">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <p className="text-sm text-ink-soft font-medium mb-1">Rental Price</p>
                    <p className="text-3xl font-display text-ink">
                      <span className="text-trail-dark">${gear.price}</span>{' '}
                      <span className="text-base text-ink-soft font-normal">/ day</span>
                    </p>
                  </div>
                  {days > 0 && (
                    <div className="text-right">
                      <p className="text-sm text-ink-soft font-medium mb-1">Total ({days} days)</p>
                      <p className="text-2xl font-display text-ink">${total}</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-ink mb-2 flex items-center gap-2">
                      <Calendar size={16} className="text-trail-dark" /> Start Date
                    </label>
                    <input
                      type="date"
                      min={getTodayString()}
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full p-3 border border-line rounded-lg focus:ring-2 focus:ring-trail outline-none bg-card text-ink"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-2 flex items-center gap-2">
                      <Calendar size={16} className="text-trail-dark" /> End Date
                    </label>
                    <input
                      type="date"
                      min={startDate || getTodayString()}
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full p-3 border border-line rounded-lg focus:ring-2 focus:ring-trail outline-none bg-card text-ink"
                    />
                  </div>
                </div>

                <Button
                  size="lg"
                  onClick={handleRentClick}
                  disabled={gear.stock <= 0}
                  className="w-full text-lg h-14"
                >
                  {gear.stock > 0 ? 'Rent Now' : 'Currently Unavailable'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}