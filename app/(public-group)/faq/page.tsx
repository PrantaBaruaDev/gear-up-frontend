import Link from "next/link";

const faqs = [
  {
    question: "How do I rent gear on GearUp?",
    answer: "Browse items in the Gear section, choose your dates and provider, then confirm checkout with a few clicks.",
  },
  {
    question: "Can I extend my rental period?",
    answer: "Yes. Contact the provider through your dashboard or the order details page to request an extension.",
  },
  {
    question: "How can I become a provider?",
    answer: "Register, then apply for provider access through the dashboard. Our team will verify your details before approving your account.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "GearUp supports secure card checkout. Additional payment methods may appear based on provider preferences.",
  },
];

const FAQPage = () => {
  return (
    <div className="min-h-[calc(100vh-88px)] bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 rounded-[2rem] border border-border bg-card p-10 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">FAQ</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Get answers to common rental questions.</h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
            Learn how GearUp works, how providers join, and how to manage your bookings from the dashboard.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {faqs.map((item) => (
            <div key={item.question} className="rounded-[2rem] border border-border bg-card p-8 shadow-sm">
              <h2 className="text-xl font-semibold">{item.question}</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-[2rem] border border-border bg-secondary/10 p-8 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Still have questions?</p>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center rounded-4xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90">
              Contact support
            </Link>
            <Link href="/gear" className="inline-flex items-center justify-center rounded-4xl border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition hover:bg-muted">
              Explore gear
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
