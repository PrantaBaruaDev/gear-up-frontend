"use server";

import { isAccessTokenExist } from "@/service/refreshToken";
import { jwtUtils } from "@/utils/jwt";
import { JwtPayload } from "jsonwebtoken";

export interface RentalOrderItemPayload {
  gearItemId: string;
  quantity: number;
}

export interface CreateRentalOrderPayload {
  startDate: string;
  endDate: string;
  rentalItems: RentalOrderItemPayload[];
}

export interface CreateRentalOrderResponse {
  success: boolean;
  message?: string;
  data?: unknown;
}

export async function createRentalOrder(
  payload: CreateRentalOrderPayload
): Promise<CreateRentalOrderResponse> {
  const fetchPath = `${process.env.BACKEND_API_URL}/api/rentals`;

  try {
    const accessToken = await isAccessTokenExist();

    if (!accessToken) {
      return {
        success: false,
        message: "User authentication failed. Please log in again.",
      };
    }

    const decodedAccessToken = accessToken ? (jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)) as JwtPayload : null;
    const customerId = decodedAccessToken?.data?.id || decodedAccessToken?.id || decodedAccessToken?.userId;

    if (!customerId) {
      return {
        success: false,
        message: "Invalid session or customer token. Please log in again.",
      };
    }

    const payloadData = {
      customerId,
      startDate: payload.startDate,
      endDate: payload.endDate,
      rentalItems: payload.rentalItems,
    };

    const response = await fetch(fetchPath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${accessToken}`,
        "Cookie": `accessToken=${accessToken}`, 
      },
      body: JSON.stringify(payloadData),
    });

    const resData = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: resData.message || "Failed to place rental order.",
      };
    }

    return resData;
  } catch (error: any) {
    console.error("Error creating rental order:", error);
    return {
      success: false,
      message: error?.message || "An unexpected network or server error occurred.",
    };
  }
}