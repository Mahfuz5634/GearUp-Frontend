import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import TanstackProvider from '@/providers/TanstackProvider';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GearUp | Rent Sports & Outdoor Gear Instantly',
  description: 'Rent outdoor gear securely and easily.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanstackProvider>
          {/* navbar */}
          <Navbar></Navbar>
          <main className="min-h-screen">
            {children}
          </main>
          {/* footer */}
        </TanstackProvider>
      </body>
    </html>
  );
}