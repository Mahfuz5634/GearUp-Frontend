"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
 

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { getProviderGear, deleteProviderGear } from '@/services/provider.service';
import { Button } from '@/components/ui/Button';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import EmptyState from '@/components/dashboard/EmptyState';
import { SkeletonCards } from '@/components/dashboard/Skeleton';
import { Plus, Edit, Trash2, Package, DollarSign, Tag } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProviderGearPage() {
  const queryClient = useQueryClient();
  const { data: gears, isLoading } = useQuery({
    queryKey: ['provider-gear'],
    queryFn: getProviderGear,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProviderGear(id),
    onSuccess: () => {
      toast.success('Gear deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['provider-gear'] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to delete gear');
    },
  });

  if (isLoading) return <SkeletonCards count={6} />;

  return (
    <div>
      {gears && gears.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {gears.map((gear: any) => (
            <div
              key={gear.id}
              className="group bg-card rounded-2xl shadow-sm border border-line overflow-hidden flex flex-col hover:border-trail/40 hover:shadow-md transition-all"
            >
              {/* Art block */}
              <div className="relative h-36 bg-gradient-to-br from-ink via-ink to-ink-soft flex items-center justify-center">
                <CategoryIcon name={gear.category?.name} size={56} className="text-trail/90" />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 text-xs font-semibold bg-white/90 text-ink px-2 py-1 rounded-full">
                  <Tag size={11} /> {gear.category?.name || 'Uncategorized'}
                </span>
                {gear.stock === 0 && (
                  <span className="absolute top-3 right-3 text-xs font-bold text-white bg-red-600 px-2 py-1 rounded-full">
                    Out of stock
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-ink leading-snug group-hover:text-trail-dark transition-colors line-clamp-1">
                  {gear.name}
                </h3>
                <p className="text-sm text-ink-soft">{gear.brand}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-lg font-bold text-ink">
                    <DollarSign size={16} className="text-trail" />
                    {gear.price}
                    <span className="text-xs font-medium text-ink-soft">/day</span>
                  </span>
                  {gear.stock > 0 && (
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      gear.stock <= 2 ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      {gear.stock} left
                    </span>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-line flex items-center gap-2">
                  <Link href={`/dashboard/provider/gear/edit/${gear.id}`} className="flex-1">
                    <Button variant="secondary" size="sm" className="w-full" leftIcon={<Edit size={14} />}>
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this gear?')) {
                        deleteMutation.mutate(gear.id);
                      }
                    }}
                    isLoading={deleteMutation.isPending && deleteMutation.variables === gear.id}
                    aria-label={`Delete ${gear.name}`}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-2xl shadow-sm border border-line">
          <EmptyState
            icon={Package}
            title="No Gear Listed"
            description="You haven't added any gear to the platform yet. Add your first item to start earning."
            action={
              <Link href="/dashboard/provider/gear/new">
                <Button size="lg" leftIcon={<Plus size={18} />}>List Your First Item</Button>
              </Link>
            }
          />
        </div>
      )}
    </div>
  );
}