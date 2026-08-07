"use client"

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "../_action/AuthAction";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

const LoginForm = () => {
  const [state, action, pending] = useActionState(loginAction, false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  useEffect(() => {
    if (!state) return;
    if (!state.success) {
      toast.error(state.message || "Login failed");
    }
  }, [state]);

  const validate = () => {
    const nextErrors: { email?: string; password?: string } = {};
    if (!formData.email.trim()) nextErrors.email = "Email is required.";
    if (!formData.password.trim()) nextErrors.password = "Password is required.";
    return nextErrors;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: "" });
  };

  return (
    <form
      action={action}
      onSubmit={(event) => {
        const nextErrors = validate();
        if (Object.keys(nextErrors).length > 0) {
          event.preventDefault();
          setErrors(nextErrors);
          toast.error("Please fill in the required fields.");
        }
      }}
      className="space-y-6"
    >
      <Card className="p-6 space-y-5">
        <div className="space-y-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email ? <p className="text-sm text-destructive">{errors.email}</p> : null}
        </div>
        <div className="space-y-3">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            aria-invalid={Boolean(errors.password)}
          />
          {errors.password ? <p className="text-sm text-destructive">{errors.password}</p> : null}
        </div>
        <Button type="submit" className="w-full">
          {pending ? "Signing in..." : "Login"}
        </Button>
      </Card>
    </form>
  );
};

export default LoginForm;