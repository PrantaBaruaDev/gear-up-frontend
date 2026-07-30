// app/(dashboardGroup)/_components/gear-items/GearItemListCard.tsx
"use client";

import React, { useState } from 'react'
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { IGearItemList } from '@/lib/types/gear-items-type'
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/useCartStore'; 
import { ShoppingBag, Check } from 'lucide-react';
import Link from 'next/link';

type MyGearCardProps = {
  GearListData: IGearItemList;
}

const PublicGearItemListCard = ({ GearListData }: MyGearCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      gearItemId: GearListData.id,
      title: GearListData.title,
      brand: GearListData.brand,
      pricePerDay: Number(GearListData.pricePerDay),
      availableStock: GearListData.availableStock,
    }, 1);

    // Show temporary added feedback
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    // router.push('/checkout');
  };

  return (
    <>
      <Card className="relative mx-auto w-full max-w-sm pt-0">
        <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS85FftGJEdxMl7bTFK3KKzisvej2UkQWTgmoAEYAzlBdC1MiQlBZXn76c&s=10"
          width={800}
          height={800}
          alt="Gear Item"
          className="relative z-20 aspect-video w-full object-cover"
        />
        
        <CardHeader>
          <CardAction>
            <Badge variant="secondary">{GearListData.category?.name || "Gear"}</Badge>
          </CardAction>
          <CardTitle>
            <Link href={`/gear/${GearListData.id}`} className='cursor-pointer'>
              <h2>{GearListData.title}</h2>

              <p>Price Per Day: ${GearListData.pricePerDay} </p>
              <p>Brand: {GearListData.brand}</p>
              </Link>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <CardDescription>
            <div className='flex flex-wrap gap-5'>
                <p>Available Stock: {GearListData.availableStock}</p>
            </div>
            <p className='mt-3'>
                {GearListData.description.split(' ').slice(0, 10).join(' ') + (GearListData.description.split(' ').length > 10 ? '...' : '')}
            </p>
          </CardDescription>
        </CardContent>

        <CardFooter className="gap-2">
          <Button 
            onClick={handleAddToCart}
            disabled={GearListData.availableStock <= 0}
            className='w-full cursor-pointer gap-2'
          >
            {added ? (
              <>
                <Check className="h-4 w-4 text-green-400" />
                Added to Cart!
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4" />
                {GearListData.availableStock > 0 ? "Add to Cart" : "Out of Stock"}
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}

export default PublicGearItemListCard