"use server";

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