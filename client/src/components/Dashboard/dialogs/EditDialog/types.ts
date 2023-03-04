import { IContact } from '../../ContactsList/ContactCard/types';

export interface IEditDialogProps {
    open: boolean;
    selectedValue: IContact;

    onEdit?: (remove: boolean) => void;

    onClose: () => void;
}
