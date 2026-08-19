'use client'

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { Compass, Menu, X, ChevronDown, LayoutDashboard, LogOut, Mountain, Info, Briefcase, ShieldCheck, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const NAV_LINKS = [
  { href: '/gear', label: 'Browse Gear', icon: Mountain },
  { href: '/about', label: 'About', icon: Info },
  { href: '/careers', label: 'Careers', icon: Briefcase },
  { href: '/trust-safety', label: 'Trust & Safety', icon: ShieldCheck },
  { href: '/terms', label: 'Terms', icon: FileText },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const handleLogout = () => {
    setMobileOpen(false);
    logout();
    router.push('/auth/login');
  };

  const initials =
    user?.name
      ?.split(' ')
      .map((w) => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'U';

  const dashboardHref = user ? `/dashboard/${user.role.toLowerCase()}` : '/';

  const desktopLinkClass = (active: boolean) =>
    `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
      active ? 'bg-ink text-white' : 'text-ink-soft hover:text-ink hover:bg-line/40'
    }`;

  const mobileLinkClass = (active: boolean) =>
    `flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
      active ? 'bg-ink text-white' : 'text-ink hover:bg-line/40'
    }`;

  return (
    <nav className={`sticky top-0 z-50 glass transition-shadow duration-300 ${scrolled ? 'shadow-lg shadow-ink/5' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-9 h-9 rounded-xl bg-ink text-trail flex items-center justify-center shadow-sm">
            <Compass className="group-hover:rotate-45 transition-transform duration-500" size={22} />
          </span>
          <span className="text-2xl font-black text-ink tracking-tight">GearUp.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={desktopLinkClass(isActive(link.href))}
            >
              <link.icon size={16} />
              {link.label}
            </Link>
          ))}

          {user ? (
            <div className="relative ml-4">
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full border border-line bg-card hover:border-trail/40 transition-colors"
                aria-expanded={menuOpen}
                aria-label="Account menu"
              >
                <span className="w-8 h-8 rounded-full bg-ink text-trail flex items-center justify-center text-sm font-bold">
                  {initials}
                </span>
                <span className="text-sm font-semibold text-ink hidden lg:block max-w-[120px] truncate">{user.name}</span>
                <ChevronDown size={16} className={`text-ink-soft transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`} />
              </button>

              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 z-50 w-64 bg-card border border-line rounded-xl shadow-xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-line">
                      <p className="font-bold text-ink text-sm leading-tight">{user.name}</p>
                      <p className="text-xs text-ink-soft mt-1 uppercase tracking-wider">{user.role}</p>
                    </div>
                    <div className="p-2">
                      <Link
                        href={dashboardHref}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-ink hover:bg-line/40 transition-colors"
                      >
                        <LayoutDashboard size={18} className="text-trail-dark" /> Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={18} /> Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4 ml-4">
              <Link href="/auth/login" className="text-sm font-semibold text-ink-soft hover:text-ink transition-colors">Login</Link>
              <Link href="/auth/register">
                <Button size="sm">Register</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-ink hover:bg-line/40 transition-colors"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-line bg-card px-4 py-4 shadow-lg">
          <div className="space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={mobileLinkClass(isActive(link.href))}
              >
                <link.icon size={18} />
                {link.label}
              </Link>
            ))}

            <div className="my-2 border-t border-line" />

            {user ? (
              <>
                <Link
                  href={dashboardHref}
                  onClick={() => setMobileOpen(false)}
                  className={mobileLinkClass(isActive('/dashboard'))}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className={mobileLinkClass(isActive('/auth/login'))}
                >
                  Login
                </Link>
                <Link href="/auth/register" onClick={() => setMobileOpen(false)} className="block mt-2">
                  <Button className="w-full">Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}