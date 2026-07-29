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

