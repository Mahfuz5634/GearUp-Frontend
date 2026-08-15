
'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { getSingleGear } from '@/services/gear.service';
import { getCurrentUser } from '@/services/auth.service';
import toast from 'react-hot-toast';

export default function GearDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const gearId = params.id as string;
  const user = getCurrentUser();

  const { data: gear, isLoading } = useQuery({
    queryKey: ['gear', gearId],
    queryFn: () => getSingleGear(gearId),
    enabled: !!gearId,
  });

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
    router.push(`/dashboard/customer/checkout/${gearId}`);
  };

  if (isLoading) return <div className="text-center mt-20 text-xl font-semibold animate-pulse">Loading details...</div>;
  if (!gear) return <div className="text-center mt-20 text-red-500">Gear not found!</div>;

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-4xl">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border flex flex-col md:flex-row">
        
        <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-slate-100">
           <Image 
              src={`https://ui-avatars.com/api/?name=${gear.name}&background=random&size=500`} 
              alt={gear.name}
              fill
              className="object-cover"
            />
        </div>

        <div className="p-8 w-full md:w-1/2 flex flex-col">
          <div className="uppercase tracking-wide text-sm text-orange-600 font-semibold">
            {gear.category?.name || 'Category'}
          </div>
          <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900">
            {gear.name}
          </h1>
          <p className="mt-2 text-gray-500 text-sm">Brand: <span className="font-semibold text-gray-800">{gear.brand}</span></p>
          
          <p className="mt-4 text-gray-600 leading-relaxed flex-grow">
            {gear.description}
          </p>
          
          <div className="mt-6 border-t pt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-3xl font-bold text-slate-900">${gear.price} <span className="text-lg text-gray-500 font-normal">/day</span></span>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${gear.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {gear.stock > 0 ? `${gear.stock} in stock` : 'Out of Stock'}
              </span>
            </div>

            <button
              onClick={handleRentClick}
              disabled={gear.stock <= 0}
              className="w-full bg-orange-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-700 transition disabled:bg-gray-400"
            >
              {gear.stock > 0 ? 'Rent Now' : 'Currently Unavailable'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}