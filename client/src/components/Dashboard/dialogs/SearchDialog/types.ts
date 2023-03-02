import { IContact } from '../../ContactsList/ContactCard/types';

export interface ISearchDialogProps {
    open: boolean;
    selectedValue: IContact | undefined;

    onEdit?: (value: IContact, remove: boolean) => void;

    onClose: () => void;

    onSearch?: (value: string) => void;
}
