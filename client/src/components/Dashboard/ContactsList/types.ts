import { IContact } from './ContactCard/types';

export interface IContactListProps {
    contacts: IContact[];
    onAddContact: () => void;

    onFetchContacts: (contacts: IContact[]) => void;
}
