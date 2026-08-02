"use server";

import { IGearSearchParams } from "@/lib/types/gear-items-type";

export const searchGearItemAction = async (prevState : IGearSearchParams , formData: FormData) => {

    const category = formData.get("category")?.toString();
    const brand = formData.get("brand")?.toString();
    const maxPrice = formData.get("maxPrice")?.toString();
    const minPrice = formData.get("minPrice")?.toString();
    const availableOnly = formData.get("availableOnly")?.toString();

    const params = new URLSearchParams();

    if (category) params.append("category", category);
    if (brand) params.append("brand", brand);
    if (maxPrice) params.append("maxPrice", maxPrice);
    if (minPrice) params.append("minPrice", minPrice);
    if (availableOnly) params.append("availableOnly", "true");

    const queryString = params.toString();
    
    const fetchPath = `${process.env.BACKEND_API_URL}/api/gear${queryString ? `?${queryString}` : ""}`;

    try {
        const res = await fetch(fetchPath, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json"
            },
            cache: "no-store"
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error(`API Error (${res.status}):`, errorText);
            throw new Error(`Failed to fetch gear items. Status: ${res.status}`);
        }

        const result = await res.json();
        return result;

    } catch (error) {
        console.error("Action error:", error);
        return prevState; 
    }
}