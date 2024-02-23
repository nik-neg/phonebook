import { IAddDialogState } from '../../Dashboard/dialogs/AddDialog';

export interface IAutocompleteProps {
    portalId: string;
    isSuggestionsVisible: boolean;
    onHandleSuggestionsVisible: (value: boolean) => void;
    [key: string]: any;
}
export interface AutoCompleteWrapperProps {
    portalId: string;
    isSuggestionsVisible: boolean;
    onHandleSuggestionsVisible: (value: boolean) => void;
    attributeName: string;
    formFieldName: keyof IAddDialogState;
    handleSetValue: (name: keyof IAddDialogState, value: string) => void;
}
