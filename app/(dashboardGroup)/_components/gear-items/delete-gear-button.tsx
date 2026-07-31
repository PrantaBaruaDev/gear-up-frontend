import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmModal from "@/components/shared/confirm-delete";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { deleteGearItem } from "../../_action/GearItemAction";


export default function DeleteGearButton({ id, name }: {id: string, name: string}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string, name: string) => {
    startTransition(async () => {
      const res = await deleteGearItem(id);

      if (res.success) {
        toast.success(res.message || `Deleted "${name}" successfully.`);
        setIsOpen(false);
      } else {
        toast.error(res.message || "Failed to delete category.");
      }
    });
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="w-fit px-8 cursor-pointer"
        onClick={() => setIsOpen(true)} 
      >
        <Trash2 className="w-4 h-4" /> Delete Gear
      </Button>

      <ConfirmModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => handleDelete(id, name)}
        title="Delete Gear"
        description={
          <>
            Are you sure you want to delete{" "}
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