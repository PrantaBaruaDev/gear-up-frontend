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
import { DeleteOrderButton } from "@/app/(dashboardGroup)/_components/orders/delete-order-button";
import { getOrderStatusBadge } from "@/app/(dashboardGroup)/_components/orders/order-helper-function";
import {OrderListPageComponent} from "@/app/(dashboardGroup)/_components/orders/orders-table";

export default async function OrderListPage() {
  const result = await getRentalOrders();

  const orders: RentalOrder[] = Array.isArray(result?.data)
    ? result.data : [];

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

      <OrderListPageComponent 
        orders={orders} 
        userRole="ADMIN" 
      />
    </div>
  );
}
