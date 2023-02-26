import { IContact } from '../../ContactsList/ContactCard/types';

export interface AddDialogProps {
    open: boolean;
    selectedValue: IContact;

    onEdit?: (value: IContact, remove: boolean) => void;

    onClose: () => void;
}
