import { IContact } from './ContactCard/types';

export interface IContactListProps {
    contacts: IContact[];
    onAddContact: () => void;
    onRemoveContact?: (id: number) => void;

    onFetchContacts: (contacts: IContact[]) => void;

    onEditContact?: (contacts: IContact) => void;

    onOpenSearch?: () => void;
}

export interface IContactListWrapper {
    contactsAreFetched: boolean;
    hover: boolean;
}
