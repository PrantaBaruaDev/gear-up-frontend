export interface ICategoryQuery {
  id: string;
  name: string;
}

export interface ICreateCategoryQuery {
  name: string;
}

export interface ICategoryItem {
  id: string;
  name: string;
  createdAt?: string | Date;
}
export interface CategoryItemState<T = ICategoryItem | ICategoryItem[] | null> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}