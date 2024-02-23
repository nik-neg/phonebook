export interface IAddDialogProps {
    open: boolean;

    onEdit?: () => void;

    onClose: () => void;
}

export interface IFilter {
    grayscale: boolean;

    blur: number;

    saturation: number;
}

export interface IAddDialogState {
    firstName: string;
    lastName: string;
    nickName: string;
    imageFile: string;
    address: string;
    phoneNumbers: string;
}
