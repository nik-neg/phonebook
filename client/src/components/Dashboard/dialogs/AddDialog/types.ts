import { IContact } from '../../ContactsList/ContactCard/types';

export interface IAddDialogProps {
    open: boolean;
    selectedValue: IContact | undefined;

    onEdit?: (value: IContact, remove: boolean) => void;

    onClose: () => void;
}

export interface IFilter {
    grayscale: boolean;

    blur: number;

    saturation: number;
}
