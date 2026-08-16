"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { getProviderGear } from '@/services/provider.service';
import { Loader } from '@/components/ui/Loader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Package, Plus, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';

export default function ProviderGearPage() {
  const { data: gears, isLoading } = useQuery({
    queryKey: ['provider-gear'],
    queryFn: getProviderGear,
  });

  if (isLoading) return <div className="flex justify-center py-32"><Loader size={48} /></div>;

  return (
    <div className="bg-zinc-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-zinc-900 mb-2">My Gear</h1>
            <p className="text-zinc-500">Manage your listed items and inventory.</p>
          </div>
          <Link href="/dashboard/provider/gear/new">
            <Button leftIcon={<Plus size={18} />}>Add New Gear</Button>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
          {gears && gears.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-zinc-50 text-zinc-500 text-xs uppercase tracking-wider font-semibold border-b border-zinc-200">
                    <th className="p-6">Item</th>
                    <th className="p-6">Category</th>
                    <th className="p-6">Price / Day</th>
                    <th className="p-6">Stock</th>
                    <th className="p-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {gears.map((gear: any) => (
                    <tr key={gear.id} className="hover:bg-zinc-50 transition-colors">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-16 rounded-lg bg-zinc-100 overflow-hidden">
                            <Image 
                              src={`https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=200&auto=format&fit=crop`}
                              alt={gear.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-bold text-zinc-900">{gear.name}</p>
                            <p className="text-sm text-zinc-500">{gear.brand}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <Badge variant="info">{gear.category?.name || 'Uncategorized'}</Badge>
                      </td>
                      <td className="p-6 font-semibold text-zinc-900">
                        ${gear.price}
                      </td>
                      <td className="p-6">
                        {gear.stock > 0 ? (
                          <Badge variant="success">{gear.stock} left</Badge>
                        ) : (
                          <Badge variant="danger">Out of stock</Badge>
                        )}
                      </td>
                      <td className="p-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                            <Edit size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-16 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-400 mb-6">
                <Package size={32} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">No Gear Listed</h3>
              <p className="text-zinc-500 mb-8 max-w-md">
                You haven't added any gear to the platform yet. Add your first item to start earning.
              </p>
              <Link href="/dashboard/provider/gear/new">
                <Button size="lg" leftIcon={<Plus size={18} />}>List Your First Item</Button>
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
