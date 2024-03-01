import { IContact } from './ContactCard/types';

export interface IContactListProps {
    isDeviceOn: boolean;

    page: number;

    onPageChange: (page: number) => void;

    onRemoveContact?: (id: number) => void;

    onFetchContacts: (contacts: IContact[]) => void;

    onEditContact?: (contacts: IContact) => void;

    onOpenSearch?: () => void;

    onHandleSearch?: (value: string) => void;
}
