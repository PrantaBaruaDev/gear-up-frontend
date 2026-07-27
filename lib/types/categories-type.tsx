
export interface ICategoryQuery {
    id: string;
    name: string;
}

export interface ICreateCategoryQuery {
    name: string;
}

export interface ICategories {
    id: string;
    name: string;
    createdAt: Date;
}