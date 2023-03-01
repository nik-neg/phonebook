export interface IContactCardPhotoProps {
    src: string;
}

export interface IContactCardProps {
    contact: IContact;
    onRemove: (id: number) => void;
}

export interface IContact {
    id: number;
    nickName?: string;

    firstName: string;

    lastName: string;

    phoneNumbers: string[];

    address: string;

    imageFile: string;
}
