"use client";

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { getSingleGear } from '@/services/gear.service';
import { useAuth } from '@/providers/AuthProvider';
import toast from 'react-hot-toast';
import { Loader } from '@/components/ui/Loader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Calendar, ShieldCheck, Truck } from 'lucide-react';

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

    // Save dates in sessionStorage or pass via query params
    sessionStorage.setItem(`rental_dates_${gearId}`, JSON.stringify({ startDate, endDate }));
    router.push(`/dashboard/customer/checkout/${gearId}`);
  };

  if (isLoading) return <div className="flex justify-center py-32"><Loader size={48} /></div>;
  if (!gear) return <div className="text-center mt-20 text-red-500">Gear not found!</div>;

  const days = startDate && endDate ? Math.max(1, Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))) : 0;
  const total = days * gear.price;

  return (
    <div className="bg-zinc-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="relative w-full lg:w-1/2 h-[400px] lg:h-auto bg-zinc-100">
             <Image 
                src={`https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=1000&auto=format&fit=crop`} 
                alt={gear.name}
                fill
                className="object-cover"
                priority
              />
          </div>

          {/* Details Section */}
          <div className="p-8 lg:p-12 w-full lg:w-1/2 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="info">{gear.category?.name || 'Category'}</Badge>
              {gear.stock > 0 ? (
                <Badge variant="success">In Stock ({gear.stock})</Badge>
              ) : (
                <Badge variant="danger">Out of Stock</Badge>
              )}
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-extrabold text-zinc-900 mb-2">
              {gear.name}
            </h1>
            <p className="text-zinc-500 font-medium mb-6">by {gear.brand}</p>
            
            <div className="prose prose-zinc max-w-none mb-8 text-zinc-600">
              <p>{gear.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8 py-6 border-y border-zinc-100">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-green-600" size={24} />
                <div>
                  <p className="text-sm font-semibold text-zinc-900">Verified Provider</p>
                  <p className="text-xs text-zinc-500">{gear.provider?.name || 'GearUp Partner'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="text-blue-600" size={24} />
                <div>
                  <p className="text-sm font-semibold text-zinc-900">Local Pickup</p>
                  <p className="text-xs text-zinc-500">Available instantly</p>
                </div>
              </div>
            </div>
            
            {/* Rental Form */}
            <div className="mt-auto bg-zinc-50 p-6 rounded-xl border border-zinc-200">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <p className="text-sm text-zinc-500 font-medium mb-1">Rental Price</p>
                  <p className="text-3xl font-bold text-zinc-900">${gear.price} <span className="text-lg text-zinc-500 font-normal">/ day</span></p>
                </div>
                {days > 0 && (
                  <div className="text-right">
                    <p className="text-sm text-zinc-500 font-medium mb-1">Total ({days} days)</p>
                    <p className="text-2xl font-bold text-zinc-900">${total}</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2 flex items-center gap-2">
                    <Calendar size={16} /> Start Date
                  </label>
                  <input 
                    type="date"
                    min={getTodayString()}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2 flex items-center gap-2">
                    <Calendar size={16} /> End Date
                  </label>
                  <input 
                    type="date"
                    min={startDate || getTodayString()}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-900 outline-none"
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
  );
}