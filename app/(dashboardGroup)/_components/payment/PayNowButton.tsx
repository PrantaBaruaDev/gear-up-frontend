"use client";

import React, { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPaymentCheckoutSession } from "@/app/(dashboardGroup)/_action/payment";

interface PayNowButtonProps {
  orderId: string;
}

export function PayNowButton({ orderId }: PayNowButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayNow = async () => {
    try {
      setLoading(true);
      const response = await createPaymentCheckoutSession(orderId);

      if (response.success && response.data?.url) {
        // Redirect to Stripe checkout page
        window.location.href = response.data.url;
      } else if (response.success && response.data?.checkoutUrl) {
        // Handle alternative response key if applicable
        window.location.href = response.data.checkoutUrl;
      } else {
        alert(response.message || "Failed to launch payment checkout.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong with the payment process.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayNow}
      disabled={loading}
      className="w-full mt-3 gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" /> Redirecting to Stripe...
        </>
      ) : (
        <>
          <CreditCard className="w-4 h-4" /> Pay Now
        </>
      )}
    </Button>
  );
}