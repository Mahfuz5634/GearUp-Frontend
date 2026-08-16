// src/app/dashboard/customer/page.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { getMyRentals } from '@/services/rental.service';
import { format } from 'date-fns'; 

export default function CustomerDashboard() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['my-rentals'],
    queryFn: getMyRentals,
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PLACED': return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-bold">PLACED</span>;
      case 'CONFIRMED': return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold">CONFIRMED</span>;
      case 'PAID': return <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-bold">PAID</span>;
      case 'PICKED_UP': return <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">PICKED_UP</span>;
      case 'RETURNED': return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-bold">RETURNED</span>;
      default: return <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-bold">{status}</span>;
    }
  };

  if (isLoading) return <div className="text-center mt-20 animate-pulse">Loading dashboard...</div>;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">My Rental Orders</h1>
      
      <div className="bg-white rounded-lg shadow border overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-600 text-sm uppercase">
              <th className="p-4 border-b">Gear</th>
              <th className="p-4 border-b">Dates</th>
              <th className="p-4 border-b">Status</th>
              <th className="p-4 border-b text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order: any) => (
              <tr key={order.id} className="hover:bg-slate-50 border-b last:border-0">
                <td className="p-4 font-semibold text-slate-800">{order.gear?.name}</td>
                <td className="p-4 text-sm text-gray-600">
                  {new Date(order.startDate).toLocaleDateString()} - {new Date(order.endDate).toLocaleDateString()}
                </td>
                <td className="p-4">{getStatusBadge(order.status)}</td>
                <td className="p-4 text-right">
                  {order.status === 'CONFIRMED' && (
                    <Link 
                      href={`/dashboard/customer/payment/${order.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 text-sm font-bold"
                    >
                      Pay Now
                    </Link>
                  )}
                  {order.status === 'RETURNED' && (
                    <button className="bg-orange-500 text-white px-4 py-2 rounded shadow hover:bg-orange-600 text-sm font-bold">
                      Leave Review
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {orders?.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">You haven't rented anything yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}