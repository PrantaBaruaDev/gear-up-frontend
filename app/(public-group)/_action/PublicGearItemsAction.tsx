// app/(public-group)/_action/PublicGearItemsAction.tsx

export const getPublicGearItems = async (searchParams?: Record<string, any>) => {
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
    // Fetch both Gear Items (filtered) and Categories in parallel
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

export const getPublicSingleGearItem = async (id: string) => {
  const baseUrl = process.env.BACKEND_API_URL || "http://localhost:5000";
  const res = await fetch(`${baseUrl}/api/gear/${id}`, {
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24, // 1 day
      tags: ["my-gear-items"],
    },
  });

  return res.json();
};