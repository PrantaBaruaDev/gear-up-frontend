
export const Role = {
  CUSTOMER: 'CUSTOMER',
  PROVIDER: 'PROVIDER',
  ADMIN: 'ADMIN'
} as const

export type Role = (typeof Role)[keyof typeof Role]

export interface IUserQuery {
  id: string;
  name: string;
  email: string;
}