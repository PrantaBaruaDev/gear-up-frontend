
import GearItemList from "@/components/shared/gear/GearItemsList";
import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";
import {
  LandingFooter,
  LandingFeatures,
  LandingHero,
  LandingHowItWorks,
  LandingNewsletter,
  LandingStats,
  LandingTestimonials,
} from "@/components/shared/landing/LandingSections";
import Link from "next/link";

export default async function Home() {
  const user = await getMe();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar user={user} />
      <LandingHero />
      <main className="space-y-24">
        <LandingFeatures />
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Featured gear</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Top rental items ready to book.</h2>
              </div>
              <Link href="/gear" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
                View full catalog
              </Link>
            </div>
            <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm">
              <GearItemList />
            </div>
          </div>
        </section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <LandingHowItWorks />
          <LandingStats />
          <LandingTestimonials />
          <LandingNewsletter />
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
