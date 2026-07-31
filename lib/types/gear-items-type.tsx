import { ICategoryItem } from "./categories-type";
import { IUserQuery } from "./users-type";

export interface IGearSingleResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IGearItemQuery;
}

export interface IGearSearchParams {
  category: string,
  brand: string,
  minPrice: string,
  maxPrice: string,
  availableOnly: string
}

export interface IGearItemQuery {
  id: string;
  title: string;
  description: string;
  brand: string;
  pricePerDay: string | number;
  stock: number;
  availableStock: number;
  categoryId: string;
  providerId: string;
  createdAt: string;
  updatedAt: string;
  category: ICategoryItem;
  provider: IUserQuery;
}

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
    category: ICategoryItem,
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