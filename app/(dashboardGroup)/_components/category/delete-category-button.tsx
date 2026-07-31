import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmModal from "@/components/shared/confirm-delete";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { ICategoryItem } from "@/lib/types/categories-type";
import { deleteCategoryItem } from "../../_action/CategoriesItemsAction";

interface DICategory {
  category: ICategoryItem
}

export function DeleteCategoryButton({ category }: DICategory) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string, name: string) => {
    startTransition(async () => {
      const res = await deleteCategoryItem(id);
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
        className="h-8 w-8 text-destructive hover:bg-destructive/10"
        onClick={() => setIsOpen(true)}
        title="Delete Category"
      >
        <Trash2 className="w-4 h-4" />
      </Button>

      <ConfirmModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => handleDelete(category.id, category.name)}
        title="Delete Category"
        description={
          <>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">{`"${category.name}"`}</span>?
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