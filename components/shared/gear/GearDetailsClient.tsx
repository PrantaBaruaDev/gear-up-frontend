"use client";

import React, { useState } from "react";
import { IGearItemQuery } from "@/lib/types/gear-items-type";
import { useCartStore } from "@/store/useCartStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  PackageCheck, 
  PackageX, 
  ShieldCheck, 
  Tag, 
  Minus, 
  Plus, 
  ShoppingCart,
  Building2,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface GearDetailsClientProps {
  gear: IGearItemQuery;
}

export default function GearDetailsClient({ gear }: GearDetailsClientProps) {
  const router = useRouter();
  
  // Local UI State
  const [days, setDays] = useState<number>(1);
  const [itemQuantity, setItemQuantity] = useState<number>(1);

  // Safely fallback between 'id'
  const itemId = gear.id || "";
  const categoryName = gear.category?.name || "General";
  const providerName = gear.provider?.name || "Verified Provider";
  const providerEmail = gear.provider?.email || "";

  // Zustand Store Actions
  const addItem = useCartStore((state) => state.addItem);
  const setRentalDates = useCartStore((state) => state.setRentalDates);

  const pricePerDay = Number(gear.pricePerDay);
  const totalPrice = (pricePerDay * itemQuantity * days).toFixed(2);
  const isAvailable = gear.availableStock > 0;

  const handleIncrementDays = () => setDays((prev) => prev + 1);
  const handleDecrementDays = () => setDays((prev) => (prev > 1 ? prev - 1 : 1));

  const handleIncrementQuantity = () => {
    setItemQuantity((prev) => Math.min(prev + 1, gear.availableStock));
  };
  const handleDecrementQuantity = () => {
    setItemQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // Handler for Add To Cart
  const handleAddToCart = () => {
    if (!isAvailable) {
      toast.error("This item is currently out of stock.");
      return;
    }

    // Calculate dates
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + days);

    // Set rental dates in Zustand Store
    setRentalDates(today.toISOString(), endDate.toISOString());

    // Add item to Zustand Store
    addItem(
      {
        gearItemId: itemId,
        title: gear.title,
        brand: gear.brand,
        pricePerDay: Number(gear.pricePerDay),
        availableStock: gear.availableStock,
      },
      itemQuantity
    );

    // Success notification
    toast.success(`${gear.title} added to cart!`, {
      description: `Reserved for ${days} ${days === 1 ? "day" : "days"} (${itemQuantity} unit${itemQuantity > 1 ? "s" : ""}).`,
      action: {
        label: "View Cart",
        onClick: () => router.push("/cart"),
      },
    });
  };

  const providerInitials = providerName
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .join("")
    .toUpperCase() || "P";

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div>
        <Link 
          href="/gear" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Gear Catalog
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <Badge variant="secondary" className="px-3 py-1 text-xs uppercase tracking-wide">
                  <Tag className="w-3 h-3 mr-1 inline" />
                  {categoryName}
                </Badge>
                {isAvailable ? (
                  <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30">
                    <PackageCheck className="w-3.5 h-3.5 mr-1" />
                    In Stock ({gear.availableStock} available)
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    <PackageX className="w-3.5 h-3.5 mr-1" />
                    Out of Stock
                  </Badge>
                )}
              </div>

              <div>
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  {gear.brand}
                </p>
                <CardTitle className="text-2xl sm:text-3xl font-bold mt-1">
                  {gear.title}
                </CardTitle>
              </div>
            </CardHeader>

            <Separator />

            <CardContent className="pt-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {gear.description}
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-4">Gear Details</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <span className="text-xs text-muted-foreground block">Brand</span>
                    <span className="font-medium text-sm">{gear.brand}</span>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <span className="text-xs text-muted-foreground block">Total Stock</span>
                    <span className="font-medium text-sm">{gear.stock} units</span>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <span className="text-xs text-muted-foreground block">Available</span>
                    <span className="font-medium text-sm">{gear.availableStock} units</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Provider Details */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Building2 className="w-5 h-5 text-muted-foreground" />
                Gear Provider
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {providerInitials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold text-base">{providerName}</h4>
                {providerEmail && <p className="text-sm text-muted-foreground">{providerEmail}</p>}
                <div className="flex items-center gap-1 mt-1 text-xs text-emerald-600 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Provider
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Dynamic Pricing & Cart Widget */}
        <div className="lg:col-span-1">
          <Card className="shadow-md sticky top-6 border-2 border-primary/10">
            <CardHeader>
              <CardTitle className="text-xl">Rental Pricing</CardTitle>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold">${pricePerDay}</span>
                <span className="text-muted-foreground text-sm">/ day</span>
              </div>
            </CardHeader>

            <Separator />

            <CardContent className="pt-6 space-y-5">
              {/* Duration selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center justify-between">
                  <span>Rental Duration</span>
                  <span className="text-xs text-muted-foreground">Days</span>
                </label>
                <div className="flex items-center justify-between border rounded-md p-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDecrementDays}
                    disabled={days <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="font-semibold text-sm">{days} {days === 1 ? "Day" : "Days"}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleIncrementDays}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Quantity selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center justify-between">
                  <span>Quantity</span>
                  <span className="text-xs text-muted-foreground">
                    Max: {gear.availableStock}
                  </span>
                </label>
                <div className="flex items-center justify-between border rounded-md p-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDecrementQuantity}
                    disabled={itemQuantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="font-semibold text-sm">{itemQuantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleIncrementQuantity}
                    disabled={itemQuantity >= gear.availableStock}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="bg-muted/40 p-4 rounded-lg space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground text-xs">
                  <span>
                    ${pricePerDay} × {itemQuantity} item{itemQuantity > 1 ? "s" : ""} × {days} day{days > 1 ? "s" : ""}
                  </span>
                  <span>${totalPrice}</span>
                </div>
                <div className="flex justify-between text-muted-foreground text-xs">
                  <span>Service Fee</span>
                  <span className="text-emerald-600 font-medium">Free</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-base pt-1">
                  <span>Total Price</span>
                  <span className="text-primary">${totalPrice}</span>
                </div>
              </div>

              {/* Rent Action */}
              <div className="space-y-3">
                <Button
                  onClick={handleAddToCart}
                  className="w-full h-11 text-base font-medium cursor-pointer"
                  disabled={!isAvailable}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {isAvailable ? "Rent This Gear" : "Currently Unavailable"}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Adds gear to your rental cart with instant date reservation.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}