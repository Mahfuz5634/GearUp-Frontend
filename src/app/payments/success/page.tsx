"use client";

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

import { confirmPayment } from '@/services/payment.service';

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState(5);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!sessionId) return;
    
    const verify = async () => {
      try {
        await confirmPayment(sessionId);
        setIsConfirmed(true);
      } catch (err) {
        console.error('Failed to confirm payment on client:', err);
      }
    };
    verify();

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/dashboard/customer');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [sessionId, router]);

  return (
    <div className="bg-card p-10 rounded-2xl shadow-sm border border-line max-w-md w-full text-center">
      <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 size={40} className="text-green-600" />
      </div>
      
      <h1 className="font-display text-3xl text-ink tracking-tight mb-2">Payment Successful!</h1>
      <p className="text-ink-soft mb-8">
        Thank you for your payment. Your rental order is now confirmed and paid.
      </p>
      
      <div className="bg-paper p-4 rounded-xl border border-line mb-8">
        <p className="text-sm text-ink-soft font-medium mb-1">Redirecting to Dashboard in</p>
        <p className="text-3xl font-bold text-ink">{countdown}s</p>
      </div>

      <Button 
        onClick={() => router.push('/dashboard/customer')} 
        className="w-full"
        size="lg"
        rightIcon={<ArrowRight size={16} />}
      >
        Go to Dashboard Now
      </Button>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="bg-paper min-h-screen flex items-center justify-center p-4">
      <Suspense fallback={<div className="p-10 text-center animate-pulse">Loading...</div>}>
        <PaymentSuccessContent />
      </Suspense>
    </div>
  );
}
