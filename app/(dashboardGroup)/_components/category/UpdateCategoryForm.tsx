"use client";

import React, { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { Edit, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { CategoryItemState, ICategoryQuery } from "@/lib/types/categories-type";
import { updateCategoryItem } from "../../_action/CategoriesItemsAction";

interface UpdateCategoryFormProps {
  category: ICategoryQuery;
}

const initialState: CategoryItemState = {
  success: false,
  statusCode: 0,
  message: "",
  data: null,
};

export default function UpdateCategoryForm({ category }: UpdateCategoryFormProps) {
  const [name, setName] = useState<string>(category.name || "");
  const [state, formAction, pending] = useActionState(updateCategoryItem, initialState);

  useEffect(() => {
    if (state.statusCode !== 0) {
      if (state.success) {
        toast.success(state.message || "Category updated successfully!");
      } else {
        toast.error(state.message || "Failed to update category.");
      }
    }
  }, [state]);

  return (
    <Card className="max-w-xl mx-auto shadow-sm border">
      <CardHeader className="space-y-1">
        <div className="mb-2">
          <Link
            href="/admin/category"
            className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            Back to Categories
          </Link>
        </div>
        <CardTitle className="text-xl flex items-center gap-2">
          <Edit className="w-5 h-5 text-primary" />
          Update Category
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="categoryId" value={category.id} />

          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Category Name
            </label>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="e.g., Camping"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-4 font-semibold"
            disabled={pending}
          >
            {pending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Updating Category...
              </>
            ) : (
              "Update Category"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}