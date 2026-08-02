"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  Eye,
  FolderKanban,
  MoreHorizontal,
  Search,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { deleteRentalOrders } from "@/app/(dashboardGroup)/_action/RentalOrdersAction";
import { RentalOrder } from "@/lib/types/gear-order-type";
import { getOrderStatusBadge } from "@/app/(dashboardGroup)/_components/orders/order-helper-function";
import { Role } from "@/lib/types/users-type";
import { Input } from "@/components/ui/input";

export function OrderListPageComponent({
  orders,
  userRole,
}: {
  orders: RentalOrder[];
  userRole: string;
}) {
  const [search, setSearch] = useState("");

  const filteredOrders = orders.filter((cat) =>
    cat.id.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Rental Orders</h1>
        <p className="text-sm text-muted-foreground">
          Manage and inspect gear rental requests and bookings.
        </p>
      </div>

      <div className="relative w-full sm:w-72">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search Order By ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
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
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <OrderTableRow
                      key={order.id}
                      order={order}
                      userRole={userRole}
                    />
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="py-12 text-center text-muted-foreground"
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <FolderKanban className="w-8 h-8 opacity-40" />
                        <p>No Order found.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function OrderTableRow({
  order,
  userRole = "CUSTOMER",
}: {
  order: RentalOrder;
  userRole: string;
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const totalItemsCount =
    order.rentalItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  let routePath = "";

  switch (userRole) {
    case Role.ADMIN:
      routePath = `/dashboard/admin/orders/${order.id}`;
      break;
    case Role.PROVIDER:
      routePath = `/dashboard/provider/orders/${order.id}`;
      break;
    case Role.CUSTOMER:
      routePath = `/dashboard/customer/orders/${order.id}`;
      break;
    default:
      routePath = `/dashboard/customer/orders/${order.id}`;
      break;
  }

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await deleteRentalOrders(order.id);

      if (res?.success) {
        toast.success(
          res.message || `Deleted order #${order.id.slice(0, 8)} successfully.`,
        );
      } else {
        toast.error(res?.message || "Failed to delete order.");
      }
    } catch (error) {
      console.error("Delete Order Error:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <>
      <TableRow className="hover:bg-muted/40">
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
                +{order.rentalItems.length - 1} more item(s) ({totalItemsCount}{" "}
                total units)
              </p>
            )}
          </div>
        </TableCell>
        <TableCell>{getOrderStatusBadge(order.status)}</TableCell>
        <TableCell>
          {order.payment ? (
            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 font-medium text-[11px] border-emerald-200">
              Paid
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="text-muted-foreground text-[11px]"
            >
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
                  href={routePath}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Eye className="w-4 h-4" /> View Details
                </Link>
              </DropdownMenuItem>
              {userRole === "ADMIN" && (
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive cursor-pointer"
                  onSelect={() => setShowDeleteDialog(true)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>

      {/* Confirmation Parts */}
      {userRole === "ADMIN" && (
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                order{" "}
                <span className="font-semibold text-foreground">
                  #{order.id.slice(0, 8)}
                </span>
                .
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete();
                }}
                disabled={isDeleting}
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              >
                {isDeleting ? "Deleting..." : "Confirm Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
