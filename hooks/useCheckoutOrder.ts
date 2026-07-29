// hooks/useCheckoutOrder.ts
"use client";

import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { createRentalOrder } from "@/app/(public-group)/_action/CheckoutAction";

export function useCheckoutOrder() {
  const [loading, setLoading] = useState(false);

  const { rentalItems, startDate, endDate, clearCart } = useCartStore();

  const handlePlaceOrder = async () => {
    if (!startDate || !endDate) {
      alert("Please select both Start and End rental dates.");
      return;
    }

    if (rentalItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setLoading(true);

    const payload = {
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      rentalItems: rentalItems.map((item) => ({
        gearItemId: item.gearItemId,
        quantity: item.quantity,
      })),
    };

    try {
      const result = await createRentalOrder(payload);

      if (result.success) {
        clearCart();
        alert("Rental order created successfully!");
        window.location.href = "/dashboard/customer/orders";
      } else {
        alert(result.message || "Failed to place order.");
      }
    } catch {
      alert("An error occurred while creating the rental order.");
    } finally {
      setLoading(false);
    }
  };

  return {
    handlePlaceOrder,
    loading,
    isOrderDisabled: loading || !startDate || !endDate,
  };
}