import { IContact } from '../../ContactsList/ContactCard/types';

export interface UpdateDialogProps {
    open: boolean;
    selectedValue: IContact;

    onEdit?: (value: IContact, remove: boolean) => void;

    onClose: () => void;
}
