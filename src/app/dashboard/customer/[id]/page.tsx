'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getSingleGear } from '@/services/gear.service';
import { createRentalOrder } from '@/services/rental.service';

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const gearId = params.id as string;

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);


  const { data: gear, isLoading } = useQuery({
    queryKey: ['gear', gearId],
    queryFn: () => getSingleGear(gearId),
  });


  useEffect(() => {
    if (startDate && endDate && gear) {
      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays > 0) {
        setTotalPrice(diffDays * gear.price);
      } else {
        setTotalPrice(gear.price); 
      }
    }
  }, [startDate, endDate, gear]);

 
  const orderMutation = useMutation({
    mutationFn: createRentalOrder,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success('Order placed successfully! Waiting for provider confirmation.');
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

  if (isLoading) return <div className="text-center mt-20 animate-pulse">Loading checkout...</div>;

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-2xl">
      <div className="bg-white p-8 rounded-xl shadow-md border">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Complete Your Rental Request</h1>
        
        <div className="bg-slate-50 p-4 rounded-md mb-6 border">
          <h3 className="font-semibold text-lg">{gear.name}</h3>
          <p className="text-gray-600 text-sm">Price per day: <span className="font-bold text-orange-600">${gear.price}</span></p>
        </div>

        <form onSubmit={handleCheckout} className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input 
                type="date" 
                required 
                min={today}
                className="w-full border p-2 rounded-md focus:outline-orange-500"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input 
                type="date" 
                required 
                min={startDate || today}
                className="w-full border p-2 rounded-md focus:outline-orange-500"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="border-t pt-4 flex justify-between items-center">
            <span className="text-gray-600 font-medium">Estimated Total:</span>
            <span className="text-2xl font-bold text-slate-900">
              ${totalPrice > 0 ? totalPrice : '0.00'}
            </span>
          </div>

          <button
            type="submit"
            disabled={orderMutation.isPending || !startDate || !endDate}
            className="w-full bg-slate-900 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-800 transition disabled:bg-gray-400 mt-2"
          >
            {orderMutation.isPending ? 'Placing Order...' : 'Confirm Rental Request'}
          </button>
        </form>
      </div>
    </div>
  );
}