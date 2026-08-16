"use client";

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Image from 'next/image';
import { getAllGears } from '@/services/gear.service';
import { Gear } from '@/types';
import { Loader } from '@/components/ui/Loader';
import { Button } from '@/components/ui/Button';
import { Filter } from 'lucide-react';

export default function GearPage() {
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
  });

  const { data: gears, isLoading, isError } = useQuery({
    queryKey: ['gears', filters],
    queryFn: () => getAllGears(filters),
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({ category: '', minPrice: '', maxPrice: '' });
  };

  return (
    <div className="bg-zinc-50 min-h-screen">
      {/* Header */}
      <div className="bg-zinc-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-extrabold mb-4">Explore All Gear</h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">Find exactly what you need for your next adventure.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-xl border border-zinc-200 sticky top-24">
            <div className="flex items-center gap-2 mb-6 font-bold text-lg border-b pb-4">
              <Filter size={20} /> Filters
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Category</label>
                <select 
                  name="category" 
                  value={filters.category} 
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-zinc-300 rounded-md focus:ring-2 focus:ring-zinc-900 outline-none"
                >
                  <option value="">All Categories</option>
                  <option value="Cycling">Cycling</option>
                  <option value="Camping">Camping</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Water Sports">Water Sports</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Price Range</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    name="minPrice" 
                    placeholder="Min" 
                    value={filters.minPrice} 
                    onChange={handleFilterChange}
                    className="w-full p-2 border border-zinc-300 rounded-md focus:ring-2 focus:ring-zinc-900 outline-none"
                  />
                  <span>-</span>
                  <input 
                    type="number" 
                    name="maxPrice" 
                    placeholder="Max" 
                    value={filters.maxPrice} 
                    onChange={handleFilterChange}
                    className="w-full p-2 border border-zinc-300 rounded-md focus:ring-2 focus:ring-zinc-900 outline-none"
                  />
                </div>
              </div>
              
              <Button onClick={clearFilters} variant="outline" className="w-full">
                Clear Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader size={40} />
            </div>
          ) : isError ? (
            <div className="text-center py-20 text-red-500 bg-red-50 rounded-xl">
              Failed to load gears. Please try again.
            </div>
          ) : (
            <>
              <div className="mb-6 flex justify-between items-center">
                <p className="text-zinc-600 font-medium">Showing {gears?.length || 0} results</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {gears?.map((gear: Gear) => (
                  <Link key={gear.id} href={`/gear/${gear.id}`} className="group block rounded-xl border border-zinc-200 overflow-hidden hover:shadow-lg transition-shadow bg-white flex flex-col">
                    <div className="relative w-full aspect-[4/3] bg-zinc-100">
                      <Image 
                        src={`https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=600&auto=format&fit=crop`} 
                        alt={gear.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg text-zinc-900 line-clamp-1">{gear.name}</h3>
                      </div>
                      <p className="text-sm text-zinc-500 mb-4">{gear.category?.name || 'Uncategorized'} • {gear.brand}</p>
                      
                      <div className="mt-auto flex justify-between items-center pt-4 border-t border-zinc-100">
                        <span className="font-bold text-zinc-900 text-lg">${gear.price} <span className="text-sm text-zinc-500 font-normal">/day</span></span>
                        <span className="text-sm font-medium text-blue-600 group-hover:underline">View Details</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              {gears?.length === 0 && (
                <div className="text-center py-20 bg-white rounded-xl border border-zinc-200">
                  <p className="text-zinc-500 mb-4">No gears found matching your criteria.</p>
                  <Button onClick={clearFilters} variant="outline">Clear Filters</Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}