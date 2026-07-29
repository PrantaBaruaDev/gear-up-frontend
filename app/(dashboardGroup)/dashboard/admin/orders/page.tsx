import Link from "next/link";
import { format } from "date-fns";
import {
  Clock,
  CheckCircle2,
  RotateCcw,
  Eye,
  MoreHorizontal,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getRentalOrders } from "@/app/(dashboardGroup)/_action/RentalOrdersAction";
import { RentalOrder } from "@/lib/types/gear-order-type";

export default async function OrderListPage() {
  const result = await getRentalOrders();

  const orders: RentalOrder[] = Array.isArray(result?.data)
    ? result.data
    : Array.isArray(result?.data?.data)
    ? result.data.data
    : [];

  const getStatusBadge = (status: RentalOrder["status"]) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge
            variant="outline"
            className="border-amber-500 text-amber-600 bg-amber-50/50 gap-1"
          >
            <Clock className="w-3 h-3" /> Pending
          </Badge>
        );
      case "CONFIRMED":
        return (
          <Badge
            variant="outline"
            className="border-blue-500 text-blue-600 bg-blue-50/50 gap-1"
          >
            <CheckCircle2 className="w-3 h-3" /> Confirmed
          </Badge>
        );
      case "RETURNED":
        return (
          <Badge
            variant="outline"
            className="border-emerald-500 text-emerald-600 bg-emerald-50/50 gap-1"
          >
            <RotateCcw className="w-3 h-3" /> Returned
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (!result?.success || orders.length === 0) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <p className="py-12 text-center text-muted-foreground border rounded-lg bg-card">
          {result?.message || "No rental orders found."}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Rental Orders</h1>
        <p className="text-sm text-muted-foreground">
          Manage and inspect gear rental requests and bookings.
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Order History</CardTitle>
          <CardDescription>
            A consolidated view of all gear rentals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[120px]">Order ID</TableHead>
                  <TableHead>Rental Window</TableHead>
                  <TableHead className="text-center">Duration</TableHead>
                  <TableHead>Items Preview</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Total Price</TableHead>
                  <TableHead className="w-[80px] text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => {
                  const totalItemsCount =
                    order.rentalItems?.reduce(
                      (acc, item) => acc + item.quantity,
                      0
                    ) || 0;

                  return (
                    <TableRow key={order.id} className="hover:bg-muted/40">
                      <TableCell className="font-mono text-xs font-semibold">
                        #{order.id.slice(0, 8)}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col text-xs space-y-0.5">
                          <span className="font-medium">
                            {format(new Date(order.startDate), "MMM dd, yyyy")}
                          </span>
                          <span className="text-muted-foreground">
                            to {format(new Date(order.endDate), "MMM dd, yyyy")}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary" className="font-normal text-xs">
                          {order.totalRentDays} Days
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="font-medium line-clamp-1">
                            {order.rentalItems?.[0]?.gearItem?.title || "N/A"}
                          </p>
                          {order.rentalItems?.length > 1 && (
                            <p className="text-xs text-muted-foreground">
                              +{order.rentalItems.length - 1} more item(s) ({totalItemsCount} total units)
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>
                        {order.payment ? (
                          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 font-medium text-[11px] border-emerald-200">
                            Paid
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-muted-foreground text-[11px]">
                            Unpaid
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        ${Number(order.totalPrice).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/dashboard/admin/orders/${order.id}`}
                                className="flex items-center gap-2 cursor-pointer"
                              >
                                <Eye className="w-4 h-4" /> View Details
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}