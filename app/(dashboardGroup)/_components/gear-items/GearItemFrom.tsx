"use client"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { IGearItem, IGearItemList } from '@/lib/types/gear-items-type'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createGearItem, updateGearItem } from '../../_action/GearItemAction'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { getCategoriesItems } from '../../_action/CategoriesItemsAction'
import { ICategories, ICategoryQuery } from '@/lib/types/categories-type'

interface GearItemFormProps {
    initialData?: IGearItemList | null;
}

const GearItemFrom = ({initialData}: GearItemFormProps) => {
    const isEditMode = Boolean(initialData?.id);

    const actionToPerform = isEditMode && initialData?.id 
        ? updateGearItem.bind(null, initialData.id) 
        : createGearItem;

    const [state, action, pending] = useActionState(actionToPerform, false);
    const [categoryItems, setCategoryItems] = useState<ICategories[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>(initialData?.categoryId || "");
    
    useEffect(() => {
        if (initialData?.categoryId) {
            setSelectedCategoryId(initialData.categoryId);
        }
    }, [initialData?.categoryId]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategoriesItems();
                const categories = response?.data ?? response ?? [];
                setCategoryItems(categories);
            } catch (error) {
                toast.error("Failed to load categories");
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (!state) return;
        console.log("Form page State Values:\n", state);
        if (!state.success) {
            toast.error(state.message || "Failed to create item");
        } else {
            toast.success(state.message || "Item created successfully!");
        }
    }, [state]);

  return (
    <form action={action} className="space-y-3">
        <Card className="p-5 space-y-4">
            {
                isEditMode && (
                    <Input name="id" type="hidden" placeholder="Enter your gear id" 
                        defaultValue={initialData?.title || ""}
                        required/>
                )
            }
            <Input name="title" type="text" placeholder="Enter your title"
                defaultValue={initialData?.title || ""}
            required/>
            <Input name="description" type="text" placeholder="Enter your description"
                defaultValue={initialData?.description || ""}
            required/>
            <Input name="brand" type="text" placeholder="Enter your brand" 
                defaultValue={initialData?.brand || ""}
            required/>
            <Input name="pricePerDay" type="number" placeholder="Enter your pricePerDay"
                defaultValue={initialData?.pricePerDay || ""}
            required/>
            <Input name="stock" type="number" placeholder="Enter your stock" 
                defaultValue={initialData?.stock || ""}
            required/>
            <Input name="availableStock" type="number" placeholder="Enter your availableStock"
                defaultValue={initialData?.stock || ""} 
                required/>

            <Select name="categoryId"
                value={selectedCategoryId} 
                onValueChange={(value) => setSelectedCategoryId(value)}
            >
                <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Select Item Category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        {categoryItems.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Button type="submit" className="cursor-pointer">
                {
                    pending? "Submitting" : "Save" 
                }
                {/* Create */}
            </Button>
        </Card>
    </form>
  )
}

export default GearItemFrom