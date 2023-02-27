export interface IContactCardPhotoProps {
    src: string;
}

export interface IContactCardProps {
    contact: IContact;
}

export interface IContact {
    nickName?: string;

    firstName: string;

    lastName: string;

    phoneNumbers: string[];

    address: string;

    imageUrl: string;
}
