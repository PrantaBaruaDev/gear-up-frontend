import { Badge } from "@/components/ui/badge";
import { Role } from "@/lib/types/users-type";
import { Building, ShieldCheck, UserCheck, UserX } from "lucide-react";


export const getRoleBadge = (role: string) => {
    switch (role?.toUpperCase()) {
      case Role.ADMIN:
        return (
          <Badge className="bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-100 gap-1 font-medium text-xs px-2.5 py-0.5">
            <ShieldCheck className="w-3.5 h-3.5" /> Admin
          </Badge>
        );
      case Role.PROVIDER:
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100 gap-1 font-medium text-xs px-2.5 py-0.5">
            <Building className="w-3.5 h-3.5" /> Provider
          </Badge>
        );
      case Role.CUSTOMER:
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100 gap-1 font-medium text-xs px-2.5 py-0.5">
            <Building className="w-3.5 h-3.5" /> Customer
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-muted-foreground font-medium text-xs">
            {role || "NOT FOUND"}
          </Badge>
        );
    }
  };

export const getStatusBadge = (status: string) => {
    switch (status?.toUpperCase()) {
      case "ACTIVE":
        return (
          <Badge
            variant="outline"
            className="border-emerald-500 text-emerald-600 bg-emerald-50/50 gap-1 font-medium text-xs px-2.5 py-0.5"
          >
            <UserCheck className="w-3.5 h-3.5" /> Active
          </Badge>
        );
      case "SUSPEND":
        return (
          <Badge
            variant="outline"
            className="border-rose-500 text-rose-600 bg-rose-50/50 gap-1 font-medium text-xs px-2.5 py-0.5"
          >
            <UserX className="w-3.5 h-3.5" /> {status}
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };



