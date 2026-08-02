import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  ArrowLeft,
  CreditCard,
  CheckCircle2,
  Clock,
  XCircle,
  User,
  Mail,
  Calendar,
  DollarSign,
  Receipt,
  ShoppingBag,
  ShieldCheck,
  Hash,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { IPayment } from "@/lib/types/payment-type";
import { getPaymentById } from "@/app/(dashboardGroup)/_action/payment";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PaymentDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const result = await getPaymentById(id);
  const payment: IPayment | null = result?.data || null;

  const getStatusBadge = (status: string) => {
    switch (status?.toUpperCase()) {
      case "COMPLETED":
      case "PAID":
        return (
          <Badge variant="outline" className="border-emerald-500 text-emerald-600 bg-emerald-50/50 gap-1 px-3 py-1 text-sm font-medium">
            <CheckCircle2 className="w-4 h-4" /> Completed
          </Badge>
        );
      case "PENDING":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-600 bg-amber-50/50 gap-1 px-3 py-1 text-sm font-medium">
            <Clock className="w-4 h-4" /> Pending Payment
          </Badge>
        );
      case "FAILED":
      case "CANCELLED":
        return (
          <Badge variant="outline" className="border-rose-500 text-rose-600 bg-rose-50/50 gap-1 px-3 py-1 text-sm font-medium">
            <XCircle className="w-4 h-4" /> {status}
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (!result?.success || !payment) {
    return (
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <Button variant="ghost" size="sm" asChild className="gap-2">
          <Link href="/dashboard/admin/payments">
            <ArrowLeft className="w-4 h-4" /> Back to Payments
          </Link>
        </Button>
        <Card className="p-12 text-center text-muted-foreground">
          {result?.message || "Payment transaction details not found."}
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Top Back Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" asChild className="gap-2">
          <Link href="/dashboard/admin/payments">
            <ArrowLeft className="w-4 h-4" /> Back to Payments History
          </Link>
        </Button>
      </div>

      {/* Hero Overview Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Transaction Amount
              </span>
              <div className="flex items-center gap-1 text-3xl font-bold text-foreground">
                <DollarSign className="w-7 h-7 text-emerald-600 shrink-0" />
                {Number(payment.amount).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 pt-1">
                <Calendar className="w-3.5 h-3.5" /> Created on{" "}
                {format(new Date(payment.createdAt), "PPP 'at' p")}
              </p>
            </div>
            <div>{getStatusBadge(payment.status)}</div>
          </div>
        </CardContent>
      </Card>

      {/* Detail Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <User className="w-4 h-4 text-primary" /> Payer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between py-1 border-b">
              <span className="text-muted-foreground">Full Name</span>
              <span className="font-medium">{payment.user?.name || "N/A"}</span>
            </div>
            <div className="flex justify-between py-1 border-b">
              <span className="text-muted-foreground">Email Address</span>
              <span className="font-medium flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                {payment.user?.email || "N/A"}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b">
              <span className="text-muted-foreground">User Role</span>
              <Badge variant="outline" className="capitalize">
                {payment.user?.role?.toLowerCase() || "Customer"}
              </Badge>
            </div>
            <div className="pt-2">
              <span className="text-xs text-muted-foreground block mb-1">User ID</span>
              <code className="bg-muted px-2 py-1 rounded text-[11px] font-mono block break-all border">
                {payment.userId}
              </code>
            </div>
          </CardContent>
        </Card>

        {/* Rental Order Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-primary" /> Associated Rental Order
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {payment.rentalOrder ? (
              <>
                <div className="flex justify-between py-1 border-b">
                  <span className="text-muted-foreground">Order Status</span>
                  <Badge variant="secondary">{payment.rentalOrder.status}</Badge>
                </div>
                <div className="flex justify-between py-1 border-b">
                  <span className="text-muted-foreground">Start Date</span>
                  <span className="font-medium">
                    {format(new Date(payment.rentalOrder.startDate), "MMM dd, yyyy")}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b">
                  <span className="text-muted-foreground">End Date</span>
                  <span className="font-medium">
                    {format(new Date(payment.rentalOrder.endDate), "MMM dd, yyyy")}
                  </span>
                </div>
                <div className="pt-2">
                  <span className="text-xs text-muted-foreground block mb-1">Order ID</span>
                  <code className="bg-muted px-2 py-1 rounded text-[11px] font-mono block break-all border">
                    {payment.rentalOrderId}
                  </code>
                </div>
              </>
            ) : (
              <div className="text-xs text-muted-foreground italic py-4">
                No direct rental order details mapped.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Stripe Gateway Audit Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Receipt className="w-4 h-4 text-primary" /> Payment Gateway & Audit Details
          </CardTitle>
          <CardDescription>Stripe transaction tracking identifiers.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 border rounded-lg bg-muted/20 space-y-1">
              <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                <Hash className="w-3.5 h-3.5" /> Stripe Customer ID
              </span>
              <code className="text-xs font-mono font-semibold block break-all">
                {payment.stripeCustomerId}
              </code>
            </div>

            <div className="p-3 border rounded-lg bg-muted/20 space-y-1">
              <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" /> Stripe Transaction ID
              </span>
              <code className="text-xs font-mono font-semibold block break-all text-primary">
                {payment.stripeTransactionId}
              </code>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-muted-foreground block">Paid Date</span>
              <span className="font-semibold text-foreground">
                {payment.paidAt
                  ? format(new Date(payment.paidAt), "PPP p")
                  : "Not completed"}
              </span>
            </div>

            <div>
              <span className="text-muted-foreground block">Record Created</span>
              <span className="font-semibold text-foreground">
                {format(new Date(payment.createdAt), "PPP p")}
              </span>
            </div>

            <div>
              <span className="text-muted-foreground block">Last Updated</span>
              <span className="font-semibold text-foreground">
                {format(new Date(payment.updatedAt), "PPP p")}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}