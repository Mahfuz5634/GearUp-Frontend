"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Compass, ShieldCheck, Zap } from "lucide-react";
import { getAllGears } from "@/services/gear.service";
import { Gear } from "@/types";
import { Button } from "@/components/ui/Button";
import { Loader } from "@/components/ui/Loader";

export default function Home() {
  const { data: gears, isLoading } = useQuery<Gear[]>({
    queryKey: ["featured-gears"],
    queryFn: () => getAllGears({ limit: 4 }),
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-zinc-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-48 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Rent Sports & Outdoor Gear Instantly
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl mb-10">
            From mountain bikes to camping tents, get the gear you need for your next adventure without the commitment of buying.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/gear">
              <Button size="lg" className="w-full sm:w-auto bg-white text-zinc-900 hover:bg-zinc-100">
                Browse Gear <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10 hover:text-white">
                Become a Provider
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-zinc-900">
                <Compass size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Explore Anywhere</h3>
              <p className="text-zinc-600">Find the perfect gear for any terrain, weather, or activity level.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-zinc-900">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Booking</h3>
              <p className="text-zinc-600">Check availability in real-time and secure your gear instantly.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-zinc-900">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure & Verified</h3>
              <p className="text-zinc-600">All providers are verified and payments are processed securely.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Gear Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-zinc-900 mb-2">Featured Gear</h2>
              <p className="text-zinc-600">Top picks for your next adventure</p>
            </div>
            <Link href="/gear" className="hidden sm:flex text-sm font-medium text-zinc-900 hover:underline items-center">
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
                <Link key={gear.id} href={`/gear/${gear.id}`} className="group block rounded-xl border border-zinc-200 overflow-hidden hover:shadow-lg transition-shadow bg-white">
                  <div className="aspect-[4/3] bg-zinc-100 relative">
                    <Image 
                      src={`https://images.unsplash.com/photo-${[
                        '1517836357463-d25dfeac3438',
                        '1522163182402-834f871fd851',
                        '1455587734955-081b22074882',
                        '1563852069670-3d778d9b1580'
                      ][i % 4]}?auto=format&fit=crop&w=500&q=80`}
                      alt={gear.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg text-zinc-900 line-clamp-1">{gear.name}</h3>
                    </div>
                    <p className="text-zinc-500 text-sm mb-4 line-clamp-2">{gear.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-zinc-900">${gear.price} <span className="text-sm font-normal text-zinc-500">/day</span></span>
                      <span className="text-xs font-medium px-2 py-1 bg-zinc-100 text-zinc-800 rounded-md">{gear.category?.name}</span>
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
