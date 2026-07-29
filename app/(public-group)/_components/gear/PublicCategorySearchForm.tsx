// app/(public-group)/_components/gear/PublicCategorySearchForm.tsx
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ICategories } from "@/lib/types/categories-type";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  categories: ICategories[];
}

export const PublicCategorySearchForm = ({ categories }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read initial states directly from searchParams without needing useEffect
  // Default availableOnly to true if the URL param isn't set, otherwise match URL value
  const paramCategory = searchParams.get("category") || "";
  const paramAvailable = searchParams.has("availableOnly")
    ? searchParams.get("availableOnly") === "true"
    : true; // Default is true when key is missing

  const [selectedCategory, setSelectedCategory] = useState<string>(paramCategory);
  const [availableOnly, setAvailableOnly] = useState<boolean>(paramAvailable);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams();

    const brand = formData.get("brand")?.toString();
    const minPrice = formData.get("minPrice")?.toString();
    const maxPrice = formData.get("maxPrice")?.toString();

    if (selectedCategory && selectedCategory !== "all") {
      params.set("category", selectedCategory);
    }
    if (brand) params.set("brand", brand);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    
    // Explicitly set availableOnly flag
    params.set("availableOnly", availableOnly ? "true" : "false");

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    setSelectedCategory("");
    setAvailableOnly(true);
    router.push(pathname);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-wrap items-end gap-4 p-4 border rounded-xl bg-card mb-6 shadow-sm"
    >
      {/* Category Dropdown */}
      <div className="flex flex-col gap-1.5 min-w-[200px]">
        <Label>Category</Label>
        <Select
          value={selectedCategory}
          onValueChange={setSelectedCategory}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.name}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Brand Search */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="brand">Brand</Label>
        <Input
          id="brand"
          name="brand"
          placeholder="e.g. North Face"
          key={searchParams.get("brand") || "brand-input"}
          defaultValue={searchParams.get("brand") || ""}
        />
      </div>

      {/* Min Price */}
      <div className="flex flex-col gap-1.5 w-28">
        <Label htmlFor="minPrice">Min Price</Label>
        <Input
          id="minPrice"
          name="minPrice"
          type="number"
          placeholder="0"
          key={searchParams.get("minPrice") || "min-input"}
          defaultValue={searchParams.get("minPrice") || ""}
        />
      </div>

      {/* Max Price */}
      <div className="flex flex-col gap-1.5 w-28">
        <Label htmlFor="maxPrice">Max Price</Label>
        <Input
          id="maxPrice"
          name="maxPrice"
          type="number"
          placeholder="1000"
          key={searchParams.get("maxPrice") || "max-input"}
          defaultValue={searchParams.get("maxPrice") || ""}
        />
      </div>

      {/* Available Only Checkbox */}
      <div className="flex items-center gap-2 pb-2.5">
        <Checkbox
          id="availableOnly"
          checked={availableOnly}
          onCheckedChange={(checked) => setAvailableOnly(Boolean(checked))}
        />
        <Label htmlFor="availableOnly" className="cursor-pointer">
          Available Only
        </Label>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button type="submit" className="cursor-pointer">Filter</Button>
        <Button type="button" className="cursor-pointer" variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </form>
  );
};