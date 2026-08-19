'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-paper px-4">
      <div className="bg-card p-8 rounded-2xl shadow-sm border border-line text-center max-w-md w-full">
        <div className="mx-auto w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle size={32} />
        </div>
        <h2 className="font-display text-2xl text-ink mb-2">Something went wrong!</h2>
        <p className="text-ink-soft mb-8">
          We encountered an unexpected error while processing your request.
        </p>
        <div className="flex flex-col gap-3">
          <Button onClick={() => reset()} size="lg" className="w-full">
            Try again
          </Button>
          <Button variant="outline" onClick={() => router.push('/')} size="lg" className="w-full">
            Go back home
          </Button>
        </div>
      </div>
    </div>
  );
}
