
'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Image from 'next/image';
import { getAllGears } from '@/services/gear.service';
import { Gear } from '@/types';

export default function GearPage() {
  const { data: gears, isLoading, isError } = useQuery({
    queryKey: ['gears'],
    queryFn: () => getAllGears(),
  });

  if (isLoading) return <div className="text-center mt-20 text-xl font-semibold animate-pulse">Loading amazing gears... 🏋️</div>;
  if (isError) return <div className="text-center mt-20 text-red-500">Failed to load gears!</div>;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-800">Explore Outdoor Gear</h1>
      
      {/* Gear Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {gears?.map((gear: Gear) => (
          <div key={gear.id} className="border rounded-lg shadow-sm hover:shadow-md transition bg-white overflow-hidden flex flex-col">
            <div className="relative w-full h-48 bg-slate-100">
              <Image 
                src={`https://ui-avatars.com/api/?name=${gear.name}&background=random&size=300`} 
                alt={gear.name}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-bold text-slate-800">{gear.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{gear.category?.name || 'Uncategorized'} • {gear.brand}</p>
              
              <div className="mt-auto flex justify-between items-center pt-4">
                <span className="text-orange-600 font-bold text-lg">${gear.price} <span className="text-sm text-gray-500 font-normal">/day</span></span>
                <Link 
                  href={`/gear/${gear.id}`}
                  className="bg-slate-900 text-white px-3 py-1.5 rounded text-sm hover:bg-slate-800 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
        
        {gears?.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">No gears available right now.</p>
        )}
      </div>
    </div>
  );
}