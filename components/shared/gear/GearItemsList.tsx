
import React from 'react';
import { IGearItemList } from '@/lib/types/gear-items-type';
import { getPublicGearItems } from '@/app/(public-group)/_action/PublicGearItemsAction';
import HomePublicGearItemListCard from '@/app/(public-group)/_components/gear/HomePublicGearItemsCard';

const GearItemList = async () => {
  const { GEAR_ITEMS } = await getPublicGearItems();

  const gearItems: IGearItemList[] = Array.isArray(GEAR_ITEMS)
    ? GEAR_ITEMS
    : Array.isArray(GEAR_ITEMS?.data)
    ? GEAR_ITEMS.data
    : Array.isArray(GEAR_ITEMS?.data?.data)
    ? GEAR_ITEMS.data.data
    : [];

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold mb-4">Gear Items List</h2>

      {/* Product List Grid */}
      {gearItems.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">
          No gear items match your filter criteria.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          { gearItems.slice(0, 3).map((item) => (
                <HomePublicGearItemListCard key={item.id} GearListData={item} />
              ))
          }
        </div>
      )}
    </div>
  );
};

export default GearItemList;