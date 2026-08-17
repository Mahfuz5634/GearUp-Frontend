'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { registerUser } from '@/services/auth.service';
import Link from 'next/link';
import { AxiosError } from 'axios';
import { Button } from '@/components/ui/Button';
import { Compass } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'CUSTOMER' });

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success('Registration successful! Please login.');
        router.push('/auth/login');
      } else {
        toast.error(data.message || 'Registration failed!');
      }
    },
    onError: (error: AxiosError<{message: string}>) => {
      toast.error(error?.response?.data?.message || 'Something went wrong!');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };

  const inputClass = "w-full p-3 border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-trail bg-paper text-ink placeholder:text-ink-soft/60";

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-paper px-4 py-12">
      <div className="w-full max-w-md bg-card p-8 rounded-2xl shadow-sm border border-line">
        <div className="mb-8 text-center">
          <div className="mx-auto w-12 h-12 rounded-xl bg-ink text-trail flex items-center justify-center mb-4">
            <Compass size={24} />
          </div>
          <h2 className="font-display text-2xl text-ink tracking-tight">Join GearUp</h2>
          <p className="text-ink-soft text-sm mt-1">Start renting or list your gear</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            required
            className={inputClass}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            className={inputClass}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password (Min 6 chars)"
            required
            minLength={6}
            className={inputClass}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <select
            className={inputClass}
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="CUSTOMER">I want to rent gear (Customer)</option>
            <option value="PROVIDER">I want to list gear (Provider)</option>
          </select>
          <Button type="submit" size="lg" className="w-full" isLoading={registerMutation.isPending}>
            Register
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-ink-soft">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-trail-dark font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}