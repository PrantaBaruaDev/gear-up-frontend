"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import ConfirmModal from "@/components/shared/confirm-delete";
import { toast } from "sonner";
import { deleteRentalOrders } from "../../_action/RentalOrdersAction";

interface DeleteOrderButtonProps {
  id: string;
  name: string;
}

export function DeleteOrderButton({ id, name }: DeleteOrderButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const res = await deleteRentalOrders(id);
        if (res?.success) {
          toast.success(res.message || `Deleted "${name}" successfully.`);
          setIsOpen(false);
        } else {
          toast.error(res?.message || "Failed to delete order.");
        }
      } catch (error) {
        console.error("Delete Order Error:", error);
        toast.error("An unexpected error occurred.");
      }
    });
  };

  return (
    <>
      <button
        type="button"
        className="flex w-full items-center gap-2 px-2 py-1.5 text-sm text-destructive hover:bg-destructive/10 rounded-sm transition-colors cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(true);
        }}
      >
        <Trash2 className="w-4 h-4" /> Delete Order
      </button>

      <ConfirmModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDelete}
        title="Delete Order"
        description={
          <>
            Are you sure you want to delete order for{" "}
            <span className="font-semibold text-foreground">{`"${name}"`}</span>?
            This action cannot be undone.
          </>
        }
        confirmText="Yes, Delete"
        isLoading={isPending}
        variant="destructive"
      />
    </>
  );
}