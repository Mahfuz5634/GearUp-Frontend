"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useQuery } from '@tanstack/react-query';
import { getAllGearsAdmin, getAllRentals } from '@/services/admin.service';
import { Loader } from '@/components/ui/Loader';
import { Badge } from '@/components/ui/Badge';
import { Package, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function AdminModerationPage() {
  const { data: gears, isLoading: isLoadingGears } = useQuery({
    queryKey: ['admin-gears'],
    queryFn: getAllGearsAdmin,
  });

  const { data: rentals, isLoading: isLoadingRentals } = useQuery({
    queryKey: ['admin-rentals'],
    queryFn: getAllRentals,
  });

  if (isLoadingGears || isLoadingRentals) return <div className="flex justify-center py-32"><Loader size={48} /></div>;

  return (
    <div className="bg-paper min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="font-display text-3xl text-ink tracking-tight mb-2">Content Moderation</h1>
            <p className="text-ink-soft">Inspect all gear listings and rental orders across the platform.</p>
          </div>
          <Link href="/dashboard/admin">
            <Badge variant="info" className="px-4 py-2 cursor-pointer">Back to Dashboard</Badge>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gear Listings */}
          <div className="bg-card rounded-2xl shadow-sm border border-line overflow-hidden">
            <div className="p-6 border-b border-line flex items-center gap-2">
              <Package size={20} className="text-trail" />
              <h2 className="text-lg font-bold text-ink">All Gear Listings</h2>
            </div>
            <div className="p-0">
              <div className="overflow-x-auto max-h-[600px]">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-paper">
                    <tr className="text-ink-soft text-xs uppercase tracking-wider font-semibold border-b border-line">
                      <th className="p-4">Item</th>
                      <th className="p-4">Provider</th>
                      <th className="p-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {gears?.map((gear: any) => (
                      <tr key={gear.id} className="hover:bg-line/50 transition-colors">
                        <td className="p-4">
                          <p className="font-semibold text-ink line-clamp-1">
                            <Link href={`/gear/${gear.id}`} className="hover:text-trail-dark text-trail-dark" target="_blank">{gear.name}</Link>
                          </p>
                          <p className="text-xs text-ink-soft">${gear.price}/day</p>
                        </td>
                        <td className="p-4 text-sm text-ink-soft">
                          {gear.provider?.name}
                        </td>
                        <td className="p-4 text-right">
                          {gear.isDeleted ? <Badge variant="danger">Deleted</Badge> : <Badge variant="success">Active</Badge>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Rental Orders */}
          <div className="bg-card rounded-2xl shadow-sm border border-line overflow-hidden">
            <div className="p-6 border-b border-line flex items-center gap-2">
              <ShoppingCart size={20} className="text-trail" />
              <h2 className="text-lg font-bold text-ink">All Rental Orders</h2>
            </div>
            <div className="p-0">
              <div className="overflow-x-auto max-h-[600px]">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-paper">
                    <tr className="text-ink-soft text-xs uppercase tracking-wider font-semibold border-b border-line">
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Gear</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {rentals?.map((rental: any) => (
                      <tr key={rental.id} className="hover:bg-line/50 transition-colors">
                        <td className="p-4 text-xs font-mono text-ink-soft">
                          {rental.id.slice(-6).toUpperCase()}
                        </td>
                        <td className="p-4">
                          <p className="font-semibold text-ink line-clamp-1">{rental.gear?.name}</p>
                        </td>
                        <td className="p-4 text-sm text-ink-soft">
                          {rental.customer?.name}
                        </td>
                        <td className="p-4 text-right">
                          <Badge variant="info">{rental.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
