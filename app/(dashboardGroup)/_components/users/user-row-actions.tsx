"use client";

import { useTransition } from "react";
import Link from "next/link";
import {
  MoreHorizontal,
  Eye,
  ShieldCheck,
  UserX,
  UserCheck,
  Building,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { updateUserStatusOrRole } from "../../_action/UsersAction";

interface UserRowActionsProps {
  userId: string;
  userName: string;
  currentRole: string;
  currentStatus: string;
}

export function UserRowActions({
  userId,
  userName,
  currentRole,
  currentStatus,
}: UserRowActionsProps) {
  const [isPending, startTransition] = useTransition();

  const handleRoleChange = (newRole: string) => {
    if (newRole === currentRole) return;

    startTransition(async () => {
      const res = await updateUserStatusOrRole(userId, { role: newRole });
      if (res.success) {
        toast.success(res.message || `Role updated to ${newRole}`);
      } else {
        toast.error(res.message || "Failed to update role");
      }
    });
  };

  const handleStatusToggle = () => {
    const newStatus = currentStatus === "ACTIVE" ? "SUSPEND" : "ACTIVE";

    startTransition(async () => {
      const res = await updateUserStatusOrRole(userId, { status: newStatus });
      if (res.success) {
        toast.success(
          res.message ||
            `User "${userName}" status set to ${newStatus.toLowerCase()}`
        );
      } else {
        toast.error(res.message || "Failed to update user status");
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0" disabled={isPending}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* View Details Link */}
        <DropdownMenuItem asChild>
          <Link
            href={`/dashboard/admin/profile/${userId}`}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Eye className="w-4 h-4" /> View Profile
          </Link>
        </DropdownMenuItem>

        {/* Role Selection Sub-menu */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> Change Role
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem
              onClick={() => handleRoleChange("ADMIN")}
              className="flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-600" /> Admin
              </span>
              {currentRole === "ADMIN" && "✓"}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleRoleChange("PROVIDER")}
              className="flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-blue-600" /> Provider
              </span>
              {currentRole === "PROVIDER" && "✓"}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleRoleChange("CUSTOMER")}
              className="flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-slate-600" /> Customer
              </span>
              {currentRole === "CUSTOMER" && "✓"}
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        {/* Status Toggle Action */}
        <DropdownMenuItem
          onClick={handleStatusToggle}
          className={`cursor-pointer ${
            currentStatus === "ACTIVE"
              ? "text-destructive focus:text-destructive"
              : "text-emerald-600 focus:text-emerald-600"
          }`}
        >
          {currentStatus === "ACTIVE" ? (
            <span className="flex items-center gap-2">
              <UserX className="w-4 h-4" /> Suspend Account
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <UserCheck className="w-4 h-4" /> Activate Account
            </span>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}