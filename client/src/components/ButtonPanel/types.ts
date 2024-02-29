import { IContact } from '../Dashboard/ContactsList/ContactCard';

export interface IButtonPanelProps {
    isDeviceOn: boolean;

    onAddContact: () => void;

    onHandleSearch: (value: string) => Promise<void>;

    onFetchContacts: (contacts: IContact[]) => void;

    toggleDevice: () => void;
}
