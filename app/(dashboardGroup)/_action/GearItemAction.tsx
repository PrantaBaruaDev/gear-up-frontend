"use server"

import { IGearItem, IGearItemList, IGearItemUpdate } from "@/lib/types/gear-items-type";
import { getMe } from "@/service/getMe";
import { isAccessTokenExist } from "@/service/refreshToken";
import { jwtUtils } from "@/utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { Brackets } from "lucide-react";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation"

type GearItemState = {
    success : true;
    statusCode : number;
    message : string;
    data : IGearItem | IGearItemUpdate;
}


export const createGearItem = async (prevState : GearItemState , formData: FormData) => {

    const title = formData.get("title");
    const description = formData.get("description");
    const brand = formData.get("brand");
    const pricePerDay = Number(formData.get("pricePerDay"));
    const stock = Number(formData.get("stock"));
    const availableStock = Number(formData.get("availableStock"));
    const categoryId = formData.get("categoryId");

    if (!categoryId) {
        return {
            success: false,
            message: "Please select a category"
        };
    }
    
    const payload = {
        title,
        description,
        brand,
        pricePerDay,
        stock,
        availableStock,
        categoryId,
    }
    console.log(payload);

    const accessToken = await isAccessTokenExist();
    const userMe = await getMe();
    let fetchPath = null;

    switch(userMe && userMe.data.role){
        case "ADMIN":
            fetchPath= `${process.env.BACKEND_API_URL}/api/admin/gear`;
            break;
        case "PROVIDER":
            fetchPath= `${process.env.BACKEND_API_URL}/api/provider/gear`;
            break;
        default:
            return {
                success : false,
                message : "API Route Path not found!"
            }
    }

// console.log("gear item create action user me: ", fetchPath);
//     return;

    const res = await fetch(`${fetchPath}`, {
        method : "POST",
        headers : {
            Cookie: `accessToken=${accessToken}`,
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(payload)
    });

    const result = await res.json();
        if(result.success){
        revalidateTag("my-gear-post", {
            expire : 0
        })
    }
    
    return result
}

export const updateGearItem = async (gearId : string, prevState : GearItemState , formData: FormData) => {
    console.log("Update Request come data: id= ",{
        gearId
    },
    "\nUpdate Form request data: ", formData
    );

    const title = formData.get("title");
    const description = formData.get("description");
    const brand = formData.get("brand");
    const pricePerDay = Number(formData.get("pricePerDay"));
    const stock = Number(formData.get("stock"));
    const availableStock = Number(formData.get("availableStock"));
    const categoryId = formData.get("categoryId");

    const payload = {
        title,
        description,
        brand,
        pricePerDay,
        stock,
        availableStock,
        categoryId,
    }

    const accessToken = await isAccessTokenExist();
    const userMe = await getMe();
    let fetchPath = null;

    switch(userMe && userMe.data.role){
        case "ADMIN":
            fetchPath= `${process.env.BACKEND_API_URL}/api/admin/gear/${gearId}`;
            break;
        case "PROVIDER":
            fetchPath= `${process.env.BACKEND_API_URL}/api/provider/gear/${gearId}`;
            break;
        default:
            return {
                success : false,
                message : "API Route Path not found!"
            }
    }

    const res = await fetch(`${fetchPath}`, {
        method : "PATCH",
        headers : {
            Cookie: `accessToken=${accessToken}`,
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(payload)
    });

    const result = await res.json();
    if(result.success){
        revalidateTag("my-gear-items", {
            expire : 0
        })
    } else{
        revalidateTag("my-gear-post", {
            expire:0
        })
    }

    console.log("Create PATCH to the api DEtails result: \n", result);
    return result
}


export const getGearItems = async () => {
    const accessToken = await isAccessTokenExist();

    if(!accessToken){
        return {
            success : false,
            message : "User not logged in!"
        }
    }

    const decodedAccessToken = accessToken ? (jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)) as JwtPayload : null;

    let fetchPath = null;

    switch(decodedAccessToken && decodedAccessToken.data.role){
        case "ADMIN":
            fetchPath= `${process.env.BACKEND_API_URL}/api/admin/gear`;
            break;
        case "PROVIDER":
            fetchPath= `${process.env.BACKEND_API_URL}/api/provider/gear`;
            break;
        default:
            return {
                success : false,
                message : "API Route Path not found!"
            }
    }

    const res = await fetch(fetchPath, {
        headers : {
            // Authorization : accessToken as unknown as string,
            // Authorization : `${accessToken}`,
            // Authorization : `Bearer ${accessToken}`

            Cookie : `accessToken=${accessToken}`
        },

        cache : "force-cache",
        next : {
            revalidate : 60 * 60 * 24, // 1day
            tags : ["my-gear-items"]
        }
    });

    const result = res.json();

    return result
}

export const getSingleGearItem = async(id: string) => {
    const accessToken = await isAccessTokenExist();

    if(!accessToken){
        return {
            success : false,
            message : "User not logged in!"
        }
    }

    const decodedAccessToken = accessToken ? (jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)) as JwtPayload : null;

    let fetchPath = null;

    switch(decodedAccessToken && decodedAccessToken.data.role){
        case "ADMIN":
            fetchPath= `${process.env.BACKEND_API_URL}/api/admin/gear/${id}`;
            break;
        case "PROVIDER":
            fetchPath= `${process.env.BACKEND_API_URL}/api/provider/gear/${id}`;
            break;
        default:
            return {
                success : false,
                message : "API Route Path not found!"
            }
    }

    const res = await fetch(fetchPath, {
        headers : {
            // Authorization : accessToken as unknown as string,
            // Authorization : `${accessToken}`,
            // Authorization : `Bearer ${accessToken}`

            Cookie : `accessToken=${accessToken}`
        },

        cache : "force-cache",
        next : {
            revalidate : 60 * 60 * 24, // 1day
            tags : ["my-gear-items"]
        }
    });

    const result = res.json();

    return result
}

export const deleteGearItem = async (gearId : string) => {
    const accessToken = await isAccessTokenExist();
    const userMe = await getMe();
    let fetchPath = null;

    if(!accessToken){
        return {
            success : false,
            message : "User not logged in!"
        }
    }

    switch(userMe && userMe.data.role){
        case "ADMIN":
            fetchPath= `${process.env.BACKEND_API_URL}/api/admin/gear/${gearId}`;
            break;
        case "PROVIDER":
            fetchPath= `${process.env.BACKEND_API_URL}/api/provider/gear/${gearId}`;
            break;
        default:
            return {
                success : false,
                message : "API Route Path not found!"
            }
    }

    const res = await fetch(`${fetchPath}`, {
        method : "DELETE",
        headers : {
            Cookie: `accessToken=${accessToken}`,
            "Content-Type" : "application/json"
        },
    });

    const result = await res.json();
    if(result.success){
        revalidateTag("my-gear-items", {
            expire : 0
        })
    } else{
        revalidateTag("my-gear-post", {
            expire: 0
        })
    }

    console.log("DELETE to the api DEtails result: \n", result);
    return result
}