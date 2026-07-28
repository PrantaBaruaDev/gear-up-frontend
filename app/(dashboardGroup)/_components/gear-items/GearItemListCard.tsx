// app/(dashboardGroup)/_components/gear-items/GearItemListCard.tsx
"use client";

import React, { useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { IGearItemList } from '@/lib/types/gear-items-type'
import { SquarePen, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { deleteGearItem } from '../../_action/GearItemAction';

type MyGearCardProps = {
    GearListData: IGearItemList;
}

const GearItemListCard = ({ GearListData }: MyGearCardProps) => {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleEdit = () => {
        router.push(`/admin-dashboard/gear-item/create?id=${GearListData.id}`);
    };

    const handleDelete = async () => {
        // 1. Confirm before deleting
        const confirmed = window.confirm("Are you sure you want to delete this gear item?");
        if (!confirmed) return;

        try {
            setIsDeleting(true);

            // 2. Call the server action
            const result = await deleteGearItem(GearListData.id);

            // 3. Handle response
            if (result.success) {
                // Success: Server action already invalidates tags. 
                // You can show a success toast here if you use toast notifications.
                console.log("Deleted successfully:", result.message);
            } else {
                // Error from server/API
                alert(result.message || "Failed to delete item.");
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("An unexpected error occurred while deleting.");
        } finally {
            setIsDeleting(false);
        }
    }

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
            <Badge variant="secondary">{GearListData.category.name}</Badge>
          </CardAction>
          <CardTitle>{GearListData.title}</CardTitle>
          <CardTitle>
            <p>Price Per Day: {GearListData.pricePerDay} </p>
            </CardTitle>
          <CardDescription>
            <div className='flex flex-wrap gap-5'>
                <p>Gear ID: {GearListData.id}</p>
                <p>Available Stock: {GearListData.availableStock}</p>
                <p>Stock: {GearListData.stock}</p>
                <p>Brand: {GearListData.brand}</p>
            </div>
            <p className='mt-3'>
                {GearListData.description}
            </p>
            <div className='mt-4'>
                <h2 className='font-black text-xl'>Provider</h2>
                <p><b>ID:</b> {GearListData.provider.id}</p>
                <p><b>Name:</b> {GearListData.provider.name}</p>
                <p><b>Email:</b> {GearListData.provider.email}</p>
            </div>
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className="w-fit px-8 cursor-pointer"
            onClick={handleDelete}
            disabled={isDeleting}
          ><Trash2 /> 
            {isDeleting ? "Deleting..." : "Delete"} 
          </Button>
          <Button className="w-fit px-8 cursor-pointer"
            onClick={handleEdit}
          ><SquarePen /> Edit</Button>
        </CardFooter>
      </Card>
    </>
  )
}

export default GearItemListCard
