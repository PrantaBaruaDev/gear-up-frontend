
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

export interface IUserProfile {
  id: string;
  userId: string;
  profilePhoto?: string | null;
  address?: string | null;
  phone?: string | null;
  created_at: string;
  updated_at: string;
}

export type IUser = {
  id : string,
  name : string,
  email : string,
  status : string,
  role : string,
  created_at : string,
  updated_at : string,
  profiles : IUserProfile
}

export interface UsersResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IUser;
}

export type NavbarProps = {
    user : IUser
}

export interface IUserJwtPayload {
    id: string;
    name: string;
    email: string;
    role: string | null;
}