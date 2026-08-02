import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  CreditCard,
  Eye,
  CheckCircle2,
  Clock,
  XCircle,
  Calendar,
  User,
  ShoppingBag,
  DollarSign,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { IPayment, PaymentStatus } from "@/lib/types/payment-type";
import { getAllPayments } from "@/app/(dashboardGroup)/_action/payment";

export default async function PaymentsHistoryPage() {
  const result = await getAllPayments();
  const payments: IPayment[] = Array.isArray(result?.data) ? result.data : [];

  const getStatusBadge = (status: string) => {
    switch (status?.toUpperCase()) {
      case PaymentStatus.COMPLETED:
        return (
          <Badge variant="outline" className="border-emerald-500 text-emerald-600 bg-emerald-50/50 gap-1 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" /> Completed
          </Badge>
        );
      case PaymentStatus.PENDING:
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-600 bg-amber-50/50 gap-1 font-medium">
            <Clock className="w-3.5 h-3.5" /> Pending
          </Badge>
        );
      case PaymentStatus.FAILED:
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-600 bg-amber-50/50 gap-1 font-medium">
            <Clock className="w-3.5 h-3.5" /> Failed
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Payment Transactions</h1>
        <p className="text-sm text-muted-foreground">
          View all payment transactions, Stripe references, and associated rental orders.
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" /> Transaction Records
            <Badge variant="secondary" className="ml-2 font-normal">
              {payments.length} Total
            </Badge>
          </CardTitle>
          <CardDescription>
            History of completed and pending payment processing logs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground border rounded-md">
              {result?.message || "No payment records found."}
            </div>
          ) : (
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Stripe Transaction</TableHead>
                    <TableHead>Rental Order ID</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id} className="hover:bg-muted/40 transition-colors">
                      {/* Customer */}
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-muted-foreground" />
                            {payment.user?.name || "Unknown User"}
                          </span>
                          <span className="text-xs text-muted-foreground pl-5">
                            {payment.user?.email || payment.userId}
                          </span>
                        </div>
                      </TableCell>

                      {/* Amount */}
                      <TableCell>
                        <span className="font-bold text-sm flex items-center text-foreground">
                          <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                          {Number(payment.amount).toLocaleString()}
                        </span>
                      </TableCell>

                      {/* Status */}
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>

                      {/* Stripe Transaction ID */}
                      <TableCell>
                        <code className="bg-muted px-2 py-0.5 rounded text-[11px] font-mono text-muted-foreground max-w-[150px] truncate block">
                          {payment.stripeTransactionId}
                        </code>
                      </TableCell>

                      {/* Rental Order Link */}
                      <TableCell>
                        <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                          <ShoppingBag className="w-3 h-3 shrink-0" />
                          {payment.rentalOrderId.slice(0, 8)}...
                        </span>
                      </TableCell>

                      {/* Created Date */}
                      <TableCell>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {format(new Date(payment.createdAt), "MMM dd, yyyy")}
                        </span>
                      </TableCell>

                      {/* Action */}
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/dashboard/customer/payments/${payment.id}`}>
                            <Eye className="w-4 h-4 mr-1" /> Details
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}