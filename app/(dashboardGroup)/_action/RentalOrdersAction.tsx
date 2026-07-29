"use server";

import { RentalOrder } from "@/lib/types/gear-order-type";
import { Role } from "@/lib/types/users-type";
import { getMe } from "@/service/getMe";
import { isAccessTokenExist } from "@/service/refreshToken";
import { jwtUtils } from "@/utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { revalidatePath } from "next/cache";
import { revalidateTag } from "next/cache";

type RentalOrderState = {
    success : true;
    statusCode : number;
    message : string;
    data : RentalOrder;
}

export const getRentalOrders = async () => {
  try {
    const accessToken = await isAccessTokenExist();

    if (!accessToken) {
      return {
        success: false,
        message: "User not logged in!",
        data: [],
      };
    }

    const decodedAccessToken = accessToken
      ? (jwtUtils.verifyToken(
          accessToken,
          process.env.JWT_ACCESS_SECRET as string
        ) as JwtPayload)
      : null;

    let fetchPath = null;

    switch (decodedAccessToken?.data?.role) {
      case Role.ADMIN:
        fetchPath = `${process.env.BACKEND_API_URL}/api/admin/rentals`;
        break;
      case Role.PROVIDER:
        fetchPath = `${process.env.BACKEND_API_URL}/api/provider/orders`;
        break;
      case Role.CUSTOMER:
        fetchPath = `${process.env.BACKEND_API_URL}/api/rentals`;
        break;
      default:
        return {
          success: false,
          message: "API Route Path not found!",
          data: [],
        };
    }

    const res = await fetch(fetchPath, {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24, // 1 day
        tags: ["my-rental-orders"],
      },
    });

    if (!res.ok) {
      return {
        success: false,
        message: `Failed to fetch orders (${res.status})`,
        data: [],
      };
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error fetching rental orders:", error);
    return {
      success: false,
      message: "Something went wrong while fetching orders.",
      data: [],
    };
  }
};

export const getSingleRentalOrders = async (id: string) => {
  try {
    const accessToken = await isAccessTokenExist();

    if (!accessToken) {
      return {
        success: false,
        message: "User not logged in!",
        data: [],
      };
    }

    const decodedAccessToken = accessToken
      ? (jwtUtils.verifyToken(
          accessToken,
          process.env.JWT_ACCESS_SECRET as string
        ) as JwtPayload)
      : null;

    let fetchPath = null;

    switch (decodedAccessToken?.data?.role) {
      case Role.ADMIN:
        fetchPath = `${process.env.BACKEND_API_URL}/api/admin/rentals/${id}`;
        break;
      case Role.PROVIDER:
        fetchPath = `${process.env.BACKEND_API_URL}/api/provider/orders/${id}`;
        break;
      case Role.CUSTOMER:
        fetchPath = `${process.env.BACKEND_API_URL}/api/rentals/${id}`;
        break;
      default:
        return {
          success: false,
          message: "API Route Path not found!",
          data: [],
        };
    }

    const res = await fetch(fetchPath, {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24, // 1 day
        tags: ["my-rental-orders"],
      },
    });

    if (!res.ok) {
      return {
        success: false,
        message: `Failed to fetch orders (${res.status})`,
        data: [],
      };
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error fetching rental orders:", error);
    return {
      success: false,
      message: "Something went wrong while fetching orders.",
      data: [],
    };
  }
};

// export const updateOrderStatusAction = async (orderId : string, prevState : RentalOrderState , formData: FormData) => {
//     console.log("Update Request come data: id= ",{
//         orderId
//     },
//     "\nUpdate Form request data: ", formData
//     );

//     const status = formData.get("status");

//     const payload = {
//         status,
//     }

//     const accessToken = await isAccessTokenExist();
//     const userMe = await getMe();
//     let fetchPath = null;
//     let redirectPath = null;

//     switch(userMe && userMe.data.role){
//         case Role.ADMIN:
//             fetchPath= `${process.env.BACKEND_API_URL}/api/admin/rentals/${orderId}`;
//             redirectPath= "/dashboard/admin";
//             break;
//         case Role.PROVIDER:
//             fetchPath= `${process.env.BACKEND_API_URL}/api/provider/orders/${orderId}`;
//             redirectPath= "/dashboard/provider";
//             break;
//         default:
//             return {
//                 success : false,
//                 message : "API Route Path not found!"
//             }
//     }

//     try {
//       const response = await fetch(`${fetchPath}`, {
//           method : "PATCH",
//           headers : {
//               Cookie: `accessToken=${accessToken}`,
//               "Content-Type" : "application/json"
//           },
//           body : JSON.stringify(payload)
//       });

//       const result = await response.json();
//       if(result.success){
//           revalidateTag("my-rental-orders", {
//               expire : 0
//           })
//       } 

//       if (response.ok) {
//         revalidatePath(`${redirectPath}/orders/${orderId}`);
//         return { success: true, message: "Status updated successfully!" };
//       }

//       return { success: false, message: result.message || "Failed to update status." };

//     } catch(error) {
//       return { success: false, message: "An unexpected error occurred." };
//     }
// }

export const updateOrderStatusAction = async (
  orderId: string,
  status: string
) => {
  console.log("Update Request come data: id=", { orderId }, "\nStatus:", status);

  const payload = { status };

  const accessToken = await isAccessTokenExist();
  const userMe = await getMe();
  let fetchPath = null;
  let redirectPath = null;

  switch (userMe && userMe.data.role) {
    case Role.ADMIN:
      fetchPath = `${process.env.BACKEND_API_URL}/api/admin/rentals/${orderId}`;
      redirectPath = "/dashboard/admin";
      break;
    case Role.PROVIDER:
      fetchPath = `${process.env.BACKEND_API_URL}/api/provider/orders/${orderId}`;
      redirectPath = "/dashboard/provider";
      break;
    default:
      return {
        success: false,
        message: "API Route Path not found!",
      };
  }

  try {
    const response = await fetch(`${fetchPath}`, {
      method: "PATCH",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (result.success) {
      revalidateTag("my-rental-orders", { expire: 0 });
    }

    if (response.ok) {
      revalidatePath(`${redirectPath}/orders/${orderId}`);
      return { success: true, message: "Status updated successfully!" };
    }

    return { success: false, message: result.message || "Failed to update status." };
  } catch (error) {
    return { success: false, message: "An unexpected error occurred." };
  }
};
