import Link from "next/link";
import {
  BadgeCheck,
  Lock,
  Star,
  ShieldCheck,
  AlertTriangle,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const PILLARS = [
  {
    icon: BadgeCheck,
    title: "Verified providers",
    description: "Every provider passes ID verification and gear quality checks before their first listing goes live.",
  },
  {
    icon: Lock,
    title: "Secure payments",
    description: "All transactions run through Stripe with encrypted checkout — we never store your card details.",
  },
  {
    icon: Star,
    title: "Honest reviews",
    description: "Renters and providers rate every rental. Transparency keeps everyone accountable.",
  },
  {
    icon: ShieldCheck,
    title: "GearUp Guarantee",
    description: "Eligible rentals are covered for damage, loss and provider no-shows — up to full value.",
  },
];

const STEPS = [
  {
    title: "Verified sign-up",
    description: "Everyone — renters and providers — confirms identity and contact details before joining.",
  },
  {
    title: "Checked-in gear",
    description: "Listed gear must meet our quality checklist: safe, clean, and exactly as described.",
  },
  {
    title: "Protected payments",
    description: "Funds are held securely until the rental is confirmed, then released to the provider.",
  },
  {
    title: "Resolved disputes",
    description: "Our support team steps in fast with clear mediation if anything goes wrong.",
  },
];

export default function TrustSafetyPage() {
  return (
    <div className="bg-paper">
      {/* Hero */}
      <section className="relative bg-ink text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 topo" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
          <span className="inline-flex items-center gap-2 text-trail font-bold text-xs uppercase tracking-[0.25em] mb-6">
            <ShieldCheck size={14} /> Trust & Safety
          </span>
          <h1 className="font-display text-5xl md:text-6xl tracking-tight leading-[1.05] mb-6">Explore with confidence</h1>
          <p className="text-zinc-300 text-lg md:text-xl max-w-2xl mx-auto">
            Trust is the gear that holds our marketplace together. Here&apos;s how we protect every rental, every provider and every adventure.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-trail-dark mb-4">Our commitments</p>
            <h2 className="font-display text-3xl md:text-4xl text-ink mb-3">How we keep it safe</h2>
            <p className="text-ink-soft max-w-xl mx-auto">Four pillars power everything we do.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="group relative bg-card border border-line rounded-2xl p-8 hover:shadow-xl hover:shadow-ink/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-trail scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
                <span className="w-12 h-12 rounded-xl bg-ink text-trail flex items-center justify-center mb-6">
                  <pillar.icon size={24} />
                </span>
                <h3 className="font-display text-lg text-ink mb-3">{pillar.title}</h3>
                <p className="text-sm text-ink-soft leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-trail-dark mb-4">Behind the scenes</p>
            <h2 className="font-display text-3xl md:text-4xl text-ink mb-3">Safety at every step</h2>
            <p className="text-ink-soft max-w-xl mx-auto">From sign-up to return, each stage is designed to de-risk the exchange.</p>
          </div>

          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-4 bg-paper border border-line rounded-2xl p-6">
                <span className="w-10 h-10 rounded-full bg-ink text-trail flex items-center justify-center font-bold shrink-0">
                  {i + 1}
                </span>
                <div>
                  <p className="font-bold text-ink mb-1">{step.title}</p>
                  <p className="text-sm text-ink-soft leading-relaxed">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 bg-paper border border-line rounded-2xl p-6">
            <span className="w-12 h-12 rounded-xl bg-trail/15 text-trail-dark flex items-center justify-center shrink-0">
              <Truck size={24} />
            </span>
            <p className="text-sm text-ink-soft flex-1">
              <span className="font-bold text-ink">Renting or listing?</span> Read the{" "}
              <Link href="/terms" className="text-trail-dark font-semibold hover:underline">Terms of Service</Link> or
              review your coverage in the <Link href="/about" className="text-trail-dark font-semibold hover:underline">GearUp Guarantee</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Report */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-ink text-white rounded-2xl overflow-hidden px-8 py-14 lg:px-16 text-center">
            <div className="absolute inset-0 z-0 opacity-20">
              <div className="absolute inset-0 topo" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 mb-4 text-trail">
                <AlertTriangle size={20} />
              </div>
              <h2 className="font-display text-3xl md:text-4xl mb-4">Spot a problem? Report it</h2>
              <p className="text-zinc-300 max-w-xl mx-auto mb-8">
                Our safety team reviews every report within 24 hours and takes action to keep the community safe.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:safety@gearup.com">
                  <Button size="lg" className="bg-trail text-white hover:bg-trail-dark shadow-lg shadow-trail/30">
                    Contact Safety Team
                  </Button>
                </a>
                <Link href="/gear">
                  <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 hover:text-white hover:border-white">
                    Browse Gear
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