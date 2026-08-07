import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Rocket, ShieldCheck, Sparkles, Star, Users2 } from "lucide-react";

const features = [
  {
    title: "Premium outdoor gear",
    description: "Rent bikes, tents, cameras, and camping essentials from trusted providers.",
    icon: Rocket,
  },
  {
    title: "Flexible booking",
    description: "Reserve equipment for hours, days, or weeks with transparent pricing.",
    icon: ShieldCheck,
  },
  {
    title: "Verified providers",
    description: "Every vendor is reviewed so you can rent with confidence.",
    icon: Users2,
  },
];

const testimonials = [
  {
    name: "Amina R.",
    role: "Photography Enthusiast",
    quote: "GearUp made my mountain shoot easy — fast booking, great equipment, and clear details.",
  },
  {
    name: "Jamal S.",
    role: "Adventure Traveler",
    quote: "The rental workflow is smooth and the support team helped me choose the right kit.",
  },
  {
    name: "Mia L.",
    role: "Event Organizer",
    quote: "Reliable gear and polished UI. This is the best rental marketplace I’ve used.",
  },
];

export function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/15 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(79,70,229,0.15),_transparent_35%)]" />
      <div className="absolute right-0 top-24 hidden h-72 w-72 rounded-full bg-accent/10 blur-3xl lg:block" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary shadow-sm">
              Explore the future of rental gear
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Rent premium adventure equipment with confidence.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              GearUp connects outdoor enthusiasts with verified providers for fast searches,
              powerful filters, and flexible booking across all kinds of rental gear.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/gear">
                <Button className="gap-2" size="lg">
                  Browse Gear
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center rounded-4xl border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition hover:bg-muted sm:px-6">
                Contact Support
              </Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-4xl border border-border bg-card p-5 shadow-sm">
                <p className="text-3xl font-semibold text-primary">4.9</p>
                <p className="mt-2 text-sm text-muted-foreground">Average customer rating</p>
              </div>
              <div className="rounded-4xl border border-border bg-card p-5 shadow-sm">
                <p className="text-3xl font-semibold text-primary">120+</p>
                <p className="mt-2 text-sm text-muted-foreground">Verified providers</p>
              </div>
              <div className="rounded-4xl border border-border bg-card p-5 shadow-sm">
                <p className="text-3xl font-semibold text-primary">30+</p>
                <p className="mt-2 text-sm text-muted-foreground">Equipment categories</p>
              </div>
            </div>
          </div>
          <div className="rounded-[2.5rem] border border-border bg-card p-8 shadow-xl shadow-primary/5">
            <div className="grid gap-6">
              {features.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-4 rounded-4xl border border-border/80 bg-background p-5">
                    <div className="grid h-14 w-14 place-items-center rounded-3xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LandingFeatures() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">What makes GearUp different</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">A complete rental experience for every adventure.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-4xl border border-border bg-card p-8 shadow-sm">
            <h3 className="text-xl font-semibold">Smart search</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Filter by category, location, availability, and price to quickly find the right gear.</p>
          </div>
          <div className="rounded-4xl border border-border bg-card p-8 shadow-sm">
            <h3 className="text-xl font-semibold">Clear pricing</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">See daily prices, stock availability, and featured provider ratings at a glance.</p>
          </div>
          <div className="rounded-4xl border border-border bg-card p-8 shadow-sm">
            <h3 className="text-xl font-semibold">Responsive support</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Need help? Contact our support team or message your provider directly from the app.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LandingHowItWorks() {
  return (
    <section id="how-it-works" className="rounded-[2rem] border border-border bg-secondary/10 p-8 shadow-sm sm:p-12">
      <div className="grid gap-10 lg:grid-cols-3">
        {[
          { step: "01", title: "Find your gear", description: "Browse curated equipment categories for every outdoor activity." },
          { step: "02", title: "Reserve instantly", description: "Choose dates, confirm availability, and book securely with one click." },
          { step: "03", title: "Pickup or delivery", description: "Pick up locally or request convenient delivery from your provider." },
        ].map((item) => (
          <div key={item.step} className="rounded-4xl bg-card p-6 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-primary/10 text-primary font-semibold">
              {item.step}
            </div>
            <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function LandingStats() {
  return (
    <section className="my-20 rounded-[2rem] bg-primary/5 p-10 shadow-sm">
      <div className="grid gap-6 md:grid-cols-4">
        {[
          { value: "10k+", label: "Happy rentals" },
          { value: "4.9/5", label: "Average rating" },
          { value: "35+", label: "Item types" },
          { value: "120+", label: "Trusted providers" },
        ].map((item) => (
          <div key={item.label} className="rounded-4xl border border-border bg-card p-6 text-center">
            <p className="text-3xl font-bold text-primary">{item.value}</p>
            <p className="mt-3 text-sm text-muted-foreground">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function LandingTestimonials() {
  return (
    <section id="testimonials" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Customer stories</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Real feedback from real renters.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.name} className="rounded-4xl border border-border bg-card p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-3xl bg-primary/10 text-primary font-semibold">{item.name[0]}</div>
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.role}</p>
                </div>
              </div>
              <p className="mt-6 text-sm leading-7 text-muted-foreground">“{item.quote}”</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LandingNewsletter() {
  return (
    <section className="rounded-[2rem] border border-border bg-card p-10 mb-20 shadow-sm">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Stay updated</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Get the latest rental offers and seasonal gear drops.</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">Join our newsletter for new provider launches, exclusive discounts, and top equipment recommendations.</p>
        </div>
        <form className="flex flex-col gap-4 sm:flex-row">
          <label className="sr-only" htmlFor="newsletter-email">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="Enter your email"
            className="min-w-0 flex-1 rounded-3xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <Button type="button" className="w-full sm:w-auto">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-background/80 py-12">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-primary text-primary-foreground">G</div>
            <div>
              <p className="text-lg font-semibold">GearUp</p>
              <p className="text-sm text-muted-foreground">Rent the best gear for every outdoor adventure.</p>
            </div>
          </div>
          <p className="max-w-xl text-sm leading-7 text-muted-foreground">
            Built for travellers, creators, and adventure teams who want a dependable rental marketplace.
          </p>
        </div>
        <div>
          <p className="font-semibold">Company</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
            <Link href="/about" className="transition hover:text-foreground">About us</Link>
            <Link href="/contact" className="transition hover:text-foreground">Contact</Link>
            <Link href="/gear" className="transition hover:text-foreground">Browse gear</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold">Support</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
            <a href="mailto:support@gearup.com" className="transition hover:text-foreground">support@gearup.com</a>
            <a href="tel:+1234567890" className="transition hover:text-foreground">+1 (234) 567-890</a>
            <p className="mt-2 text-sm">Mon - Fri, 9am - 6pm</p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-muted-foreground">© 2026 GearUp. All rights reserved.</p>
      </div>
    </footer>
  );
}
