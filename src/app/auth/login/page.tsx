
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { loginUser } from '@/services/auth.service';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';
import { AxiosError } from 'axios';

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

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 border">
        <h2 className="text-2xl font-bold text-center mb-6">Login to GearUp</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email Address"
            required
            className="border p-2 rounded-md focus:outline-orange-500"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="border p-2 rounded-md focus:outline-orange-500"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="bg-orange-600 text-white p-2 rounded-md hover:bg-orange-700 disabled:bg-gray-400"
          >
            {loginMutation.isPending ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don&apos;t have an account? <Link href="/auth/register" className="text-orange-600 font-semibold">Register</Link>
        </p>
      </div>
    </div>
  );
}