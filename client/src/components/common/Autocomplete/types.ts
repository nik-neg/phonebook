import { IAddDialogState } from '../../Dashboard/dialogs/AddDialog';

export interface IAutocompleteProps {
    portalId: string;
    isSuggestionsVisible: boolean;
    [key: string]: any;
}
export interface AutoCompleteWrapperProps {
    portalId: string;
    isSuggestionsVisible: boolean;
    onHandleSuggestionsVisible: (portalId: string, value: boolean) => void;
    attributeName: string;
    formFieldName: keyof IAddDialogState;
    handleSetValue: (name: keyof IAddDialogState, value: string) => void;
}
