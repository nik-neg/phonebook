import { IContact } from './ContactCard/types';

export interface IContactListProps {
    isDeviceOn: boolean;

    contacts: IContact[];

    onRemoveContact?: (id: number) => void;

    onFetchContacts: (contacts: IContact[]) => void;

    onEditContact?: (contacts: IContact) => void;

    onOpenSearch?: () => void;

    onHandleSearch?: (value: string) => void;
}

export interface IContactListWrapper {
    contactsAreFetched: boolean;
}
