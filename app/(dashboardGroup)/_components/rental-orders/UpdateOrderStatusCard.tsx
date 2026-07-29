"use client";

import { useState, useTransition } from "react";
import { Loader2, RefreshCw } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/button"
import { Card as CardUI, CardContent as CardContentUI, CardHeader as CardHeaderUI, CardTitle as CardTitleUI } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { updateOrderStatusAction } from "@/app/(dashboardGroup)/_action/RentalOrdersAction";

const STATUS_OPTIONS = [
  { label: "Pending", value: "PENDING" },
  { label: "Order Confirmed", value: "CONFIRMED" },
  { label: "Order Pickup", value: "PICKED_UP" },
  { label: "Returned", value: "RETURNED" },
  { label: "Cancelled", value: "CANCELLED" },
];

interface UpdateOrderStatusCardProps {
  orderId: string;
  currentStatus: string;
}

export function UpdateOrderStatusCard({
  orderId,
  currentStatus,
}: UpdateOrderStatusCardProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>(
    currentStatus?.toUpperCase() || "PENDING"
  );
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const handleUpdateStatus = () => {
        setMessage(null);
        startTransition(async () => {
            const res = await updateOrderStatusAction(orderId, selectedStatus);
            if (res.success) {
            setMessage({ type: "success", text: res.message });
            } else {
            setMessage({ type: "error", text: res.message });
            }
        });
    };

  const isUnchanged = selectedStatus === currentStatus?.toUpperCase();

  return (
    <CardUI>
      <CardHeaderUI className="pb-3">
        <CardTitleUI className="text-base flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-muted-foreground" />
          Update Order Status
        </CardTitleUI>
      </CardHeaderUI>
      <CardContentUI className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">
            Select New Status
          </label>
          <Select
            value={selectedStatus}
            onValueChange={(val) => setSelectedStatus(val)}
            disabled={isPending}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleUpdateStatus}
          disabled={isPending || isUnchanged}
          className="w-full"
          size="sm"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
            </>
          ) : (
            "Update Status"
          )}
        </Button>

        {message && (
          <p
            className={`text-xs ${
              message.type === "success" ? "text-emerald-600" : "text-destructive"
            }`}
          >
            {message.text}
          </p>
        )}
      </CardContentUI>
    </CardUI>
  );
}