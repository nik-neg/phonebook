import { IContact } from '../../ContactsList/ContactCard';
import { DialogCommonProps } from '../types';

export interface IAddDialogProps extends DialogCommonProps {
    open: boolean;

    onSave?: (contact: IContact) => void;

    onClose: () => void;
}

export interface IFilter {
    grayscale: boolean;

    blur: number;

    saturation: number;
}

export interface IAddDialogState {
    firstName: string;
    lastName: string;
    nickName: string;
    imageFile: string;
    address: string;
    phoneNumbers: string;
}

export enum ESuggestionType {
    FIRST_NAME = 'autocomplete-portal-firstname',
    LAST_NAME = 'autocomplete-portal-lastname',
    USER_NAME = 'autocomplete-portal-username',
    ADDRESS = 'autocomplete-address',
    TELEPHONE = 'autocomplete-portal-dial_code',
}

export type SuggestionState = {
    'autocomplete-portal-firstname': boolean;
    'autocomplete-portal-lastname': boolean;
    'autocomplete-portal-username': boolean;
    'autocomplete-portal-dial_code': boolean;
    'autocomplete-address': boolean;
};
