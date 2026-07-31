"use client";

import React, { useActionState, useEffect, useState } from "react";
import { Plus, Trash2, FolderPlus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { CategoryItemState, ICreateCategoryQuery } from "@/lib/types/categories-type";
import { createCategoryItems } from "../../_action/CategoriesItemsAction";

const initialState: CategoryItemState = {
  success: false,
  statusCode: 0,
  message: "",
  data: null,
};

export default function CategoryForm() {
  const [categories, setCategories] = useState<ICreateCategoryQuery[]>([{ name: "" }]);
  const [state, formAction, pending] = useActionState(createCategoryItems, initialState);

  useEffect(() => {
    if (state.statusCode !== 0) {
      if (state.success) {
        toast.success(state.message || "Categories created successfully!");
        setCategories([{ name: "" }]);
      } else {
        toast.error(state.message || "Failed to create categories");
      }
    }
  }, [state]);

  const handleCategoryChange = (index: number, value: string) => {
    const updated = [...categories];
    updated[index].name = value;
    setCategories(updated);
  };

  const handleAddCategory = () => {
    setCategories([...categories, { name: "" }]);
  };

  const handleRemoveCategory = (index: number) => {
    if (categories.length === 1) {
      toast.error("You must keep at least one category input field.");
      return;
    }
    setCategories(categories.filter((_, i) => i !== index));
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-sm border">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <FolderPlus className="w-5 h-5 text-primary" />
          Create Categories
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="space-y-4">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                type="text"
                name="categories"
                placeholder={`Category Name #${index + 1} (e.g., Camping)`}
                value={category.name}
                onChange={(e) => handleCategoryChange(index, e.target.value)}
                required
                className="flex-1"
              />

              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => handleRemoveCategory(index)}
                disabled={categories.length === 1}
                className="text-destructive hover:bg-destructive/10"
                title="Remove category field"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}

          <div className="flex items-center gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleAddCategory}
              className="w-full gap-2 border-dashed"
            >
              <Plus className="w-4 h-4" /> Add Another Category
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full mt-4 font-semibold"
            disabled={pending}
          >
            {pending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting Categories...
              </>
            ) : (
              `Create ${categories.filter((c) => c.name.trim()).length || 1} Categories`
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}