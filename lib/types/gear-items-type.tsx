import { ICategories } from "./categories-type";
import { IUserJwtPayload } from "./types";
import { IUserQuery } from "./users-type";



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
    pricePerDay: string | number;
    stock: number;
    availableStock: number;
    categoryId: string;
}

export interface IGearItemList {
    id: string;
    title: string;
    description: string;
    brand: string;
    pricePerDay: string |number;
    stock: number;
    availableStock: number;
    categoryId: string;
    providerId: string;
    category: ICategories,
    provider: IUserQuery
}

export interface GearItem {
  id: string;
  title: string;
  description: string;
  brand: string;
  pricePerDay: string;
  stock: number;
  availableStock: number;
  categoryId: string;
  providerId: string;
  provider: IUserQuery;
}