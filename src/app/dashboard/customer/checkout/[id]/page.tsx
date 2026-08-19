"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getSingleGear } from '@/services/gear.service';
import { createRentalOrder } from '@/services/rental.service';
import { Loader } from '@/components/ui/Loader';
import { Button } from '@/components/ui/Button';
import { Calendar, ShieldCheck, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const gearId = params.id as string;

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const savedDates = sessionStorage.getItem(`rental_dates_${gearId}`);
    if (savedDates) {
      try {
        const { startDate: sDate, endDate: eDate } = JSON.parse(savedDates);
        
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setStartDate(sDate);
        setEndDate(eDate);
      } catch (e) {
        console.error(e);
      }
    }
  }, [gearId]);

  const { data: gear, isLoading } = useQuery({
    queryKey: ['gear', gearId],
    queryFn: () => getSingleGear(gearId),
  });

  useEffect(() => {
    if (gear && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays > 0) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTotalPrice(diffDays * gear.price);
      } else {
        setTotalPrice(gear.price); 
      }
    }
  }, [gear, startDate, endDate]);

  const orderMutation = useMutation({
    mutationFn: createRentalOrder,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success('Order placed successfully! Waiting for provider confirmation.');
        sessionStorage.removeItem(`rental_dates_${gearId}`);
        router.push('/dashboard/customer');
      } else {
        toast.error(data.message || 'Failed to place order!');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Something went wrong!');
    },
  });

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (new Date(startDate) >= new Date(endDate)) {
      toast.error('End Date must be after Start Date!');
      return;
    }
    orderMutation.mutate({ gearId, startDate, endDate });
  };

  const today = new Date().toISOString().split('T')[0];

  if (isLoading) return <div className="flex justify-center py-32"><Loader size={48} /></div>;
  if (!gear) return <div className="text-center mt-20 text-red-500">Gear not found!</div>;

  return (
    <div className="bg-paper min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card rounded-2xl shadow-sm border border-line overflow-hidden">
          <div className="p-8 border-b border-line">
            <h1 className="font-display text-2xl text-ink tracking-tight">Review & Confirm Rental</h1>
          </div>
          
          <div className="p-8 flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <div className="relative w-full aspect-square bg-line/60 rounded-lg overflow-hidden">
                {gear.imageUrl ? (
                  <Image
                    src={gear.imageUrl}
                    alt={gear.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-ink-soft/40">
                    <ImageIcon size={48} />
                  </div>
                )}
              </div>
            </div>
            
            <div className="w-full md:w-2/3">
              <h3 className="font-bold text-xl text-ink mb-1">{gear.name}</h3>
              <p className="text-ink-soft mb-4">by {gear.brand}</p>
              
              <div className="bg-paper p-4 rounded-xl border border-line mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-ink-soft">Price per day</span>
                  <span className="font-bold text-ink">${gear.price}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-700 mt-2">
                  <ShieldCheck size={16} /> Covered by GearUp Guarantee
                </div>
              </div>

              <form onSubmit={handleCheckout} className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-ink mb-2 flex items-center gap-2">
                      <Calendar size={16} /> Start Date
                    </label>
                    <input 
                      type="date" 
                      required 
                      min={today}
                      className="w-full border border-line p-3 rounded-lg focus:ring-2 focus:ring-trail outline-none"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-2 flex items-center gap-2">
                      <Calendar size={16} /> End Date
                    </label>
                    <input 
                      type="date" 
                      required 
                      min={startDate || today}
                      className="w-full border border-line p-3 rounded-lg focus:ring-2 focus:ring-trail outline-none"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="border-t border-line pt-6 flex justify-between items-end">
                  <div>
                    <span className="text-ink-soft font-medium block mb-1">Estimated Total</span>
                    <span className="text-sm text-ink-soft">Excludes taxes & fees</span>
                  </div>
                  <span className="text-3xl font-bold text-ink">
                    ${totalPrice > 0 ? totalPrice : '0.00'}
                  </span>
                </div>

                <Button 
                  type="submit"
                  className="w-full h-12 text-lg"
                  isLoading={orderMutation.isPending}
                  disabled={!startDate || !endDate}
                >
                  Confirm & Pay
                </Button>
                <p className="text-xs text-ink-soft text-center">
                  By confirming, you agree to GearUp&apos;s Rental Terms of Service.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}