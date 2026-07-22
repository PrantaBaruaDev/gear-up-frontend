import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { IGearItem } from '@/types/gear-items-type'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createGearItems } from '../_action/GearItemAction'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

const items = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
]

const GearItemFrom = () => {
    const [state, action, pending] = useActionState(createGearItems, false)

    useEffect(()=> {
        if(!state) return;

        if(!state.success){
            toast.error(state.message || "Login failed");
        }
    }, [state]);


  return (
    <form action={action} className="space-y-3">
        <Card className="p-5 space-y-4">
            <Input name="title" type="text" placeholder="Enter your title" required/>
            <Input name="description" type="text" placeholder="Enter your description" required/>
            <Input name="brand" type="text" placeholder="Enter your brand" required/>
            <Input name="pricePerDay" type="number" placeholder="Enter your pricePerDay" required/>
            <Input name="stock" type="number" placeholder="Enter your stock" required/>
            <Input name="availableStock" type="number" placeholder="Enter your availableStock"/>
            <Input name="categoryId" type="text" placeholder="Enter your categoryId"/>

            {/* <Select name="category" items={items}>
                <SelectTrigger className="w-full max-w-48">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        <SelectItem key={""}>
                            Select Item Category
                        </SelectItem>

                        {items.map((item) => (
                            console.log(item)
                            <SelectItem key={item.value} value={item.value}>
                            {item.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select> */}

            <Button type="submit" className="cursor-pointer">
                {
                    pending? "Submitting" : "Create" 
                }
                {/* Create */}
            </Button>
        </Card>
    </form>
  )
}

export default GearItemFrom