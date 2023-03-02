import { IImageFilterProps } from './types';
import {
    SFilterPanelItem,
    SImageOptionContainer,
    SUploadedImage,
    SUploadedImageWrapper,
} from './ImageFilter.styles';
import {
    ImageOptionsSlider,
    SCheckboxOptionIcon,
    SCheckboxOptionsContainer,
    SCheckboxOptionsItem,
    SImageSliderOptions,
    SSliderName,
} from '../ImageOptionsSlider';
import { IoIosColorPalette, MdLensBlur } from 'react-icons/all';
import * as React from 'react';
import { useState } from 'react';
import { IFilter } from '../../AddDialog';
import {
    Checkbox,
    CircularProgress,
    FormControlLabel,
    FormGroup,
} from '@mui/material';

export const ImageFilter = ({
    contact,
    onFilter,
    isFetchingImage,
}: IImageFilterProps): JSX.Element => {
    const [filter, setFilter] = useState<IFilter>({
        grayscale: false,
        blur: 0,
        saturation: 0,
    });

    const handleFilterChange = (name: string, value: number) => {
        setFilter({ ...filter, [name]: value });
        onFilter?.(filter);

        console.log({ filter });
    };

    const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter({ ...filter, grayscale: event.target.checked });
    };

    return (
        <SImageOptionContainer>
            {isFetchingImage ? (
                <CircularProgress />
            ) : (
                <SUploadedImageWrapper>
                    <SUploadedImage src={contact.imageFile.toString()} />
                </SUploadedImageWrapper>
            )}

            <SCheckboxOptionsContainer>
                <SCheckboxOptionsItem>
                    <SSliderName>{'Grayscale'}</SSliderName>
                </SCheckboxOptionsItem>
                <SCheckboxOptionIcon>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label=""
                            value={filter.grayscale}
                            onChange={handleChecked}
                        />
                    </FormGroup>
                </SCheckboxOptionIcon>
                <SImageSliderOptions></SImageSliderOptions>

                <SImageSliderOptions></SImageSliderOptions>
            </SCheckboxOptionsContainer>

            <SFilterPanelItem>
                <ImageOptionsSlider
                    name={'Blur'}
                    Icon={MdLensBlur}
                    onChangeParent={handleFilterChange}
                    min={0.3}
                    max={1000}
                />
            </SFilterPanelItem>

            <SFilterPanelItem>
                <ImageOptionsSlider
                    name={'Saturation'}
                    Icon={IoIosColorPalette}
                    onChangeParent={handleFilterChange}
                />
            </SFilterPanelItem>
        </SImageOptionContainer>
    );
};
