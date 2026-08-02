import { GearItem } from "./gear-items-type";
import { Payment } from "./payment-type";
import { IUserQuery } from "./users-type";

export const OrderStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  PICKED_UP: 'PICKED_UP',
  RETURNED: 'RETURNED',
  CANCELLED: 'CANCELLED'
} as const

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]

export interface RentalItem {
  id: string;
  rentalOrderId: string;
  gearItemId: string;
  quantity: number;
  gearItem: GearItem;
}

export interface RentalOrder {
  id: string;
  customerId: string;
  startDate: string;
  endDate: string;
  totalPrice: string;
  status: OrderStatus;
  createdAt?: string;
  updatedAt?: string;
  rentalItems: RentalItem[];
  payment: Payment | null;
  customer: IUserQuery;
  totalRentDays: number;
}