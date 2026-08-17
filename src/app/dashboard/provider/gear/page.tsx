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
import { CategoryIcon } from '@/components/ui/CategoryIcon';

export default function ProviderGearPage() {
  const { data: gears, isLoading } = useQuery({
    queryKey: ['provider-gear'],
    queryFn: getProviderGear,
  });

  if (isLoading) return <div className="flex justify-center py-32"><Loader size={48} /></div>;

  return (
    <div className="bg-paper min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-display text-3xl text-ink tracking-tight mb-2">My Gear</h1>
            <p className="text-ink-soft">Manage your listed items and inventory.</p>
          </div>
          <Link href="/dashboard/provider/gear/new">
            <Button leftIcon={<Plus size={18} />}>Add New Gear</Button>
          </Link>
        </div>

        <div className="bg-card rounded-2xl shadow-sm border border-line overflow-hidden">
          {gears && gears.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-paper text-ink-soft text-xs uppercase tracking-wider font-semibold border-b border-line">
                    <th className="p-6">Item</th>
                    <th className="p-6">Category</th>
                    <th className="p-6">Price / Day</th>
                    <th className="p-6">Stock</th>
                    <th className="p-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {gears.map((gear: any) => (
                    <tr key={gear.id} className="hover:bg-line/50 transition-colors">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-ink text-trail flex items-center justify-center shrink-0">
                            <CategoryIcon name={gear.category?.name} size={22} />
                          </div>
                          <div>
                            <p className="font-bold text-ink">{gear.name}</p>
                            <p className="text-sm text-ink-soft">{gear.brand}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <Badge variant="info">{gear.category?.name || 'Uncategorized'}</Badge>
                      </td>
                      <td className="p-6 font-semibold text-ink">
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
                          <Button variant="ghost" size="sm" className="text-trail-dark hover:text-trail">
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
              <div className="w-20 h-20 bg-line/60 rounded-full flex items-center justify-center text-ink-soft mb-6">
                <Package size={32} />
              </div>
              <h3 className="text-xl font-bold text-ink mb-2">No Gear Listed</h3>
              <p className="text-ink-soft mb-8 max-w-md">
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
