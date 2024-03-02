import { IContact } from './ContactCard/types';

export interface IContactListProps {
    isDeviceOn: boolean;

    colorValue: string;

    page: number;

    contacts: IContact[];

    onPageChange: (page: number) => void;

    onRemoveContact?: (id: number) => void;

    onFetchContacts: (contacts: IContact[]) => void;

    onEditContact?: (contacts: IContact) => void;

    onOpenSearch?: () => void;

    onHandleSearch?: (value: string) => void;
}
