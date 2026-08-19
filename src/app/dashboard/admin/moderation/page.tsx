"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useQuery } from '@tanstack/react-query';
import { getAllGearsAdmin, getAllRentals } from '@/services/admin.service';
import { Badge } from '@/components/ui/Badge';
import StatusBadge from '@/components/dashboard/StatusBadge';
import { SkeletonList } from '@/components/dashboard/Skeleton';
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

  const isLoading = isLoadingGears || isLoadingRentals;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl text-ink tracking-tight">Content Moderation</h2>
        <p className="text-ink-soft">Inspect all gear listings and rental orders across the platform.</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-2xl border border-line p-5"><SkeletonList rows={6} /></div>
          <div className="bg-card rounded-2xl border border-line p-5"><SkeletonList rows={6} /></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gear Listings */}
          <div className="bg-card rounded-2xl shadow-sm border border-line overflow-hidden">
            <div className="p-5 border-b border-line flex items-center gap-2">
              <Package size={20} className="text-trail" />
              <h3 className="text-lg font-bold text-ink">All Gear Listings</h3>
              <span className="ml-auto text-xs font-semibold text-ink-soft bg-line/60 px-2 py-1 rounded-full">
                {gears?.length || 0} items
              </span>
            </div>
            <div className="overflow-x-auto max-h-[600px]">
              <table className="w-full text-left border-collapse min-w-[480px]">
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
                          <Link href={`/gear/${gear.id}`} className="hover:text-trail-dark text-trail-dark" target="_blank">
                            {gear.name}
                          </Link>
                        </p>
                        <p className="text-xs text-ink-soft">${gear.price}/day</p>
                      </td>
                      <td className="p-4 text-sm text-ink-soft">{gear.provider?.name}</td>
                      <td className="p-4 text-right">
                        {gear.isDeleted ? (
                          <Badge variant="danger">Deleted</Badge>
                        ) : (
                          <Badge variant="success">Active</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Rental Orders */}
          <div className="bg-card rounded-2xl shadow-sm border border-line overflow-hidden">
            <div className="p-5 border-b border-line flex items-center gap-2">
              <ShoppingCart size={20} className="text-trail" />
              <h3 className="text-lg font-bold text-ink">All Rental Orders</h3>
              <span className="ml-auto text-xs font-semibold text-ink-soft bg-line/60 px-2 py-1 rounded-full">
                {rentals?.length || 0} orders
              </span>
            </div>
            <div className="overflow-x-auto max-h-[600px]">
              <table className="w-full text-left border-collapse min-w-[560px]">
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
                      <td className="p-4 text-xs font-mono text-ink-soft">{rental.id.slice(-6).toUpperCase()}</td>
                      <td className="p-4">
                        <p className="font-semibold text-ink line-clamp-1">{rental.gear?.name}</p>
                      </td>
                      <td className="p-4 text-sm text-ink-soft">{rental.customer?.name}</td>
                      <td className="p-4 text-right">
                        <StatusBadge status={rental.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}