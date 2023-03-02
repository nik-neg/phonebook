import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import { IImageOptionsSliderProps } from './types';
import {
    SImageSliderOptionIcon,
    SImageSliderOptions,
    SImageSliderOptionsContainer,
    SImageSliderOptionsItem,
    SSliderName,
} from './ImageOptionsSlider.styles';

const Input = styled(MuiInput)`
    width: 42px;
`;

export const ImageOptionsSlider = ({
    name,
    Icon,
    onChangeParent,
    min = 0,
    max = 100,
}: IImageOptionsSliderProps): JSX.Element => {
    const [value, setValue] = useState<
        number | string | Array<number | string>
    >(30);

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            return;
        }
        console.log({ newValue });
        onChangeParent?.(name.toLowerCase(), newValue);
        setValue(newValue);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue =
            event.target.value === '' ? min : Number(event.target.value);
        onChangeParent?.(name.toLowerCase(), newValue);
        setValue(newValue);
    };

    const handleBlur = () => {
        if (value < min) {
            setValue(min);
        } else if (value > max) {
            setValue(max);
        }
    };

    // TODO: bug with max blur
    return (
        <SImageSliderOptionsContainer>
            <SImageSliderOptionsItem>
                <SSliderName>{name}</SSliderName>
            </SImageSliderOptionsItem>
            <SImageSliderOptionIcon>
                <Icon />
            </SImageSliderOptionIcon>
            <SImageSliderOptions>
                <Slider
                    value={typeof value === 'number' ? value : min}
                    onChange={handleSliderChange}
                    aria-labelledby="input-slider"
                    min={min}
                    max={max}
                    step={1}
                />
            </SImageSliderOptions>

            <SImageSliderOptions>
                <Input
                    value={value}
                    size="small"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    inputProps={{
                        step: 1,
                        min: min,
                        max: max,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                    }}
                />
            </SImageSliderOptions>
        </SImageSliderOptionsContainer>
    );
};
