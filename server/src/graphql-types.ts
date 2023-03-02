
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateContactInput {
    firstName: string;
    lastName: string;
    nickName?: Nullable<string>;
    phoneNumbers: string[];
    address: string;
    imageFile: string;
}

export class UpdateContactInput {
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    nickName?: Nullable<string>;
    phoneNumbers?: Nullable<Nullable<string>[]>;
    address?: Nullable<string>;
    imageFile?: Nullable<string>;
    filter?: Nullable<FilterImageInput>;
}

export class QueryPaginationInput {
    take?: Nullable<number>;
    skip?: Nullable<number>;
    keyword?: Nullable<string>;
}

export class FilterImageInput {
    id?: Nullable<number>;
    imageFile?: Nullable<string>;
    blur: number;
    grayscale: boolean;
    saturation: number;
}

export class Contact {
    id: number;
    firstName: string;
    lastName: string;
    nickName?: Nullable<string>;
    phoneNumbers: PhoneNumber[];
    address: string;
    imageFile: string;
}

export class PhoneNumber {
    id: number;
    phoneNumber: string;
}

export abstract class IQuery {
    contacts: Contact[];
    contact?: Nullable<Contact>;
    filterImage: string;
}

export abstract class IMutation {
    createContact: Contact;
    updateContact: Contact;
    removeContact: Contact;
}

type Nullable<T> = T | null;
