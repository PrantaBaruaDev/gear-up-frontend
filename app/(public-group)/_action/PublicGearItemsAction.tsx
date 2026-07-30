// app/(public-group)/_action/PublicGearItemsAction.tsx
import { IGearSearchParams, IGearSingleResponse } from "@/lib/types/gear-items-type";


export const getPublicGearItems = async (searchParams?: IGearSearchParams) => {
  const params = new URLSearchParams();

  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, String(value));
      }
    });
  }

  const queryString = params.toString();
  const baseUrl = process.env.BACKEND_API_URL || "http://localhost:5000";
  const gearFetchPath = `${baseUrl}/api/gear${queryString ? `?${queryString}` : ""}`;
  const categoriesFetchPath = `${baseUrl}/api/categories`;

  try {
    const [gearRes, categoriesRes] = await Promise.all([
      fetch(gearFetchPath, { method: "GET", headers: { "Content-Type": "application/json" }, cache: "no-store" }),
      fetch(categoriesFetchPath, { method: "GET", headers: { "Content-Type": "application/json" }, next: { revalidate: 3600 } }),
    ]);

    const gearData = gearRes.ok ? await gearRes.json() : [];
    const categoriesData = categoriesRes.ok ? await categoriesRes.json() : [];

    return {
      GEAR_ITEMS: gearData,
      CATEGORIES: categoriesData,
    };
  } catch (error) {
    console.error("Error fetching gear or categories:", error);
    return { GEAR_ITEMS: [], CATEGORIES: [] };
  }
};

export async function fetchSingleGear(id: string): Promise<IGearSingleResponse | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/gear/${id}`, {
      cache: "no-store", 
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error fetching gear details:", error);
    return null;
  }
}