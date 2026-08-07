import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="min-h-[calc(100vh-88px)] bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">About GearUp</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">A rental marketplace built for modern adventures.</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              GearUp helps renters find premium outdoor equipment from trusted providers across categories such as camping, photography, events, and travel.
              We focus on a clear marketplace experience with transparent pricing, flexible booking, and reliable provider reviews.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/gear" className="inline-flex items-center justify-center rounded-4xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90">
                Browse gear
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center rounded-4xl border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition hover:bg-muted">
                Contact support
              </Link>
            </div>
          </div>
          <div className="space-y-6 rounded-[2rem] border border-border bg-card p-8 shadow-sm">
            <div className="rounded-4xl bg-primary/5 p-6">
              <h2 className="text-xl font-semibold">Our mission</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Make renting gear as easy as buying it. We are creating a trusted marketplace for equipment rental with professional service, straightforward pricing, and strong design.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "Verified providers", value: "120+" },
                { label: "Locations served", value: "20+" },
                { label: "Categories", value: "30+" },
                { label: "Support rating", value: "4.9/5" },
              ].map((item) => (
                <div key={item.label} className="rounded-4xl border border-border bg-background p-5">
                  <p className="text-3xl font-bold text-primary">{item.value}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;