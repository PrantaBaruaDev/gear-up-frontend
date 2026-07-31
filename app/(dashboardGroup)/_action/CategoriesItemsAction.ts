"use server";

import { CategoryItemState } from "@/lib/types/categories-type";
import { isAccessTokenExist } from "@/service/refreshToken";
import { revalidatePath } from "next/cache";

export const createCategoryItems = async (
  prevState: CategoryItemState,
  formData: FormData
): Promise<CategoryItemState> => {
  const rawCategories = formData.getAll("categories") as string[];

  const payload = rawCategories
    .map((name) => ({ name: name.trim() }))
    .filter((cat) => cat.name.length > 0);

  if (payload.length === 0) {
    return {
      success: false,
      statusCode: 400,
      message: "Please enter at least one valid category name.",
      data: null,
    };
  }

  try {
    const accessToken = await isAccessTokenExist();
    
    if (!accessToken) {
        return {
            success: false,
            statusCode: 404,
            message: "User not logged in!",
            data: null,
        };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/categories`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
     },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        statusCode: res.status,
        message: result?.message || "Failed to create categories.",
        data: null,
      };
    }

    revalidatePath("/dashboard/admin/category");

    return {
      success: true,
      statusCode: res.status || 201,
      message: result?.message || "Categories created successfully!",
      data: result?.data || [],
    };
  } catch (error) {
    console.error("Create Action Error:", error);
    return {
      success: false,
      statusCode: 500,
      message: "An unexpected error occurred while creating categories.",
      data: null,
    };
  }
};

export const updateCategoryItem = async (
  prevState: CategoryItemState,
  formData: FormData
): Promise<CategoryItemState> => {
  const categoryId = (formData.get("categoryId") as string)?.trim();
  const name = (formData.get("name") as string)?.trim();

  if (!categoryId || !name) {
    return {
      success: false,
      statusCode: 400,
      message: "Category ID and name are required.",
      data: null,
    };
  }

  try {
    const accessToken = await isAccessTokenExist();
    
    if (!accessToken) {
        return {
            success: false,
            statusCode: 404,
            message: "User not logged in!",
            data: null,
        };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/categories/${categoryId}`, {
        method: "PATCH",
        headers: { 
            "Content-Type": "application/json",
            Cookie: `accessToken=${accessToken}`, 
        },
        body: JSON.stringify({ name }),
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        statusCode: res.status,
        message: result?.message || "Failed to update category.",
        data: null,
      };
    }

    revalidatePath("/dashboard/admin/category");

    return {
      success: true,
      statusCode: res.status || 200,
      message: result?.message || "Category updated successfully!",
      data: result?.data || null,
    };
  } catch (error) {
    console.error("Update Action Error:", error);
    return {
      success: false,
      statusCode: 500,
      message: "An error occurred while updating category.",
      data: null,
    };
  }
};

export const getCategoriesItems = async () => {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
        cache : "force-cache",
        next : {
            revalidate : 60 * 60 * 24, // 1day
            tags : ["my-categories"]
        }
    });
    
    const result = res.json();

    return result
}

export const deleteCategoryItem = async (
  categoryId: string
): Promise<CategoryItemState> => {
  if (!categoryId) {
    return {
      success: false,
      statusCode: 400,
      message: "Category ID is required.",
      data: null,
    };
  }

  try {
    const accessToken = await isAccessTokenExist();
    
    if (!accessToken) {
        return {
            success: false,
            statusCode: 404,
            message: "User not logged in!",
            data: null,
        };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/categories/${categoryId}`,
      {
        method: "DELETE",
        headers: { 
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`, 
        },
      }
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        statusCode: res.status,
        message: result?.message || "Failed to delete category.",
        data: null,
      };
    }

    revalidatePath("/admin/category");

    return {
      success: true,
      statusCode: res.status || 200,
      message: result?.message || "Category deleted successfully!",
      data: null,
    };
  } catch (error) {
    console.error("Delete Action Error:", error);
    return {
      success: false,
      statusCode: 500,
      message: "An error occurred while deleting category.",
      data: null,
    };
  }
};