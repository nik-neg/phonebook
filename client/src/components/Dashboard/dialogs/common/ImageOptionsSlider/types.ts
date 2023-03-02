import { IconType } from 'react-icons';

export interface IImageOptionsSliderProps {
    name: string;
    Icon: IconType;

    onChangeParent?: (name: string, value: number) => void;

    min?: number;
    max?: number;
}
