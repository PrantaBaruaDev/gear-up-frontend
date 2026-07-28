// app/(public-group)/gear/page.tsx
import React from 'react';
import { IGearItemList } from '@/lib/types/gear-items-type';
import PublicGearItemListCard from '../_components/gear/PublicGearItemsCard';
import { getPublicGearItems } from '../_action/PublicGearItemsAction';
import { ICategories } from '@/lib/types/categories-type';
import { PublicCategorySearchForm } from '../_components/gear/PublicCategorySearchForm';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const GearItemPublicList = async ({ searchParams }: PageProps) => {
  const resolvedParams = await searchParams;
  const { GEAR_ITEMS, CATEGORIES } = await getPublicGearItems(resolvedParams);

  // Extract Gear Items based on typical API envelope formats
  const gearItems: IGearItemList[] = Array.isArray(GEAR_ITEMS)
    ? GEAR_ITEMS
    : Array.isArray(GEAR_ITEMS?.data)
    ? GEAR_ITEMS.data
    : Array.isArray(GEAR_ITEMS?.data?.data)
    ? GEAR_ITEMS.data.data
    : [];

  // Extract Categories based on typical API envelope formats
  const categories: ICategories[] = Array.isArray(CATEGORIES)
    ? CATEGORIES
    : Array.isArray(CATEGORIES?.data)
    ? CATEGORIES.data
    : Array.isArray(CATEGORIES?.data?.data)
    ? CATEGORIES.data.data
    : [];

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold mb-4">Gear Items Catalog</h2>

      {/* Category & Filter Bar */}
      <PublicCategorySearchForm categories={categories} />

      {/* Product List Grid */}
      {gearItems.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">
          No gear items match your filter criteria.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {gearItems.map((item) => (
            <PublicGearItemListCard key={item.id} GearListData={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GearItemPublicList;