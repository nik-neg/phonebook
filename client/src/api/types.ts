import { IContact } from '../components/Dashboard/ContactsList/ContactCard/types';

export interface IQueryPaginationInput {
    skip?: number;
    take?: number;
    keyword?: string;

    page?: number;
}
export interface IFilterImageInput {
    imageFile?: IContact['imageFile'];
    blur: number;
    grayscale: boolean;
    saturation: number;
}

export interface CreateUserInput {
    email: string;
    password: string;
}
