"use client";

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { getAllGears } from '@/services/gear.service';
import { Gear } from '@/types';
import { Loader } from '@/components/ui/Loader';
import { Button } from '@/components/ui/Button';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import { Filter, ArrowRight, MapPin } from 'lucide-react';

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

  const inputClass = "w-full p-2.5 border border-line rounded-lg focus:ring-2 focus:ring-trail outline-none bg-paper text-ink placeholder:text-ink-soft/60";

  return (
    <div className="bg-paper min-h-screen">
      {/* Header */}
      <div className="relative bg-ink text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 topo" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center">
          <p className="inline-flex items-center gap-2 text-trail font-bold text-xs uppercase tracking-[0.25em] mb-4">
            <MapPin size={14} /> The gear locker
          </p>
          <h1 className="font-display text-4xl md:text-5xl tracking-tight mb-4">Explore All Gear</h1>
          <p className="text-zinc-300 max-w-2xl mx-auto">Find exactly what you need for your next adventure.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-card p-6 rounded-2xl border border-line sticky top-24 shadow-sm">
            <div className="flex items-center gap-2 mb-6 font-display text-lg border-b border-line pb-4 text-ink">
              <Filter size={18} className="text-trail-dark" /> Filters
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Category</label>
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className={inputClass}
                >
                  <option value="">All Categories</option>
                  <option value="Cycling">Cycling</option>
                  <option value="Camping">Camping</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Water Sports">Water Sports</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-2">Price Range</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    name="minPrice"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    className={inputClass}
                  />
                  <span className="text-ink-soft">-</span>
                  <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    className={inputClass}
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
            <div className="text-center py-20 text-red-600 bg-red-50 rounded-2xl border border-red-100">
              Failed to load gears. Please try again.
            </div>
          ) : (
            <>
              <div className="mb-6 flex justify-between items-center">
                <p className="text-ink-soft font-medium">Showing {gears?.length || 0} results</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {gears?.map((gear: Gear) => (
                  <Link
                    key={gear.id}
                    href={`/gear/${gear.id}`}
                    className="group relative block rounded-2xl bg-card border border-line overflow-hidden hover:shadow-xl hover:shadow-ink/10 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-trail scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-11 h-11 rounded-xl bg-ink text-trail flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
                          <CategoryIcon name={gear.category?.name} size={22} />
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-ink-soft">
                          {gear.category?.name || 'General'}
                        </span>
                      </div>

                      <h3 className="font-display text-lg text-ink line-clamp-1 mb-1 group-hover:text-trail-dark transition-colors">{gear.name}</h3>
                      <p className="text-sm text-ink-soft mb-5">{gear.category?.name || 'Uncategorized'} • {gear.brand}</p>

                      <div className="mt-auto flex justify-between items-center pt-4 border-t border-line">
                        <span className="text-lg text-ink">
                          <span className="font-bold text-trail-dark">${gear.price}</span>
                          <span className="text-sm text-ink-soft font-normal"> /day</span>
                        </span>
                        <span className="text-sm font-semibold text-ink group-hover:text-trail-dark flex items-center gap-1 transition-colors">
                          Details <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {gears?.length === 0 && (
                <div className="text-center py-20 bg-card rounded-2xl border border-line">
                  <p className="text-ink-soft mb-4">No gears found matching your criteria.</p>
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