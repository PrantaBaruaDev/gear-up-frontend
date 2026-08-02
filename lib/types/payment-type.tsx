export const PaymentStatus = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
} as const

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]

export interface Payment {
  id: string;
  amount: number | string;
  paidAt: Date | string;
  status: string;
  stripeCustomerId: string;
  stripeTransactionId: string;
}

export interface IPaymentUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface IPaymentRentalOrder {
  id: string;
  customerId: string;
  startDate: string;
  endDate: string;
  totalPrice: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPayment {
  id: string;
  userId: string;
  rentalOrderId: string;
  amount: string;
  paidAt: string | null;
  status: PaymentStatus | string;
  stripeCustomerId: string;
  stripeTransactionId: string;
  createdAt: string;
  updatedAt: string;
  user?: IPaymentUser;
  rentalOrder?: IPaymentRentalOrder;
}