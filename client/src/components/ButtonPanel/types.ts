import { IContact } from '../Dashboard/ContactsList/ContactCard';

export interface IButtonPanelProps {
    isDeviceOn: boolean;

    colorValue: string;

    onColorChange: (color: string) => void;

    onAddContact: () => void;

    onHandleSearch: (value: string) => Promise<void>;

    onOpenSearch: () => void;

    onFetchContacts: (contacts: IContact[]) => void;

    toggleDevice: () => void;
}
