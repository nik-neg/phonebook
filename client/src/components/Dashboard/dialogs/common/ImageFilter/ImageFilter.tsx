import { IImageFilterProps } from './types';
import {
    SFilterPanelItem,
    SImageOptionContainer,
    SUploadedImage,
    SUploadedImageContainer,
    SUploadedImageWrapper,
} from './ImageFilter.styles';
import {
    ImageOptionsSlider,
    SCheckboxOptionIcon,
    SCheckboxOptionsContainer,
    SCheckboxOptionsItem,
    SCheckBoxRow,
    SSliderName,
} from '../ImageOptionsSlider';
import { IoIosColorPalette, MdLensBlur } from 'react-icons/all';
import * as React from 'react';
import { SyntheticEvent, useState } from 'react';
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
        onFilter?.({ ...filter, [name]: value });

        setFilter({ ...filter, [name]: value });
    };

    const handleChecked = (event: SyntheticEvent<Element, Event>) => {
        const inputElement = event.target as HTMLInputElement;
        setFilter({ ...filter, grayscale: inputElement.checked });
        onFilter?.({ ...filter, grayscale: inputElement.checked });
    };

    return (
        <SImageOptionContainer>
            <SUploadedImageContainer>
                {isFetchingImage ? (
                    <CircularProgress />
                ) : (
                    <SUploadedImageWrapper>
                        <SUploadedImage src={contact?.imageFile?.toString()} />
                    </SUploadedImageWrapper>
                )}
            </SUploadedImageContainer>

            <SCheckboxOptionsContainer>
                <SCheckBoxRow>
                    <SCheckboxOptionsItem>
                        <SSliderName>{'Grayscale'}</SSliderName>
                    </SCheckboxOptionsItem>
                    <SCheckboxOptionsItem>
                        <SCheckboxOptionIcon>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label=""
                                    value={filter.grayscale}
                                    checked={filter.grayscale}
                                    onChange={handleChecked}
                                />
                            </FormGroup>
                        </SCheckboxOptionIcon>
                    </SCheckboxOptionsItem>
                </SCheckBoxRow>
            </SCheckboxOptionsContainer>

            <SFilterPanelItem>
                <ImageOptionsSlider
                    name={'Blur'}
                    Icon={MdLensBlur}
                    onChangeParent={handleFilterChange}
                    parentValue={filter.blur}
                    min={0}
                    max={1000}
                />
            </SFilterPanelItem>

            <SFilterPanelItem>
                <ImageOptionsSlider
                    name={'Saturation'}
                    Icon={IoIosColorPalette}
                    parentValue={filter.saturation}
                    onChangeParent={handleFilterChange}
                />
            </SFilterPanelItem>
        </SImageOptionContainer>
    );
};
