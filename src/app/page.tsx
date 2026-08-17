"use client";

import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Compass, ShieldCheck, Zap } from "lucide-react";
import { getAllGears } from "@/services/gear.service";
import { Gear } from "@/types";
import { Button } from "@/components/ui/Button";
import { Loader } from "@/components/ui/Loader";
import { CategoryIcon } from "@/components/ui/CategoryIcon";

export default function Home() {
  const { data: gears, isLoading } = useQuery<Gear[]>({
    queryKey: ["featured-gears"],
    queryFn: () => getAllGears({ limit: 4 }),
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-ink text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 topo" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-44 flex flex-col items-center text-center">
          <span className="animate-rise inline-flex items-center gap-2 text-trail font-bold text-xs uppercase tracking-[0.25em] mb-8">
            <span className="w-2 h-2 rounded-full bg-trail animate-pulse" />
            Outdoor gear · rented on demand
          </span>
          <h1 className="animate-rise delay-1 font-display text-5xl md:text-7xl tracking-tight leading-[1.05] mb-8 max-w-4xl">
            Rent Sports & Outdoor Gear Instantly
          </h1>
          <p className="animate-rise delay-2 text-xl md:text-2xl text-zinc-300 max-w-3xl mb-12">
            From mountain bikes to camping tents, get the gear you need for your next adventure without the commitment of buying.
          </p>
          <div className="animate-rise delay-3 flex flex-col sm:flex-row gap-4">
            <Link href="/gear">
              <Button size="lg" className="w-full sm:w-auto bg-trail text-white hover:bg-trail-dark shadow-lg shadow-trail/30">
                Browse Gear <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/40 text-white hover:bg-white/10 hover:text-white hover:border-white">
                Become a Provider
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-card rounded-2xl border border-line flex items-center justify-center mb-6 text-trail shadow-sm">
                <Compass size={32} />
              </div>
              <h3 className="font-display text-xl text-ink mb-3">Explore Anywhere</h3>
              <p className="text-ink-soft">Find the perfect gear for any terrain, weather, or activity level.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-card rounded-2xl border border-line flex items-center justify-center mb-6 text-trail shadow-sm">
                <Zap size={32} />
              </div>
              <h3 className="font-display text-xl text-ink mb-3">Instant Booking</h3>
              <p className="text-ink-soft">Check availability in real-time and secure your gear instantly.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-card rounded-2xl border border-line flex items-center justify-center mb-6 text-trail shadow-sm">
                <ShieldCheck size={32} />
              </div>
              <h3 className="font-display text-xl text-ink mb-3">Secure & Verified</h3>
              <p className="text-ink-soft">All providers are verified and payments are processed securely.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Gear Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-trail-dark mb-3">Top picks</p>
              <h2 className="font-display text-4xl text-ink mb-2">Featured Gear</h2>
              <p className="text-ink-soft">Top picks for your next adventure</p>
            </div>
            <Link href="/gear" className="hidden sm:flex text-sm font-semibold text-trail-dark hover:text-trail items-center gap-1">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="py-20">
              <Loader size={32} />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {gears?.map((gear, i) => (
                <Link
                  key={gear.id}
                  href={`/gear/${gear.id}`}
                  className={`group relative block rounded-2xl bg-paper border border-line overflow-hidden hover:shadow-xl hover:shadow-ink/10 hover:-translate-y-1 transition-all duration-300 animate-rise delay-${Math.min(i + 1, 6)}`}
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-trail scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-11 h-11 rounded-xl bg-ink text-trail flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
                        <CategoryIcon name={gear.category?.name} size={22} />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-ink-soft">
                        {gear.category?.name || 'General'}
                      </span>
                    </div>
                    <h3 className="font-display text-lg text-ink line-clamp-1 mb-2 group-hover:text-trail-dark transition-colors">{gear.name}</h3>
                    <p className="text-sm text-ink-soft line-clamp-2 mb-6">{gear.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-line">
                      <span className="text-lg text-ink">
                        <span className="font-bold text-trail-dark">${gear.price}</span>
                        <span className="text-sm text-ink-soft font-normal"> /day</span>
                      </span>
                      <span className="text-sm font-semibold text-ink group-hover:text-trail-dark flex items-center gap-1 transition-colors">
                        Rent <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-10 sm:hidden">
            <Link href="/gear">
              <Button className="w-full" variant="outline">View all gear</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}