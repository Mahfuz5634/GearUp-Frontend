import Link from "next/link";
import { FileText, Scale, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const SECTIONS = [
  {
    title: "1. Acceptance of terms",
    body: "By accessing or using GearUp, you agree to be bound by these Terms of Service and all applicable laws. If you do not agree with any part of these terms, please discontinue use of the platform.",
  },
  {
    title: "2. The rental marketplace",
    body: "GearUp is a marketplace that connects gear owners ('Providers') with renters ('Customers'). GearUp is not a party to the rental agreement between Provider and Customer, but provides booking, payment processing and dispute support services.",
  },
  {
    title: "3. User accounts",
    body: "You must provide accurate information when creating an account and keep your credentials secure. Accounts suspected of fraudulent activity may be suspended or terminated without notice.",
  },
  {
    title: "4. Bookings and availability",
    body: "A booking is confirmed once the Customer selects dates and the order is placed. Availability is shown in real time and GearUp is not liable for bookings that cannot be fulfilled due to Provider circumstances, though the GearUp Guarantee may apply.",
  },
  {
    title: "5. Payments and fees",
    body: "Payments are processed securely through Stripe. Rental fees are calculated per day based on the listed price. Applicable taxes and service fees may be added at checkout and will always be shown before you confirm a payment.",
  },
  {
    title: "6. Cancellations and refunds",
    body: "Customers may cancel a booking before the rental start date to receive a full refund, unless the Provider has already confirmed pickup. Providers may cancel only in exceptional circumstances and should contact support immediately.",
  },
  {
    title: "7. Care of rented gear",
    body: "Customers agree to use rented gear only for its intended purpose, follow the Provider's usage instructions, and return it in the same condition it was received, subject to fair wear and tear.",
  },
  {
    title: "8. Liability",
    body: "To the maximum extent permitted by law, GearUp is not liable for direct, indirect, incidental or consequential damages arising from the use of the platform or rented gear. The GearUp Guarantee covers eligible claims up to the rental value.",
  },
  {
    title: "9. Intellectual property",
    body: "All content on GearUp — including logos, designs, and text — is the property of GearUp Inc. unless otherwise stated, and may not be reproduced without written permission.",
  },
  {
    title: "10. Governing law",
    body: "These terms are governed by the laws of Bangladesh. Any disputes shall be resolved in the courts of Dhaka, Bangladesh.",
  },
];

export default function TermsPage() {
  return (
    <div className="bg-paper">
      {/* Hero */}
      <section className="relative bg-ink text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 topo" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 text-center">
          <span className="inline-flex items-center gap-2 text-trail font-bold text-xs uppercase tracking-[0.25em] mb-6">
            <FileText size={14} /> Legal
          </span>
          <h1 className="font-display text-5xl md:text-6xl tracking-tight leading-[1.05] mb-6">Terms of Service</h1>
          <p className="text-zinc-300 text-lg max-w-2xl mx-auto">
            The rules of the road for using GearUp. Last updated: August 2026.
          </p>
        </div>
      </section>

      {/* Terms */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10 bg-card border border-line rounded-2xl p-6">
            <span className="w-12 h-12 rounded-xl bg-trail/15 text-trail-dark flex items-center justify-center shrink-0">
              <Scale size={24} />
            </span>
            <p className="text-sm text-ink-soft">
              These Terms of Service constitute a legally binding agreement between you and GearUp Inc. Please read them carefully.
            </p>
          </div>

          <div className="space-y-8">
            {SECTIONS.map((section) => (
              <div key={section.title} className="bg-card border border-line rounded-2xl p-8">
                <h2 className="font-display text-xl text-ink mb-3">{section.title}</h2>
                <p className="text-sm text-ink-soft leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-card border border-line rounded-2xl p-8 text-center">
            <h2 className="font-display text-xl text-ink mb-2">Questions about these terms?</h2>
            <p className="text-sm text-ink-soft mb-6">
              Reach us at <a href="mailto:legal@gearup.com" className="text-trail-dark font-semibold hover:underline">legal@gearup.com</a> or check the{" "}
              <Link href="/trust-safety" className="text-trail-dark font-semibold hover:underline">Trust &amp; Safety</Link> page.
            </p>
            <Link href="/gear">
              <Button className="bg-trail text-white hover:bg-trail-dark">
                Back to Gear <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}