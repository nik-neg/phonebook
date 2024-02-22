export interface ISearchDialogProps {
    open: boolean;

    onClose: () => void;

    onSearch?: (value: string) => void;
}
