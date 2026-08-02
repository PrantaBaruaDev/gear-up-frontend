"use client";

import React, { useState } from "react";
import { IGearItemList } from "@/lib/types/gear-items-type";
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
  Building2,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { RentNowButton } from "@/components/RentNowButton"; 

interface GearDetailsClientProps {
  gear: IGearItemList;
}

export default function GearDetailsClient({ gear }: GearDetailsClientProps) {
  const [itemQuantity, setItemQuantity] = useState<number>(1);

  const itemId = gear.id || "";
  const categoryName = gear.category?.name || "General";
  const providerName = gear.provider?.name || "Verified Provider";
  const providerEmail = gear.provider?.email || "";

  const pricePerDay = Number(gear.pricePerDay);
  const totalPricePerDay = (pricePerDay * itemQuantity).toFixed(2);
  const isAvailable = gear.availableStock > 0;

  const handleIncrementQuantity = () => {
    setItemQuantity((prev) => Math.min(prev + 1, gear.availableStock));
  };

  const handleDecrementQuantity = () => {
    setItemQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const providerInitials =
    providerName
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
        {/* Product details */}
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

          {/* Provider Card */}
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

        {/* Action Sidebar */}
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
                    ${pricePerDay} × {itemQuantity} item{itemQuantity > 1 ? "s" : ""}
                  </span>
                  <span>${totalPricePerDay} / day</span>
                </div>
                <div className="flex justify-between text-muted-foreground text-xs">
                  <span>Service Fee</span>
                  <span className="text-emerald-600 font-medium">Free</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-base pt-1">
                  <span>Daily Rate Total</span>
                  <span className="text-primary">${totalPricePerDay}</span>
                </div>
              </div>

              {/* Rent Now Action Button */}
              <div className="space-y-3">
                <RentNowButton
                  gearItem={{
                    id: itemId,
                    title: gear.title,
                    brand: gear.brand,
                    pricePerDay: pricePerDay,
                    availableStock: gear.availableStock,
                  }}
                  quantity={itemQuantity}
                />
                <p className="text-xs text-center text-muted-foreground">
                  Select rental start and end dates during checkout.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}