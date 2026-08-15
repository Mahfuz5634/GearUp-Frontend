'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <nav className="bg-slate-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-orange-500">
          GearUp 🏋️
        </Link>

        <div className="flex gap-6 items-center">
          <Link href="/gear" className="hover:text-orange-400 transition">Browse Gear</Link>
          
          {user ? (
            <>
            
              <Link 
                href={`/dashboard/${user.role.toLowerCase()}`} 
                className="hover:text-orange-400 transition"
              >
                Dashboard
              </Link>
              <button 
                onClick={handleLogout} 
                className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="hover:text-orange-400 transition">Login</Link>
              <Link 
                href="/auth/register" 
                className="bg-orange-600 px-4 py-2 rounded-md hover:bg-orange-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}