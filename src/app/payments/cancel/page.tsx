"use client";

import { useRouter } from 'next/navigation';
import { XCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function PaymentCancelPage() {
  const router = useRouter();

  return (
    <div className="bg-paper min-h-screen flex items-center justify-center p-4">
      <div className="bg-card p-10 rounded-2xl shadow-sm border border-line max-w-md w-full text-center">
        <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <XCircle size={40} className="text-red-600" />
        </div>
        
        <h1 className="font-display text-3xl text-ink tracking-tight mb-2">Payment Cancelled</h1>
        <p className="text-ink-soft mb-8">
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
