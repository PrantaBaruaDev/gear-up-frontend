"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { ShieldCheck, UserX, UserCheck, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateUserStatusOrRole } from "../../_action/UsersAction";

interface UserProfileActionsProps {
  userId: string;
  userName: string;
  currentRole: string;
  currentStatus: string;
}

export function UserProfileActions({
  userId,
  userName,
  currentRole,
  currentStatus,
}: UserProfileActionsProps) {
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
          res.message || `User "${userName}" account status updated to ${newStatus}`
        );
      } else {
        toast.error(res.message || "Failed to update user status");
      }
    });
  };

  return (
    <div className="flex items-center gap-2">
      {/* Role Change Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" disabled={isPending} className="gap-1.5">
            {isPending ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <ShieldCheck className="w-3.5 h-3.5" />
            )}
            Role: <span className="font-semibold">{currentRole}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleRoleChange("ADMIN")}>
            Set as ADMIN
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleRoleChange("PROVIDER")}>
            Set as PROVIDER
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleRoleChange("CUSTOMER")}>
            Set as CUSTOMER
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Suspend/Active Status Toggle */}
      <Button
        variant={currentStatus === "ACTIVE" ? "destructive" : "default"}
        size="sm"
        disabled={isPending}
        onClick={handleStatusToggle}
        className="gap-1.5"
      >
        {isPending ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : currentStatus === "ACTIVE" ? (
          <>
            <UserX className="w-3.5 h-3.5" /> Suspend Account
          </>
        ) : (
          <>
            <UserCheck className="w-3.5 h-3.5" /> Activate Account
          </>
        )}
      </Button>
    </div>
  );
}