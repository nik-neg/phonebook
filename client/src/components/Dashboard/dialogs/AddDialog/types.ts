import { IContact } from '../../ContactsList/ContactCard/types';

export interface IAddDialogProps {
    open: boolean;
    selectedValue: IContact;

    onEdit?: (value: IContact, remove: boolean) => void;

    onClose: () => void;
}
