"use server";

import { IPayment } from "@/lib/types/payment-type";
import { Role } from "@/lib/types/users-type";
import { getMe } from "@/service/getMe";
import { isAccessTokenExist } from "@/service/refreshToken";

export const createPaymentCheckoutSession = async (rentalOrderId: string) => {
  try {
    const accessToken = await isAccessTokenExist();

    if (!accessToken) {
      return {
        success: false,
        message: "User not logged in!",
      };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({
        rentalOrderId: rentalOrderId, 
      }),
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to initiate payment.",
      };
    }

    return result;
  } catch (error) {
    console.error("Error creating payment session:", error);
    return {
      success: false,
      message: "An unexpected error occurred while processing payment.",
    };
  }
};

export interface PaymentApiResponse {
  success: boolean;
  statusCode?: number;
  message: string;
  data: IPayment[];
}

export async function getAllPayments(): Promise<PaymentApiResponse> {
  try {
    const accessToken = await isAccessTokenExist();

    const userMe = await getMe();
    let fetchPath = null;

    switch(userMe && userMe.data.role){
      case Role.ADMIN:
          fetchPath= `${process.env.BACKEND_API_URL}/api/payments`;
          break;
      case Role.PROVIDER:
          fetchPath= `${process.env.BACKEND_API_URL}/api/payments`;
          break;
      case Role.CUSTOMER:
          fetchPath= `${process.env.BACKEND_API_URL}/api/payments`;
          break;
      default:
          return {
              success : false,
              message : "API Route Path not found!",
              data: []
          }
    }

    const res = await fetch(fetchPath, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return { success: false, message: "Failed to fetch payments", data: [] };
    }

    const result = await res.json();
    return {
      success: result?.success ?? true,
      message: result?.message || "Payments fetched successfully",
      data: result?.data || [],
    };
  } catch (error) {
    console.error("Fetch Payments Error:", error);
    return { success: false, message: "An error occurred fetching payments.", data: [] };
  }
}

/**
 * Fetch a single payment by ID (Finds target item from list)
 */
export async function getPaymentById(paymentId: string): Promise<{
  success: boolean;
  message: string;
  data: IPayment | null;
}> {
  try {
    const accessToken = await isAccessTokenExist();

    const userMe = await getMe();
    let fetchPath = null;

    switch(userMe && userMe.data.role){
      case Role.ADMIN:
          fetchPath= `${process.env.BACKEND_API_URL}/api/payments/${paymentId}`;
          break;
      case Role.PROVIDER:
          fetchPath= `${process.env.BACKEND_API_URL}/api/payments/${paymentId}`;
          break;
      case Role.CUSTOMER:
          fetchPath= `${process.env.BACKEND_API_URL}/api/payments/${paymentId}`;
          break;
      default:
          return {
              success : false,
              message : "API Route Path not found!",
              data: null
          }
    }

    const res = await fetch(fetchPath, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return { success: false, message: "Failed to fetch payments", data: null };
    }

    const result = await res.json();
    if (!result) {
      return { success: false, message: "Payment transaction not found.", data: null };
    }
    return {
      success: result?.success ?? true,
      message: result?.message || "Payment details found.",
      data: result?.data || [],
    };
  } catch (error) {
    console.error("Get Payment By ID Error:", error);
    return { success: false, message: "An error occurred fetching payment details.", data: null };
  }
}