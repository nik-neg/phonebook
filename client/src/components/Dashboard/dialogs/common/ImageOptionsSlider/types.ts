import { IconType } from 'react-icons';

export interface IImageOptionsSliderProps {
    name: string;
    Icon: IconType;

    onChangeParent?: (name: string, value: number) => void;

    parentValue: number;

    min?: number;
    max?: number;
}
