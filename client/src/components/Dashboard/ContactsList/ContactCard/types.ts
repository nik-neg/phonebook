export interface IContactCardPhotoProps {
    src: string;
}

export interface IContactCardProps {
    contact: IContact;
    onRemove: (id: number) => void;

    onEditContact?: (contacts: IContact) => void;
}

export interface IPhoneNumber {
    id: number;
    phoneNumber: string;
}

export interface IContact {
    id: number;
    nickName?: string;

    firstName: string;

    lastName: string;

    phoneNumbers: IPhoneNumber[];

    address: string;

    imageFile: string;
}
