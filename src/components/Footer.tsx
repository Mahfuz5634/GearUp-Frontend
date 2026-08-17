import Link from 'next/link';
import { Compass, Globe, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-ink text-zinc-400 py-12 lg:py-16 mt-auto overflow-hidden">
      <div className="absolute inset-0 opacity-40 [filter:invert(1)]">
        <div className="absolute inset-0 topo" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
          
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <span className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                <Compass className="text-trail h-8 w-8" />
              </span>
              <span className="text-2xl font-black text-white tracking-tight">GearUp.</span>
            </Link>
            <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
              Premium sports & outdoor gear rentals. Stop buying equipment you use once a year. Rent from locals, explore more.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-zinc-500 hover:text-trail transition-colors"><Globe size={20} /></a>
              <a href="#" className="text-zinc-500 hover:text-trail transition-colors"><Mail size={20} /></a>
              <a href="#" className="text-zinc-500 hover:text-trail transition-colors"><Phone size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Explore</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/gear" className="hover:text-trail transition-colors">All Gear</Link></li>
              <li><Link href="/gear?category=Cycling" className="hover:text-trail transition-colors">Cycling</Link></li>
              <li><Link href="/gear?category=Camping" className="hover:text-trail transition-colors">Camping</Link></li>
              <li><Link href="/gear?category=Water+Sports" className="hover:text-trail transition-colors">Water Sports</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-trail transition-colors">About Us</Link></li>
              <li><a href="#" className="hover:text-trail transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-trail transition-colors">Trust & Safety</a></li>
              <li><a href="#" className="hover:text-trail transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-trail transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-trail transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-trail transition-colors">Cancellation Policy</a></li>
              <li><a href="#" className="hover:text-trail transition-colors">Provider Guidelines</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} GearUp Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-trail transition-colors">Privacy</a>
            <a href="#" className="hover:text-trail transition-colors">Terms</a>
            <a href="#" className="hover:text-trail transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
