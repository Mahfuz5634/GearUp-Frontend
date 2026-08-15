'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { registerUser } from '@/services/auth.service';
import Link from 'next/link';
import { AxiosError } from 'axios';

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

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 border">
        <h2 className="text-2xl font-bold text-center mb-6">Join GearUp</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            required
            className="border p-2 rounded-md focus:outline-orange-500"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            className="border p-2 rounded-md focus:outline-orange-500"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password (Min 6 chars)"
            required
            minLength={6}
            className="border p-2 rounded-md focus:outline-orange-500"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <select
            className="border p-2 rounded-md focus:outline-orange-500 bg-white"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="CUSTOMER">I want to rent gear (Customer)</option>
            <option value="PROVIDER">I want to list gear (Provider)</option>
          </select>
          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="bg-orange-600 text-white p-2 rounded-md hover:bg-orange-700 disabled:bg-gray-400"
          >
            {registerMutation.isPending ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account? <Link href="/auth/login" className="text-orange-600 font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
}