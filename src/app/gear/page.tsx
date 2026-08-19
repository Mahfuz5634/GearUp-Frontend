"use client";

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Image from 'next/image';
import { getAllGears, getCategories } from '@/services/gear.service';
import { Gear, Category } from '@/types';
import { Loader } from '@/components/ui/Loader';
import { Button } from '@/components/ui/Button';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import { Filter, ArrowRight, MapPin, Search } from 'lucide-react';

export default function GearPage() {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
  });

  const { data: gears, isLoading, isError } = useQuery<Gear[]>({
    queryKey: ['gears', { category: filters.category, minPrice: filters.minPrice, maxPrice: filters.maxPrice }],
    queryFn: () =>
      getAllGears({ category: filters.category, minPrice: filters.minPrice, maxPrice: filters.maxPrice }),
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const brands: string[] = [
    ...new Set((gears || []).map((g) => g.brand).filter((b): b is string => !!b)),
  ].sort();

  const displayedGears = (gears || []).filter((gear) => {
    const matchesSearch =
      !filters.search || gear.name.toLowerCase().includes(filters.search.toLowerCase());
    const matchesBrand = !filters.brand || gear.brand === filters.brand;
    return matchesSearch && matchesBrand;
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({ search: '', category: '', brand: '', minPrice: '', maxPrice: '' });
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
                <label className="block text-sm font-medium text-ink mb-2">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-soft">
                    <Search size={16} />
                  </div>
                  <input
                    type="text"
                    name="search"
                    placeholder="Search gear by name..."
                    value={filters.search}
                    onChange={handleFilterChange}
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-2">Category</label>
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className={inputClass}
                >
                  <option value="">All Categories</option>
                  {categories?.map((cat: Category) => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-2">Brand</label>
                <select
                  name="brand"
                  value={filters.brand}
                  onChange={handleFilterChange}
                  className={inputClass}
                >
                  <option value="">All Brands</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
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
                <p className="text-ink-soft font-medium">Showing {displayedGears.length || 0} results</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedGears.map((gear) => (
                  <Link
                    key={gear.id}
                    href={`/gear/${gear.id}`}
                    className="group relative block rounded-2xl bg-card border border-line overflow-hidden hover:shadow-xl hover:shadow-ink/10 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-trail scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 z-10" />
                    <div className="relative h-48 w-full bg-line/30 overflow-hidden">
                      {gear.imageUrl ? (
                        <Image 
                          src={gear.imageUrl} 
                          alt={gear.name} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-ink-soft/40">
                          <CategoryIcon name={gear.category?.name} size={48} />
                        </div>
                      )}
                      <div className="absolute top-3 right-3 bg-paper/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-ink-soft shadow-sm">
                        {gear.category?.name || 'General'}
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
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

              {displayedGears.length === 0 && (
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