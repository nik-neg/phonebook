import { IAddDialogState } from '../../Dashboard/dialogs/AddDialog';

export interface AddressAutoCompleteProps {
    portalId: string;
    handleSetValue: (name: keyof IAddDialogState, value: string) => void;
    formFieldName: keyof IAddDialogState;
    onHandleSuggestionsVisible: (portalId: string, value: boolean) => void;
}

export interface InputAdornmentWrapperProps {
    color: string;
    width: string;
}
