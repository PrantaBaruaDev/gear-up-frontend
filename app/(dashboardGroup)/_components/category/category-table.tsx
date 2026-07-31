"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { Edit, Search, Plus, FolderKanban, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ICategoryItem } from "@/lib/types/categories-type";
import ConfirmModal from "@/components/shared/confirm-delete";
import { toast } from "sonner";
import { deleteCategoryItem } from "../../_action/CategoriesItemsAction";
import { DeleteCategoryButton } from "./delete-category-button";

interface CategoryTableProps {
  categories: ICategoryItem[];
}

export default function CategoryTable({ categories }: CategoryTableProps) {
  const [search, setSearch] = useState("");

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

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
    <div className="space-y-4">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Link href="/dashboard/admin/category/new" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto gap-2">
            <Plus className="w-4 h-4" /> Add Category
          </Button>
        </Link>
      </div>

      {/* Table Section */}
      <div className="border rounded-lg overflow-x-auto bg-card shadow-sm">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-muted/50 text-muted-foreground uppercase text-xs font-semibold border-b">
            <tr>
              <th className="px-4 py-3 w-16">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Created Date</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, index) => (
                <tr
                  key={category.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-muted-foreground">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 font-semibold text-foreground">
                    {category.name}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {category.createdAt
                      ? new Date(category.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/dashboard/admin/category/${category.id}`}>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          title="Edit Category"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>

                      <DeleteCategoryButton category={category} />

                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-12 text-center text-muted-foreground">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <FolderKanban className="w-8 h-8 opacity-40" />
                    <p>No categories found.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Meta */}
      <div className="text-xs text-muted-foreground">
        Showing {filteredCategories.length} of {categories.length} categories
      </div>
    </div>
  );
}