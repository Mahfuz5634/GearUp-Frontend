"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */


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
    <div className="bg-paper min-h-screen py-12 flex justify-center items-center">
      <div className="w-full max-w-md bg-card rounded-2xl shadow-sm border border-line overflow-hidden">
        <div className="p-8 border-b border-line text-center">
          <div className="mx-auto w-16 h-16 bg-line/60 rounded-full flex items-center justify-center mb-4 text-ink">
            <CreditCard size={32} />
          </div>
          <h1 className="font-display text-2xl text-ink tracking-tight mb-2">Secure Payment</h1>
          <p className="text-ink-soft">Complete your rental order payment via Stripe.</p>
        </div>
        
        <div className="p-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader size={32} className="mb-4" />
              <p className="text-ink-soft font-medium">Initializing secure gateway...</p>
            </div>
          ) : checkoutUrl ? (
            <div className="flex flex-col gap-6 text-center">
              <div className="bg-paper p-4 rounded-xl border border-line flex items-center justify-center gap-2 text-sm text-green-700">
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
              
              <p className="text-xs text-ink-soft">
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