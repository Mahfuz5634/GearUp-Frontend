import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Archivo_Black } from 'next/font/google';
import './globals.css';
import TanstackProvider from '@/providers/TanstackProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], display: 'swap' });
const archivoBlack = Archivo_Black({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display-family',
});

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
      <body className={`${plusJakarta.className} ${archivoBlack.variable} antialiased text-ink selection:bg-trail selection:text-white flex flex-col min-h-screen`}>
        <TanstackProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}