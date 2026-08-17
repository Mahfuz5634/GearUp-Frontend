import Link from "next/link";
import { Compass, MapPin, Users, Truck, Leaf, ShieldCheck, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CategoryIcon } from "@/components/ui/CategoryIcon";

const STATS = [
  { value: "12k+", label: "Gear rentals" },
  { value: "850+", label: "Local providers" },
  { value: "40+", label: "Cities covered" },
  { value: "4.9★", label: "Average rating" },
];

const VALUES = [
  {
    icon: Users,
    title: "Community first",
    description: "We match adventurous locals with trusted gear owners in their own neighbourhood.",
  },
  {
    icon: Leaf,
    title: "Rent, don't buy",
    description: "Sharing gear means fewer products manufactured and less waste left behind.",
  },
  {
    icon: ShieldCheck,
    title: "Trust & safety",
    description: "Every provider is verified and every rental is protected by the GearUp Guarantee.",
  },
  {
    icon: Clock,
    title: "Instant booking",
    description: "Real-time availability, secure payments and pickup that fits your schedule.",
  },
];

const TEAM = [
  { name: "Maya Rahman", role: "Co-founder & CEO", initials: "MR" },
  { name: "Daniel Okafor", role: "Co-founder & CTO", initials: "DO" },
  { name: "Sofia Lindqvist", role: "Head of Operations", initials: "SL" },
  { name: "Arjun Mehta", role: "Head of Partnerships", initials: "AM" },
  { name: "Lena Petrova", role: "Community Lead", initials: "LP" },
  { name: "Tomás Ferreira", role: "Product Designer", initials: "TF" },
];

export default function AboutPage() {
  return (
    <div className="bg-paper">
      {/* Hero */}
      <section className="relative bg-ink text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 topo" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
          <span className="inline-flex items-center gap-2 text-trail font-bold text-xs uppercase tracking-[0.25em] mb-6">
            <Compass size={14} /> About GearUp
          </span>
          <h1 className="font-display text-5xl md:text-6xl tracking-tight leading-[1.05] mb-6">The GearUp Story</h1>
          <p className="text-zinc-300 text-lg md:text-xl max-w-2xl mx-auto">
            We believe you shouldn&apos;t have to own the gear to enjoy the adventure. One marketplace, thousands of shared adventures.
          </p>
        </div>
      </section>

      {/* Story / Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-trail-dark mb-4">Our mission</p>
            <h2 className="font-display text-3xl md:text-4xl text-ink mb-6">Make every weekend an adventure</h2>
            <p className="text-ink-soft leading-relaxed mb-4">
              GearUp started when two friends couldn&apos;t justify buying a second kayak for a single summer trip. They rented one from a neighbour instead — and a marketplace was born.
            </p>
            <p className="text-ink-soft leading-relaxed mb-8">
              Today GearUp connects thousands of outdoor enthusiasts with local gear owners across 40+ cities. Mountain bikes, camping tents, paddle boards, dumbbells — if it powers your passion, it&apos;s one tap away.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["Cycling", "Camping", "Fitness", "Water Sports"].map((cat) => (
                <div key={cat} className="flex items-center gap-3 bg-card border border-line rounded-xl px-4 py-3">
                  <span className="w-9 h-9 rounded-lg bg-ink text-trail flex items-center justify-center">
                    <CategoryIcon name={cat} size={18} />
                  </span>
                  <span className="text-sm font-semibold text-ink">{cat} gear</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-line rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-11 h-11 rounded-xl bg-trail/15 text-trail-dark flex items-center justify-center">
                <MapPin size={22} />
              </span>
              <h3 className="font-display text-xl text-ink">How it works</h3>
            </div>
            <ol className="space-y-5">
              {[
                ["Search", "Filter gear by activity, price and location."],
                ["Book", "Pick your dates and secure the rental instantly."],
                ["Pick up", "Meet the provider and grab your gear."],
                ["Explore", "Adventure first, return the gear when you're done."],
              ].map(([title, desc], i) => (
                <li key={title} className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-ink text-trail flex items-center justify-center font-bold text-sm shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-bold text-ink">{title}</p>
                    <p className="text-sm text-ink-soft">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-ink text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 topo" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-4xl md:text-5xl text-trail mb-2">{stat.value}</p>
                <p className="text-zinc-300 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-trail-dark mb-4">What we stand for</p>
            <h2 className="font-display text-3xl md:text-4xl text-ink mb-3">Our values</h2>
            <p className="text-ink-soft max-w-xl mx-auto">The principles that guide every rental, every partnership and every decision.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value) => (
              <div key={value.title} className="group relative bg-paper border border-line rounded-2xl p-8 hover:shadow-xl hover:shadow-ink/10 hover:-translate-y-1 transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-1 bg-trail scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
                <span className="w-12 h-12 rounded-xl bg-ink text-trail flex items-center justify-center mb-6">
                  <value.icon size={24} />
                </span>
                <h3 className="font-display text-lg text-ink mb-3">{value.title}</h3>
                <p className="text-sm text-ink-soft leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-trail-dark mb-4">The people</p>
            <h2 className="font-display text-3xl md:text-4xl text-ink mb-3">Meet the crew</h2>
            <p className="text-ink-soft max-w-xl mx-auto">A small team of outdoor enthusiasts building the sharing economy for gear.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {TEAM.map((member) => (
              <div key={member.name} className="text-center group">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-ink text-trail flex items-center justify-center font-display text-2xl mb-4 group-hover:bg-trail group-hover:text-white transition-colors duration-300">
                  {member.initials}
                </div>
                <p className="font-bold text-ink text-sm leading-tight">{member.name}</p>
                <p className="text-xs text-ink-soft mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-ink text-white rounded-2xl overflow-hidden px-8 py-14 lg:px-16 text-center">
            <div className="absolute inset-0 z-0 opacity-20">
              <div className="absolute inset-0 topo" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 mb-4 text-trail">
                <Truck size={20} />
              </div>
              <h2 className="font-display text-3xl md:text-4xl mb-4">Ready to gear up?</h2>
              <p className="text-zinc-300 max-w-xl mx-auto mb-8">
                Join thousands of adventurers renting from locals — and start earning from gear that&apos;s just sitting in your garage.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
          </div>
        </div>
      </section>
    </div>
  );
}