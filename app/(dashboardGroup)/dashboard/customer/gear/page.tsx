
import React from 'react'
import GearItemListCard from '../../../_components/gear-items/GearItemListCard'
import { getGearItems } from '../../../_action/GearItemAction';
import { IGearItemList } from '@/lib/types/gear-items-type';

const GearItems = async() => {
  // getGearItems
  const result = await getGearItems();
  const gearItems: IGearItemList[] = Array.isArray(result?.data)
    ? result.data
    : Array.isArray(result?.data?.data)
    ? result.data.data
    : Array.isArray(result?.data?.posts)
    ? result.data.posts
    : [];

  if (!result.success || gearItems.length === 0) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        You haven&apos;t created any Gear Items yet.
      </p>
    );
  }

  return (
    <>
      <h2>Customer Gear Items List</h2>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {gearItems.map((item) => (
          <GearItemListCard key={item.id} 
            GearListData={item}
          />
        ))}
      </div>
    </>
  )
}

export default GearItems

