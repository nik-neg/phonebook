import { IContact } from '../components/Dashboard/ContactsList/ContactCard/types';

export interface IQueryPaginationInput {
    skip: number;
    take: number;
    keyword: string;
}

export interface IFilterImage {
    id: IContact['id'];

    imageFile: IContact['imageFile'];
    blur: number;
    grayscale: number;
    saturation: number;
}

export interface IFilterImageInput {
    imageFile: IContact['imageFile'];
    blur: number;
    grayscale: boolean;
    saturation: number;
}
