import { OrderStatus } from "./gear-order-type";


export interface IRentalOrderQuery {
    id: string;
    customerId?: string;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    status: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface IRentalOrderPayload {
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    rentalItems: {
        gearItemId: string;
        quantity: number;
    }
}

