import { IContact } from '../../ContactsList/ContactCard/types';
import { DialogCommonProps } from '../types';

export interface IEditDialogProps extends DialogCommonProps {
    open: boolean;
    selectedValue: IContact;

    onEdit?: (remove: boolean) => void;

    onClose: () => void;
}
