"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { createPaymentIntent } from '@/services/payment.service';
import { Loader } from '@/components/ui/Loader';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, CreditCard } from 'lucide-react';

export default function PaymentPage() {
  const params = useParams();
  const orderId = params.id as string;
  const router = useRouter();
  
  const [checkoutUrl, setCheckoutUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const initPayment = async () => {
      try {
        const data = await createPaymentIntent(orderId);
        if (data?.checkoutUrl) {
          setCheckoutUrl(data.checkoutUrl);
        } else {
          toast.error('Could not get payment URL from server.');
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Failed to initialize payment.');
      } finally {
        setIsLoading(false);
      }
    };
    initPayment();
  }, [orderId]);

  const handlePaymentRedirect = () => {
    if (!checkoutUrl) return;
    setIsRedirecting(true);
    window.location.href = checkoutUrl;
  };

  return (
    <div className="bg-zinc-50 min-h-screen py-12 flex justify-center items-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
        <div className="p-8 border-b border-zinc-100 text-center">
          <div className="mx-auto w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-4 text-zinc-900">
            <CreditCard size={32} />
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">Secure Payment</h1>
          <p className="text-zinc-500">Complete your rental order payment via Stripe.</p>
        </div>
        
        <div className="p-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader size={32} className="mb-4" />
              <p className="text-zinc-500 font-medium">Initializing secure gateway...</p>
            </div>
          ) : checkoutUrl ? (
            <div className="flex flex-col gap-6 text-center">
              <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 flex items-center justify-center gap-2 text-sm text-green-700">
                <ShieldCheck size={20} /> All transactions are secure and encrypted.
              </div>
              
              <Button 
                onClick={handlePaymentRedirect}
                size="lg"
                isLoading={isRedirecting}
                className="w-full h-14 text-lg bg-[#635BFF] hover:bg-[#5851df] text-white"
                leftIcon={<CreditCard size={20} />}
              >
                {isRedirecting ? 'Redirecting to Stripe...' : 'Pay with Stripe'}
              </Button>
              
              <p className="text-xs text-zinc-500">
                You will be securely redirected to Stripe to complete your payment.
              </p>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-red-500 font-medium mb-4">Unable to process payment at this time.</p>
              <Button variant="outline" onClick={() => router.back()}>Go Back</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}