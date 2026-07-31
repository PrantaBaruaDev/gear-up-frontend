import CategoryTable from "@/app/(dashboardGroup)/_components/category/category-table";
import { ICategoryItem } from "@/lib/types/categories-type";
import React from "react";


async function getCategories(): Promise<ICategoryItem[]> {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/categories`,
      { cache: "no-store" }
    );

    if (!res.ok) return [];

    const result = await res.json();
    return result?.data || result || [];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

const CategoryListPage = async() => {
  const categories = await getCategories();

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
          <p className="text-sm text-muted-foreground">
            Manage your catalog categories and classifications.
          </p>
        </div>
      </div>

      <CategoryTable categories={categories} />
    </div>
  );
}

export default CategoryListPage;