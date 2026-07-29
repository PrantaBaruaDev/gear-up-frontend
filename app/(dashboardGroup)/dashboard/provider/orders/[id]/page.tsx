import Link from "next/link";
import { format } from "date-fns";
import {
  ArrowLeft,
  Calendar,
  Clock,
  CreditCard,
  User,
  Package,
  Store,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

import { getSingleRentalOrders } from "@/app/(dashboardGroup)/_action/RentalOrdersAction";
import { RentalOrder } from "@/lib/types/gear-order-type";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UpdateOrderStatusCard } from "@/app/(dashboardGroup)/_components/rental-orders/UpdateOrderStatusCard";

interface OrderDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const { id } = await params;
  const result = await getSingleRentalOrders(id);

  const order: RentalOrder | null =
    result?.data?.data || result?.data || null;

  if (!result?.success || !order || !order.id) {
    return (
      <div className="p-6 max-w-6xl mx-auto space-y-4">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="gap-2 -ml-2 text-muted-foreground hover:text-foreground"
        >
          <Link href="/dashboard/orders">
            <ArrowLeft className="w-4 h-4" /> Back to Orders
          </Link>
        </Button>
        <div className="p-12 text-center border rounded-lg bg-card space-y-2">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
          <h2 className="text-lg font-semibold">Order Not Found</h2>
          <p className="text-sm text-muted-foreground">
            {result?.message || "Could not retrieve details for this rental order."}
          </p>
        </div>
      </div>
    );
  }

  const uniqueProviders = Array.from(
    new Map(
      (order.rentalItems || [])
        .filter((item) => item?.gearItem?.provider)
        .map((item) => [item.gearItem.provider.id, item.gearItem.provider])
    ).values()
  );

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header & Back Button */}
      <div className="flex flex-col gap-2">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="w-fit gap-2 -ml-2 text-muted-foreground hover:text-foreground"
        >
          <Link href="/dashboard/provider/orders">
            <ArrowLeft className="w-4 h-4" /> Back to Orders
          </Link>
        </Button>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">Order Details</h1>
              <Badge variant="outline" className="font-mono text-xs">
                <b>ORDER ID:</b> #{order.id}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Created on{" "}
              {order.createdAt
                ? format(new Date(order.createdAt), "MMMM dd, yyyy 'at' hh:mm a")
                : "N/A"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="capitalize px-3 py-1">
              {order.status ? order.status.toLowerCase() : "unknown"}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Rental Duration Banner */}
          <Card className="bg-muted/30 border-dashed">
            <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-background rounded-lg border shadow-xs">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold">
                    Rental Duration
                  </p>
                  <p className="text-sm font-medium">
                    {order.startDate
                      ? format(new Date(order.startDate), "MMM dd, yyyy")
                      : "N/A"}{" "}
                    –{" "}
                    {order.endDate
                      ? format(new Date(order.endDate), "MMM dd, yyyy")
                      : "N/A"}
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="px-3 py-1 font-semibold">
                {order.totalRentDays} Total Days
              </Badge>
            </CardContent>
          </Card>

          {/* Reserved Items Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Package className="w-5 h-5 text-muted-foreground" />
                Rented Items ({order.rentalItems?.length || 0})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Gear Item</TableHead>
                      <TableHead className="text-center">Rate / Day</TableHead>
                      <TableHead className="text-center">Qty</TableHead>
                      <TableHead className="text-right">Subtotal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.rentalItems?.map((item) => {
                      const dailyRate = Number(item.gearItem?.pricePerDay || 0);
                      const itemSubtotal =
                        dailyRate * item.quantity * (order.totalRentDays || 1);

                      return (
                        <TableRow key={item.id}>
                          <TableCell className="max-w-[280px]">
                            <div className="font-medium text-sm">
                              {item.gearItem?.title || "Gear Item"}
                            </div>
                            {item.gearItem?.description && (
                              <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                                {item.gearItem.description}
                              </p>
                            )}
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                              {item.gearItem?.brand && (
                                <Badge variant="outline" className="text-[10px]">
                                  Brand: {item.gearItem.brand}
                                </Badge>
                              )}
                              {item.gearItem?.provider?.name && (
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Store className="w-3 h-3" /> Provider:{" "}
                                  {item.gearItem.provider.name}
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-center text-sm">
                            ${item.gearItem?.pricePerDay || 0}
                          </TableCell>
                          <TableCell className="text-center text-sm font-semibold">
                            {item.quantity}
                          </TableCell>
                          <TableCell className="text-right text-sm font-semibold">
                            ${itemSubtotal.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* Cost Summary */}
              <div className="mt-4 space-y-2 text-sm max-w-xs ml-auto">
                <div className="flex justify-between text-muted-foreground">
                  <span>Rental Period:</span>
                  <span>{order.totalRentDays} days</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-base pt-1">
                  <span>Total Amount:</span>
                  <span>${Number(order.totalPrice).toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-muted-foreground" /> Payment
                Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              {order.payment ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-lg bg-muted/40 p-4 border">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Payment Status
                      </p>
                      <Badge className="bg-emerald-500 hover:bg-emerald-600 mt-1">
                        {order.payment.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Paid Amount</p>
                      <p className="text-sm font-semibold mt-1">
                        ${Number(order.payment.amount).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Payment Date</p>
                      <p className="text-sm font-medium mt-1">
                        {order.payment.paidAt
                          ? format(
                              new Date(order.payment.paidAt),
                              "MMM dd, yyyy - hh:mm a"
                            )
                          : "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Stripe Customer ID
                      </p>
                      <p className="text-xs font-mono mt-1 text-muted-foreground truncate">
                        {order.payment.stripeCustomerId || "N/A"}
                      </p>
                    </div>
                  </div>
                  {order.payment.stripeTransactionId && (
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Stripe Transaction ID
                      </p>
                      <p className="text-xs font-mono bg-muted p-2 rounded mt-1 overflow-x-auto">
                        {order.payment.stripeTransactionId}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center border rounded-lg border-dashed space-y-3">
                  <AlertCircle className="w-8 h-8 text-amber-500" />
                  <div>
                    <p className="font-semibold text-sm">Payment Pending</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      No payment transaction has been recorded for this order yet.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Information */}
        <div className="space-y-6">
          {/* Update Order Status Card */}
          <UpdateOrderStatusCard
            orderId={order.id}
            currentStatus={order.status}
          />

          {/* Customer Card */}
          {order.customer && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" /> Customer
                  Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {order.customer.name
                        ? order.customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                        : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">{order.customer.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.customer.email}
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="text-xs space-y-1">
                  <span className="text-muted-foreground">
                    Customer Identifier:
                  </span>
                  <p className="font-mono text-[11px] truncate">
                    {order.customer.id}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Unique Gear Providers Summary */}
          {uniqueProviders.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-muted-foreground" />{" "}
                  Fulfillment Providers
                </CardTitle>
                <CardDescription className="text-xs">
                  Equipment suppliers responsible for items in this rental order.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {uniqueProviders.map((provider) => (
                  <div
                    key={provider.id}
                    className="p-3 border rounded-lg bg-muted/20 space-y-1 text-xs"
                  >
                    <p className="font-semibold">{provider.name}</p>
                    <p className="text-muted-foreground">{provider.email}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* System Timeline Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" /> Metadata &
                Auditing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created At:</span>
                <span className="font-medium">
                  {order.createdAt
                    ? format(new Date(order.createdAt), "yyyy-MM-dd HH:mm")
                    : "N/A"}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated:</span>
                <span className="font-medium">
                  {order.updatedAt
                    ? format(new Date(order.updatedAt), "yyyy-MM-dd HH:mm")
                    : "N/A"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}