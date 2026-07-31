"use server";

import { IUser } from "@/lib/types/users-type";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// Helper to retrieve auth cookie/token
async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value;
}

// Interface for update state responses
export interface UserActionState {
  success: boolean;
  statusCode?: number;
  message: string;
  data?: IUser | null;
}

/**
 * 1. Update User Details (Role, Status, etc.)
 * PATCH /api/admin/users/:userId or /api/users/:userId
 */
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

/**
 * 2. Convenience Helper: Toggle/Block User Status
 */
export async function toggleBlockUser(
  userId: string,
  currentStatus: string
): Promise<UserActionState> {
  const newStatus = currentStatus === "SUSPEND" ? "ACTIVE" : "SUSPEND";
  return updateUserStatusOrRole(userId, { status: newStatus });
}

/**
 * 3. Fetch All Users
 */
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

/**
 * 4. Single User Workaround (Since backend lacks GET /api/users/:id)
 * Fetches all users and finds the matching ID in memory.
 */
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