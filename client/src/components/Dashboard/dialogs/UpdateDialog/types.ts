import { IContact } from '../../ContactsList/ContactCard/types';

export interface IUpdateDialogProps {
    open: boolean;
    selectedValue: IContact;

    onEdit?: (remove: boolean) => void;

    onClose: () => void;
}
