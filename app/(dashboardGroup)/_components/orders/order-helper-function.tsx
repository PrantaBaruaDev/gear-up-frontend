import { Badge } from "@/components/ui/badge";
import { OrderStatus, RentalOrder } from "@/lib/types/gear-order-type";
import { CheckCircle2, Clock, RotateCcw } from "lucide-react";

export const getOrderStatusBadge = (status: RentalOrder["status"]) => {
    switch (status) {
      case OrderStatus.PENDING:
        return (
          <Badge
            variant="outline"
            className="border-amber-500 text-amber-600 bg-amber-50/50 gap-1"
          >
            <Clock className="w-3 h-3" /> Pending
          </Badge>
        );
      case OrderStatus.CONFIRMED:
        return (
          <Badge
            variant="outline"
            className="border-blue-500 text-blue-600 bg-blue-50/50 gap-1"
          >
            <CheckCircle2 className="w-3 h-3" /> Confirmed
          </Badge>
        );
      case OrderStatus.RETURNED:
        return (
          <Badge
            variant="outline"
            className="border-gray-500 text-gray-600 bg-gray-50/50 gap-1"
          >
            <RotateCcw className="w-3 h-3" /> Returned
          </Badge>
        );
      case OrderStatus.PICKED_UP:
        return (
          <Badge
            variant="outline"
            className="border-emerald-500 text-emerald-600 bg-emerald-50/50 gap-1"
          >
            <RotateCcw className="w-3 h-3" /> Picked Up
          </Badge>
        );
      case OrderStatus.CANCELLED:
        return (
          <Badge
            variant="outline"
            className="border-red-500 text-red-600 bg-red-50/50 gap-1"
          >
            <RotateCcw className="w-3 h-3" /> Cancelled
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };
