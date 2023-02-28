
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
    imageUrl: string;
}

export class UpdateContactInput {
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    nickName?: Nullable<string>;
    phoneNumbers: Nullable<string>[];
    address?: Nullable<string>;
    imageUrl?: Nullable<string>;
}

export class Contact {
    id: number;
    firstName: string;
    lastName: string;
    nickName?: Nullable<string>;
    phoneNumbers: PhoneNumber[];
    address: string;
    imageUrl: string;
}

export class PhoneNumber {
    id: number;
    phoneNumber: string;
}

export abstract class IQuery {
    contacts: Contact[];
    contact?: Nullable<Contact>;
}

export abstract class IMutation {
    createContact: Contact;
    updateContact: Contact;
    removeContact: Contact;
}

type Nullable<T> = T | null;
