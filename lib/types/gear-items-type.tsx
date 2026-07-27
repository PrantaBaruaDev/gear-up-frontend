import { ICategories } from "./categories-type";
import { IUserJwtPayload } from "./types";



export type IGearItem = {
    title: string;
    description: string;
    brand: string;
    pricePerDay: number;
    stock: number;
    availableStock: number;
    categoryId: string;
}

export type IGearItemUpdate = {
    id: string;
    title: string;
    description: string;
    brand: string;
    pricePerDay: number;
    stock: number;
    availableStock: number;
    categoryId: string;
}

export interface IGearItemList {
    id: string;
    title: string;
    description: string;
    brand: string;
    pricePerDay: number;
    stock: number;
    availableStock: number;
    categoryId: string;
    providerId: string;
    createdAt: Date;
    updatedAt: Date;
    category: ICategories,
    provider: IUserJwtPayload
}