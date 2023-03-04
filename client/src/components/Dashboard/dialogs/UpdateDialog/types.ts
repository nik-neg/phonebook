import { IContact } from '../../ContactsList/ContactCard/types';

export interface IUpdateDialogProps {
    open: boolean;
    selectedValue: IContact;

    onEdit?: (remove: boolean) => void;

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
