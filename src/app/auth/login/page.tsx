'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { loginUser } from '@/services/auth.service';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';
import { AxiosError } from 'axios';
import { Button } from '@/components/ui/Button';
import { Compass } from 'lucide-react';

interface ErrorResponse {
  message: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.message || 'Logged in successfully!');
        setUser(data.data.user);
        router.push(`/dashboard/${data.data.user.role.toLowerCase()}`);
      } else {
        toast.error(data.message || 'Login failed!');
      }
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error?.response?.data?.message || 'Something went wrong!');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  const inputClass = "w-full p-3 border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-trail bg-paper text-ink placeholder:text-ink-soft/60";

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-paper px-4 py-12">
      <div className="w-full max-w-md bg-card p-8 rounded-2xl shadow-sm border border-line">
        <div className="mb-8 text-center">
          <div className="mx-auto w-12 h-12 rounded-xl bg-ink text-trail flex items-center justify-center mb-4">
            <Compass size={24} />
          </div>
          <h2 className="font-display text-2xl text-ink tracking-tight">Welcome back</h2>
          <p className="text-ink-soft text-sm mt-1">Login to rent gear instantly</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email Address"
            required
            className={inputClass}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className={inputClass}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <Button type="submit" size="lg" className="w-full" isLoading={loginMutation.isPending}>
            Login
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-ink-soft">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="text-trail-dark font-semibold hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}