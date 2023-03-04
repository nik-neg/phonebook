export interface IContactCardProps {
    contact: IContact;

    onEditContact?: (contacts: IContact) => void;
    onRemoveContact?: (id: IContact['id']) => void;
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
