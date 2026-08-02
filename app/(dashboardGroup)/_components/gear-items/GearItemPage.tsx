import React from "react";
import GearItemListCard from "@/app/(dashboardGroup)/_components/gear-items/GearItemListCard";
import { getGearItems } from "@/app/(dashboardGroup)/_action/GearItemAction";
import { IGearItemList } from "@/lib/types/gear-items-type";

interface ProviderGearItemsProps {
  title?: string;
  className?: string;
}

export const GearItemsPage = async ({
  title = "Provider Gear Items List",
  className = "",
}: ProviderGearItemsProps) => {
  const result = await getGearItems();

  const gearItems: IGearItemList[] = Array.isArray(result?.data)
    ? result.data
    : Array.isArray(result?.data?.data)
    ? result.data.data
    : [];

  if (!result?.success || gearItems.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground border rounded-lg bg-muted/10">
        <p>You haven&apos;t created any Gear Items yet.</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {title && <h2 className="text-xl font-bold tracking-tight">{title}</h2>}
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {gearItems.map((item) => (
          <GearItemListCard
            key={item.id}
            GearListData={item}
            UserRole="provider"
          />
        ))}
      </div>
    </div>
  );
};

export default GearItemsPage;