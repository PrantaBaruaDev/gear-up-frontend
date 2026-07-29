"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { format } from "date-fns";
import { useCheckoutOrder } from "@/hooks/useCheckoutOrder"; // Import the custom hook

export default function CheckoutPage() {
  const [isMounted, setIsMounted] = useState(false);

  // Hook handles submit logic & state
  const { handlePlaceOrder, loading, isOrderDisabled } = useCheckoutOrder();

  const {
    rentalItems,
    startDate,
    endDate,
    setRentalDates,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    clearCart,
    getTotalDays,
    calculateTotalPrice,
  } = useCartStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const totalDays = getTotalDays();
  const totalPrice = calculateTotalPrice();

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Review Rental Order</h1>

      {rentalItems.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent className="flex flex-col items-center gap-4">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            <p className="text-xl font-medium">Your rental cart is empty.</p>
            <Button onClick={() => (window.location.href = "/gear")}>Browse Gear Catalog</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Dates & Items */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Date Picker Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">1. Rental Duration</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Start Date */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Start Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(new Date(startDate), "PPP") : <span>Pick start date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate ? new Date(startDate) : undefined}
                        onSelect={(date) =>
                          setRentalDates(date ? date.toISOString() : null, endDate)
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* End Date */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">End Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(new Date(endDate), "PPP") : <span>Pick end date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate ? new Date(endDate) : undefined}
                        onSelect={(date) =>
                          setRentalDates(startDate, date ? date.toISOString() : null)
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>

              </CardContent>
            </Card>

            {/* Gear Items Table */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">2. Selected Gear Items ({rentalItems.length})</CardTitle>
                <Button variant="ghost" size="sm" onClick={clearCart} className="text-destructive">
                  Clear All
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Gear Item</TableHead>
                      <TableHead>Rate/Day</TableHead>
                      <TableHead className="text-center">Quantity</TableHead>
                      <TableHead className="text-right">Total Price</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rentalItems.map((item) => {
                      const itemTotal = item.pricePerDay * item.quantity * totalDays;
                      return (
                        <TableRow key={item.gearItemId}>
                          <TableCell>
                            <div className="font-medium">{item.title}</div>
                            <div className="text-xs text-muted-foreground">{item.brand}</div>
                          </TableCell>
                          <TableCell>${item.pricePerDay}</TableCell>
                          
                          <TableCell>
                            <div className="flex items-center justify-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => decrementQuantity(item.gearItemId)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-6 text-center font-semibold text-sm">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => incrementQuantity(item.gearItemId)}
                                disabled={item.quantity >= item.availableStock}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>

                          <TableCell className="text-right font-semibold">
                            ${itemTotal}
                          </TableCell>

                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:bg-destructive/10"
                              onClick={() => removeItem(item.gearItemId)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

          </div>

          {/* Right Column: Order Summary */}
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rental Duration</span>
                  <span className="font-medium">{totalDays} {totalDays === 1 ? 'day' : 'days'}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Gear Items</span>
                  <span className="font-medium">
                    {rentalItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>

                <Separator />

                <div className="flex justify-between text-base font-bold">
                  <span>Grand Total</span>
                  <span className="text-lg text-primary">${totalPrice}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handlePlaceOrder}
                  disabled={isOrderDisabled}
                  className="w-full text-base py-6"
                >
                  {loading ? "Processing Order..." : "Confirm & Place Rental Order"}
                </Button>
              </CardFooter>
            </Card>
          </div>

        </div>
      )}
    </div>
  );
}