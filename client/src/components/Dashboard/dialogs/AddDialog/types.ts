export interface IAddDialogProps {
    open: boolean;

    onEdit?: () => void;

    onClose: () => void;
}

export interface IFilter {
    grayscale: boolean;

    blur: number;

    saturation: number;
}
