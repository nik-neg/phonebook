import { DialogCommonProps } from '../types';

export interface ISearchDialogProps extends DialogCommonProps {
    open: boolean;

    onClose: () => void;

    onSearch?: (value: string) => void;
}
