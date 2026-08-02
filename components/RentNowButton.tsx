"use client";

import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export interface RentNowGearPayload {
  id: string;
  title: string;
  brand: string;
  pricePerDay: string | number;
  availableStock: number;
}

interface RentNowButtonProps {
  gearItem: RentNowGearPayload;
  quantity?: number; 
  className?: string;
  buttonText?: string;
}

export function RentNowButton({
  gearItem,
  quantity = 1, 
  className = "",
  buttonText = "Rent Now",
}: RentNowButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const price = Number(gearItem.pricePerDay);
  const isAvailable = gearItem.availableStock > 0;

  const handleRentNow = () => {
    if (!isAvailable) {
      toast.error("Stock Unavailable", {
        description: "This item is currently out of stock.",
      });
      return;
    }

    try {
      setIsLoading(true);

      addItem(
        {
          gearItemId: gearItem.id,
          title: gearItem.title,
          brand: gearItem.brand,
          pricePerDay: price,
          availableStock: gearItem.availableStock,
        },
        quantity
      );

      toast.success("Proceeding to Checkout", {
        description: `${gearItem.title} added (${quantity} unit${quantity > 1 ? "s" : ""}).`,
      });

      router.push("/checkout");
      setIsLoading(false);
    } catch (error) {
      toast.error("Error", {
        description: "Could not proceed to checkout. Please try again.",
      });
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleRentNow}
      disabled={!isAvailable || isLoading}
      className={`w-full h-11 text-base font-medium gap-2 cursor-pointer ${className}`}
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <ShoppingCart className="w-5 h-5 mr-2" />
      )}
      {isAvailable ? buttonText : "Out of Stock"}
    </Button>
  );
}