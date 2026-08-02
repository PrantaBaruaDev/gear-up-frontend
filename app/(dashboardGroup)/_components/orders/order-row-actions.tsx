"use client";

import Link from "next/link";
import { Eye, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteOrderButton } from "./delete-order-button";
import { Role } from "@/lib/types/users-type";

interface OrderRowActionsProps {
  orderId: string;
  orderCustomerName: string;
  userRole?: Role;
}

export function OrderRowActions({
  orderId,
  orderCustomerName,
  userRole = "CUSTOMER",
}: OrderRowActionsProps) {
  const getDetailsPath = () => {
    switch (userRole.toUpperCase()) {
      case "ADMIN":
        return `/dashboard/admin/orders/${orderId}`;
      case "PROVIDER":
        return `/dashboard/provider/orders/${orderId}`;
      case "CUSTOMER":
      default:
        return `/dashboard/customer/orders/${orderId}`;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* View Details Link */}
        <DropdownMenuItem asChild>
          <Link href={getDetailsPath()} className="flex items-center gap-2 cursor-pointer">
            <Eye className="w-4 h-4 text-muted-foreground" /> View Details
          </Link>
        </DropdownMenuItem>

        {/* Admin Delete Action */}
        {userRole.toUpperCase() === "ADMIN" && (
          <DropdownMenuItem asChild>
            <DeleteOrderButton
              id={orderId}
              name={orderCustomerName || "Customer"}
            />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}