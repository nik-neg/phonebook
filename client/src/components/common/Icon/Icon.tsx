import { SImage } from './Icon.styles';
import { IconProps } from './types';

export const Icon = ({ icon, ...otherProps }: IconProps) => {
    return <SImage src={icon} {...otherProps} />;
};
