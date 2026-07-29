"use client";

import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Plus, Minus } from "lucide-react";

interface AddToCartButtonProps {
  gearItem: {
    id: string;
    title: string;
    brand: string;
    pricePerDay: string | number;
    availableStock: number;
  };
}

export function AddToCartButton({ gearItem }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(
      {
        gearItemId: gearItem.id,
        title: gearItem.title,
        brand: gearItem.brand,
        pricePerDay: Number(gearItem.pricePerDay),
        availableStock: gearItem.availableStock,
      },
      quantity
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Quantity:</span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
          disabled={quantity <= 1}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => setQuantity((prev) => Math.min(gearItem.availableStock, prev + 1))}
          disabled={quantity >= gearItem.availableStock}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      <Button onClick={handleAddToCart} className="w-full gap-2">
        <ShoppingBag className="h-4 w-4" />
        Add to Rental Cart
      </Button>
    </div>
  );
}