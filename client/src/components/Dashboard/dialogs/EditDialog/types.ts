import { IContact } from '../../ContactsList/ContactCard/types';

export interface EditDialogProps {
    open: boolean;
    selectedValue: IContact;

    onEdit?: (remove: boolean) => void;

    onClose: (value: IContact) => void;
}
