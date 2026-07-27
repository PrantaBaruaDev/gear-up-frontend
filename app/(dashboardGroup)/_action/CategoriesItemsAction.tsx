"use server"

import { ICategories } from "@/lib/types/categories-type";
import { cookies } from "next/headers";
import { redirect } from "next/navigation"

type CategoryItemState = {
    success : true,
    statusCode : number,
    message : string,
    data : ICategories
}


export const createCategoryItems = async (prevState : CategoryItemState , formData: FormData) => {

    const title = formData.get("title");
    const description = formData.get("description");
    const brand = formData.get("brand");
    const pricePerDay = formData.get("pricePerDay");
    const stock = formData.get("stock");
    const availableStock = formData.get("availableStock");
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
    // console.log(payload);
return;

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/provider/gear`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(payload)
    });

    const result = await res.json();

    return result
}

export const getCategoriesItems = async () => {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value || null;

    if(!accessToken){
        return {
            success : false,
            message : "User not logged in!"
        }
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
        headers : {
            // Authorization : accessToken as unknown as string,
            // Authorization : `${accessToken}`,
            // Authorization : `Bearer ${accessToken}`

            Cookie : `accessToken=${accessToken}`
        },

        cache : "force-cache",
        next : {
            revalidate : 60 * 60 * 24, // 1day
            tags : ["my-categories"]
        }
    });
    
    const result = res.json();

    return result
}
