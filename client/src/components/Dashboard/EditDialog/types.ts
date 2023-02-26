import { IContact } from '../ContactsList/ContactCard/types';

export interface SimpleDialogProps {
    open: boolean;
    selectedValue: IContact;

    onEdit?: (value: IContact, remove: boolean) => void;

    onClose: (value: IContact) => void;
}
