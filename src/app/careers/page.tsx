import {
  Briefcase,
  Coffee,
  Compass,
  GraduationCap,
  Heart,
  MapPin,
  Rocket,
  Clock,
  ArrowRight,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const PERKS = [
  { icon: Compass, title: "Adventure stipend", description: "Annual budget to rent gear and explore — on us." },
  { icon: Heart, title: "Health & wellness", description: "Full medical, dental and mental-health support." },
  { icon: Rocket, title: "Grow fast", description: "Clear growth paths and mentorship from day one." },
  { icon: GraduationCap, title: "Learning budget", description: "Yearly allowance for courses, books and events." },
  { icon: Clock, title: "Flexible time", description: "Own your schedule with a hybrid remote model." },
  { icon: Coffee, title: "Great vibes", description: "Weekly team adventures and a gear-filled office." },
];

const ROLES = [
  {
    title: "Senior Product Engineer",
    department: "Engineering",
    location: "Remote · Worldwide",
    type: "Full-time",
    tag: "Featured",
  },
  {
    title: "Partnerships Manager",
    department: "Growth",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
  },
  {
    title: "Community & Support Lead",
    department: "Operations",
    location: "Remote · Europe",
    type: "Full-time",
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Remote · Worldwide",
    type: "Contract",
  },
  {
    title: "Data Analyst",
    department: "Data",
    location: "Remote · APAC",
    type: "Full-time",
  },
];

export default function CareersPage() {
  return (
    <div className="bg-paper">
      {/* Hero */}
      <section className="relative bg-ink text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 topo" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
          <span className="inline-flex items-center gap-2 text-trail font-bold text-xs uppercase tracking-[0.25em] mb-6">
            <Briefcase size={14} /> Careers at GearUp
          </span>
          <h1 className="font-display text-5xl md:text-6xl tracking-tight leading-[1.05] mb-6">Do work worth adventuring for</h1>
          <p className="text-zinc-300 text-lg md:text-xl max-w-2xl mx-auto">
            We&apos;re building the sharing economy for outdoor gear — one rental at a time. Join a small team obsessed with getting people outside.
          </p>
        </div>
      </section>

      {/* Perks */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-trail-dark mb-4">Life at GearUp</p>
            <h2 className="font-display text-3xl md:text-4xl text-ink mb-3">Perks built around exploring</h2>
            <p className="text-ink-soft max-w-xl mx-auto">We take care of the team so you can focus on the mission.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PERKS.map((perk) => (
              <div
                key={perk.title}
                className="group relative bg-card border border-line rounded-2xl p-8 hover:shadow-xl hover:shadow-ink/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-trail scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
                <span className="w-12 h-12 rounded-xl bg-ink text-trail flex items-center justify-center mb-6">
                  <perk.icon size={24} />
                </span>
                <h3 className="font-display text-lg text-ink mb-3">{perk.title}</h3>
                <p className="text-sm text-ink-soft leading-relaxed">{perk.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="py-20 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-trail-dark mb-4">Open positions</p>
            <h2 className="font-display text-3xl md:text-4xl text-ink mb-3">Join the crew</h2>
            <p className="text-ink-soft max-w-xl mx-auto">
              Don&apos;t see your role? Send a note to{" "}
              <a href="mailto:careers@gearup.com" className="text-trail-dark font-semibold hover:underline">careers@gearup.com</a> anyway.
            </p>
          </div>

          <div className="space-y-4">
            {ROLES.map((role) => (
              <div
                key={role.title}
                className="group flex flex-col md:flex-row md:items-center justify-between gap-4 bg-paper border border-line rounded-2xl p-6 hover:border-trail/40 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-display text-lg text-ink">{role.title}</h3>
                    {role.tag && (
                      <span className="text-[11px] font-bold uppercase tracking-wider bg-trail/15 text-trail-dark px-2 py-0.5 rounded-full">
                        {role.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-ink-soft flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span>{role.department}</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={14} /> {role.location}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={14} /> {role.type}
                    </span>
                  </p>
                </div>
                <Button size="sm" className="shrink-0">
                  Apply <ArrowRight size={16} className="ml-1" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-ink text-white rounded-2xl overflow-hidden px-8 py-14 lg:px-16 text-center">
            <div className="absolute inset-0 z-0 opacity-20">
              <div className="absolute inset-0 topo" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 mb-4 text-trail">
                <Users size={20} />
              </div>
              <h2 className="font-display text-3xl md:text-4xl mb-4">Don&apos;t see a fit yet?</h2>
              <p className="text-zinc-300 max-w-xl mx-auto mb-8">
                We&apos;re always keen to meet passionate builders, designers and outdoor lovers.
              </p>
              <a href="mailto:careers@gearup.com">
                <Button size="lg" className="bg-trail text-white hover:bg-trail-dark shadow-lg shadow-trail/30">
                  Get in touch <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}