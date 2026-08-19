"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { updateProviderGear } from '@/services/provider.service';
import { getSingleGear } from '@/services/gear.service';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Package, DollarSign, Tag, Archive } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Loader } from '@/components/ui/Loader';

export default function EditGearPage() {
  const params = useParams();
  const gearId = params.id as string;

  const { data: gear, isLoading } = useQuery({
    queryKey: ['gear', gearId],
    queryFn: () => getSingleGear(gearId),
    enabled: !!gearId,
  });

  if (isLoading) return <div className="flex justify-center py-32"><Loader size={48} /></div>;
  if (!gear) return <div className="text-center py-32 text-red-500">Gear not found!</div>;

  return <EditGearForm gear={gear} gearId={gearId} />;
}

function buildFormData(gear: any): {
  name: string;
  description: string;
  brand: string;
  model: string;
  categoryId: string;
  price: string;
  stock: string;
  imageUrl: string;
  condition: string;
  features: string;
} {
  return {
    name: gear.name || '',
    description: gear.description || '',
    brand: gear.brand || '',
    model: gear.model || '',
    categoryId: gear.categoryId || '',
    price: gear.price?.toString() || '',
    stock: gear.stock?.toString() || '',
    imageUrl: gear.imageUrl || '',
    condition: gear.condition || 'Excellent',
    features: gear.features?.join(', ') || '',
  };
}

function EditGearForm({ gear, gearId }: { gear: any; gearId: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState(() => buildFormData(gear));

  const mutation = useMutation({
    mutationFn: (data: any) => updateProviderGear(gearId, data),
    onSuccess: () => {
      toast.success('Gear updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['provider-gear'] });
      queryClient.invalidateQueries({ queryKey: ['gear', gearId] });
      router.push('/dashboard/provider/gear');
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to update gear');
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Formatting data for the API
    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
      features: formData.features.split(',').map(f => f.trim()).filter(f => f),
    };
    
    mutation.mutate(payload);
  };

  return (
    <div className="bg-paper min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <Link href="/dashboard/provider/gear" className="text-sm text-ink-soft hover:text-ink flex items-center gap-1 mb-4 w-fit">
            <ArrowLeft size={16} /> Back to Gear
          </Link>
          <h1 className="font-display text-3xl text-ink tracking-tight mb-2">Edit Gear</h1>
          <p className="text-ink-soft">Update your listed item for rent on GearUp.</p>
        </div>

        <div className="bg-card rounded-2xl shadow-sm border border-line overflow-hidden p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-ink">Gear Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-soft">
                    <Package size={18} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Mountain Bike Pro"
                    className="w-full pl-10 pr-4 py-3 border border-line rounded-xl focus:ring-2 focus:ring-trail outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-ink">Category ID</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-soft">
                    <Tag size={18} />
                  </div>
                  <input
                    type="text"
                    name="categoryId"
                    required
                    value={formData.categoryId}
                    onChange={handleChange}
                    placeholder="Enter category UUID"
                    className="w-full pl-10 pr-4 py-3 border border-line rounded-xl focus:ring-2 focus:ring-trail outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-ink">Description</label>
              <textarea
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the gear, its capabilities, and any rules for renters..."
                className="w-full p-4 border border-line rounded-xl focus:ring-2 focus:ring-trail outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-ink">Brand</label>
                <input
                  type="text"
                  name="brand"
                  required
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="e.g. Trek"
                  className="w-full p-3 border border-line rounded-xl focus:ring-2 focus:ring-trail outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-ink">Model</label>
                <input
                  type="text"
                  name="model"
                  required
                  value={formData.model}
                  onChange={handleChange}
                  placeholder="e.g. X-Caliber 8"
                  className="w-full p-3 border border-line rounded-xl focus:ring-2 focus:ring-trail outline-none"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-ink">Condition</label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="w-full p-3 border border-line rounded-xl focus:ring-2 focus:ring-trail outline-none bg-card"
                >
                  <option value="New">New</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-ink">Daily Rental Price ($)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-soft">
                    <DollarSign size={18} />
                  </div>
                  <input
                    type="number"
                    name="price"
                    required
                    min="1"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="25.00"
                    className="w-full pl-10 pr-4 py-3 border border-line rounded-xl focus:ring-2 focus:ring-trail outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-ink">Available Stock</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-soft">
                    <Archive size={18} />
                  </div>
                  <input
                    type="number"
                    name="stock"
                    required
                    min="1"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="1"
                    className="w-full pl-10 pr-4 py-3 border border-line rounded-xl focus:ring-2 focus:ring-trail outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-ink">Image URL (Optional)</label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full p-3 border border-line rounded-xl focus:ring-2 focus:ring-trail outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-ink">Features (Comma separated)</label>
              <input
                type="text"
                name="features"
                value={formData.features}
                onChange={handleChange}
                placeholder="e.g. Lightweight, Helmet included, Front suspension"
                className="w-full p-3 border border-line rounded-xl focus:ring-2 focus:ring-trail outline-none"
              />
            </div>

            <div className="pt-4 border-t border-line flex justify-end gap-4">
              <Link href="/dashboard/provider/gear">
                <Button variant="outline" type="button" className="h-12">Cancel</Button>
              </Link>
              <Button type="submit" className="h-12 w-48" isLoading={mutation.isPending}>
                Update Gear
              </Button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}
