"use server";

import { revalidateTag } from "next/cache";

export async function clearRentalOrdersCache() {
  revalidateTag("my-rental-orders", { expire: 0 });
}