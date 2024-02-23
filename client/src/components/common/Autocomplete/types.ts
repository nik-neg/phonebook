import { IAddDialogState } from '../../Dashboard/dialogs/AddDialog';

export interface AutoCompleteWrapperProps {
    attributeName: string;
    register: any;
    formFieldName: keyof IAddDialogState;
    handleSetValue: (name: keyof IAddDialogState, value: string) => void;
}
