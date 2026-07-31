import UpdateCategoryForm from "@/app/(dashboardGroup)/_components/category/UpdateCategoryForm";
import { ICategoryQuery } from "@/lib/types/categories-type";
import React from "react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getCategoryById(id: string): Promise<ICategoryQuery | null> {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const result = await res.json();
    return result?.data || result;
  } catch (error) {
    console.error("Failed to fetch category:", error);
    return null;
  }
}

export default async function CategoryUpdatePage({ params }: PageProps) {
  const { id } = await params;
  const category = await getCategoryById(id);

  if (!category) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center">
        <h2 className="text-xl font-semibold text-destructive">Category Not Found</h2>
        <p className="text-sm text-muted-foreground mt-1">
          The category you are looking for does not exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="py-10 px-4">
      <UpdateCategoryForm category={category} />
    </div>
  );
}