import { IAddDialogState } from '../../Dashboard/dialogs/AddDialog';

export interface AddressAutoCompleteProps {
    handleSetValue: (name: keyof IAddDialogState, value: string) => void;
    formFieldName: keyof IAddDialogState;
}

export interface InputAdornmentWrapperProps {
    color: string;
    width: string;
}
