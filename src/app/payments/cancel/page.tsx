"use client";

import { useRouter } from 'next/navigation';
import { XCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function PaymentCancelPage() {
  const router = useRouter();

  return (
    <div className="bg-zinc-50 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-10 rounded-2xl shadow-sm border border-zinc-200 max-w-md w-full text-center">
        <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <XCircle size={40} className="text-red-600" />
        </div>
        
        <h1 className="text-3xl font-extrabold text-zinc-900 mb-2">Payment Cancelled</h1>
        <p className="text-zinc-500 mb-8">
          You have cancelled the payment process. Your order has not been paid.
        </p>
        
        <Button 
          onClick={() => router.push('/dashboard/customer')} 
          className="w-full"
          size="lg"
          variant="outline"
          leftIcon={<ArrowLeft size={16} />}
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
}
