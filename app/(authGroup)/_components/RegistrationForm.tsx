"use client"

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerAction } from "../_action/AuthAction";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

const RegistrationForm = () => {
  const [state, action, pending] = useActionState(registerAction, false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!state) return;
    if (!state.success) {
      toast.error(state.message || "Registration failed");
    }
  }, [state]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!formData.name.trim()) nextErrors.name = "Name is required.";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Enter a valid email.";
    }
    if (formData.password.length < 6) nextErrors.password = "Password must be at least 6 characters.";
    if (!formData.address.trim()) nextErrors.address = "Address is required.";
    if (!formData.phone.trim()) nextErrors.phone = "Phone number is required.";
    return nextErrors;
  };

  return (
    <form
      action={action}
      onSubmit={(event) => {
        const nextErrors = validate();
        if (Object.keys(nextErrors).length > 0) {
          event.preventDefault();
          setErrors(nextErrors);
          toast.error("Please correct the highlighted fields.");
        }
      }}
      className="space-y-6"
    >
      <Card className="p-6 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-3">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name ? <p className="text-sm text-destructive">{errors.name}</p> : null}
          </div>
          <div className="space-y-3">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email ? <p className="text-sm text-destructive">{errors.email}</p> : null}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-3">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              aria-invalid={Boolean(errors.password)}
            />
            {errors.password ? <p className="text-sm text-destructive">{errors.password}</p> : null}
          </div>
          <div className="space-y-3">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              aria-invalid={Boolean(errors.phone)}
            />
            {errors.phone ? <p className="text-sm text-destructive">{errors.phone}</p> : null}
          </div>
        </div>
        <div className="space-y-3">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            aria-invalid={Boolean(errors.address)}
          />
          {errors.address ? <p className="text-sm text-destructive">{errors.address}</p> : null}
        </div>
        <div className="space-y-3">
          <Label htmlFor="profilePhoto">Profile photo</Label>
          <Input id="profilePhoto" name="profilePhoto" type="file" />
        </div>
        <Button type="submit" className="w-full">
          {pending ? "Registering..." : "Create account"}
        </Button>
      </Card>
    </form>
  );
};

export default RegistrationForm;
