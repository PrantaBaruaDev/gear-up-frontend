import { IGearItem } from "@/types/gear-items-type";
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type GearItemState = {
    success : true,
    statusCode : number,
    message : string,
    data : IGearItem
}


export const createGearItems = async (prevState : GearItemState , formData: FormData) => {

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
    console.log(payload);
return;

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/provider/gear`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(payload)
    });

    const result = await res.json();

    if(result.success){
        const cookieStore = await cookies()

        cookieStore.set("accessToken", result.data.accessToken , {
            httpOnly : true,
            maxAge : 60 * 60 * 24,
            sameSite : "lax",
        });
        cookieStore.set("refreshToken", result.data.refreshToken , {
            httpOnly : true,
            maxAge : 60 * 60 * 24 * 7,
            sameSite : "lax",
        });

        redirect("/dashboard")
    }

    return result
}