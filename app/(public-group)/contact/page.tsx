"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!formData.name.trim()) nextErrors.name = "Please enter your name.";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "A valid email address is required.";
    }
    if (!formData.message.trim()) nextErrors.message = "Please share your message.";

    return nextErrors;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setPending(true);
    window.setTimeout(() => {
      setPending(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
      toast.success("Your message has been prepared. We’ll follow up soon.");
    }, 800);
  };

  return (
    <div className="min-h-[calc(100vh-88px)] bg-background py-16 text-foreground">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-border bg-card p-10 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Contact GearUp</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">How can we help you today?</h1>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground">
              Send us a message and our support team will guide you through booking, provider options, or account setup.
            </p>
            <div className="mt-10 space-y-6 text-sm text-muted-foreground">
              <div>
                <p className="font-semibold text-foreground">Customer support</p>
                <p>support@gearup.com</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">Phone</p>
                <p>+1 (234) 567-890</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">Hours</p>
                <p>Mon - Fri, 9AM - 6PM</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 rounded-[2rem] border border-border bg-card p-8 shadow-sm">
            <div>
              <Label className="mb-4" htmlFor="name">Full Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" aria-invalid={Boolean(errors.name)} />
              {errors.name ? <p className="mt-2 text-sm text-destructive">{errors.name}</p> : null}
            </div>
            <div>
              <Label className="mb-4" htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" aria-invalid={Boolean(errors.email)} />
              {errors.email ? <p className="mt-2 text-sm text-destructive">{errors.email}</p> : null}
            </div>
            <div>
              <Label className="mb-4" htmlFor="message">Message</Label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                placeholder="Tell us more about your request"
                className="min-h-[170px] w-full resize-none rounded-3xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                aria-invalid={Boolean(errors.message)}
              />
              {errors.message ? <p className="mt-2 text-sm text-destructive">{errors.message}</p> : null}
            </div>
            <Button type="submit" disabled={pending} className="w-full">
              {pending ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
