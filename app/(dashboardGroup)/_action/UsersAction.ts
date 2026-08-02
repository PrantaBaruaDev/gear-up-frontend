"use server";

import { IUser } from "@/lib/types/users-type";
import { getMe } from "@/service/getMe";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value;
}

export interface UserActionState {
  success: boolean;
  statusCode?: number;
  message: string;
  data?: IUser | null;
}

export async function updateUserStatusOrRole(
  userId: string,
  payload: { role?: string; status?: string }
): Promise<UserActionState> {
  if (!userId) {
    return { success: false, statusCode: 400, message: "User ID is required." };
  }

  try {
    const accessToken = await getAccessToken();

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/users/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken ? { Cookie: `accessToken=${accessToken}` } : {}),
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        statusCode: res.status,
        message: result?.message || "Failed to update user.",
      };
    }

    revalidatePath("/dashboard/admin/users");
    revalidatePath(`/dashboard/admin/profile/${userId}`);

    return {
      success: true,
      statusCode: res.status || 200,
      message: result?.message || "User updated successfully!",
      data: result?.data || null,
    };
  } catch (error) {
    console.error("Update User Error:", error);
    return {
      success: false,
      statusCode: 500,
      message: "An error occurred while updating user details.",
    };
  }
}

export async function toggleBlockUser(
  userId: string,
  currentStatus: string
): Promise<UserActionState> {
  const newStatus = currentStatus === "SUSPEND" ? "ACTIVE" : "SUSPEND";
  return updateUserStatusOrRole(userId, { status: newStatus });
}

export async function getAllUsers() {
  try {
    const accessToken = await getAccessToken();

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Cookie: `accessToken=${accessToken}` } : {}),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return { success: false, data: [] };
    }

    const result = await res.json();
    return { success: true, message:result.message, data: result?.data || [] };
  } catch (error) {
    console.error("Fetch All Users Error:", error);
    return { success: false, message: "Some problem on user fetching!", data: [] };
  }
}

export async function getUserById(userId: string) {
  try {
    const response = await getAllUsers();

    if (!response.success || !Array.isArray(response.data)) {
      return {
        success: false,
        message: "Failed to fetch users list.",
        data: null,
      };
    }

    const singleUser = response.data.find((user: IUser) => user.id === userId);

    if (!singleUser) {
      return {
        success: false,
        message: "User not found.",
        data: null,
      };
    }

    return {
      success: true,
      message: "User found successfully.",
      data: singleUser,
    };
  } catch (error) {
    console.error("Get Single User Workaround Error:", error);
    return {
      success: false,
      message: "An error occurred while fetching user profile.",
      data: null,
    };
  }
}

export const getMyProfile = async() => {
  try {
    const response = await getMe();

    if (!response.success) {
      return {
        success: false,
        statusCode: 400,
        message: "Failed to fetch users list.",
        data: null,
      };
    }

    if (!response.data) {
      return {
        success: false,
        statusCode: 400,
        message: "User not found.",
        data: null,
      };
    }

    return response;
  } catch (error) {
    console.error("Get Single User Workaround Error:", error);
    return {
      success: false,
      message: "An error occurred while fetching user profile.",
      data: null,
    };
  }
}