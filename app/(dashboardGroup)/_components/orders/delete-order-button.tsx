"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import ConfirmModal from "@/components/shared/confirm-delete";
import { toast } from "sonner";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { deleteRentalOrders } from "../../_action/RentalOrdersAction";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface DeleteOrderButtonProps {
  id: string;
  name: string;
}

export function DeleteOrderButton({ id, name }: DeleteOrderButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

const handleDelete = async () => {
    setIsDeleting(true);
    console.log("Delete Button On click: ", id);

    try {
      // Execute the server action directly
      const res = await deleteRentalOrders(id);

      if (res?.success) {
        toast.success(res.message || `Deleted "${name}" successfully.`);
        setIsOpen(false); // Close modal on success
        
        // Refresh server component data
        startTransition(() => {
          router.refresh();
        });
      } else {
        toast.error(res?.message || "Failed to delete order.");
      }
    } catch (error) {
      console.error("Delete Order Error:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsDeleting(false);
    }
  };

const isLoading = isPending || isDeleting;

  return (
    <>
      <DropdownMenuItem
        className="text-destructive focus:text-destructive cursor-pointer"
        onSelect={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
      >
        <Trash2 className="w-4 h-4 mr-2" />
        <span>Delete Order</span>
      </DropdownMenuItem>

      <ConfirmModal
        isOpen={isOpen}
        // onClose={() => setIsOpen(false)}
        onClose={() => {
          if (!isLoading) setIsOpen(false);
        }}
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
        isLoading={isLoading}
        variant="destructive"
      />
    </>
  );
}