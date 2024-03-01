import { IContact } from '../../ContactsList/ContactCard/types';
import { DialogCommonProps } from '../types';

export interface IUpdateDialogProps extends DialogCommonProps {
    open: boolean;
    selectedValue: ContactWithPhoneNumbersAsString;

    onEdit?: (remove: boolean) => void;

    onFilterImage?: (image: string) => void;

    onClose: () => void;
}

export type ContactWithPhoneNumbersAsStringWithoutId = Omit<
    IContact,
    'phoneNumbers' | 'id'
> & {
    phoneNumbers: string;
};

export type ContactWithPhoneNumbersAsString = Omit<IContact, 'phoneNumbers'> & {
    phoneNumbers: string;
};
