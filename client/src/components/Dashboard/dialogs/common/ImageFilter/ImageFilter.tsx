import { IImageFilterProps } from './types';
import {
    SFilterPanelItem,
    SImageOptionContainer,
    SUploadedImage,
    SUploadedImageWrapper,
} from './ImageFilter.styles';
import { ImageOptionsSlider } from '../ImageOptionsSlider';
import { IoIosColorPalette, MdLensBlur, RxShadowInner } from 'react-icons/all';
import { useState } from 'react';
import { IFilter } from '../../AddDialog';

export const ImageFilter = ({
    contact,
    onFilter,
}: IImageFilterProps): JSX.Element => {
    const [filter, setFilter] = useState<IFilter>({
        blur: 0,
        grayscale: 0,
        saturation: 0,
    });

    const handleFilterChange = (name: string, value: number) => {
        setFilter({ ...filter, [name]: value });
        onFilter?.(filter);

        console.log({ filter });
    };

    return (
        <SImageOptionContainer>
            <SUploadedImageWrapper>
                <SUploadedImage src={contact.imageFile.toString()} />
            </SUploadedImageWrapper>
            <SFilterPanelItem>
                <ImageOptionsSlider
                    name={'Grayscale'}
                    Icon={RxShadowInner}
                    onChangeParent={handleFilterChange}
                />
            </SFilterPanelItem>

            <SFilterPanelItem>
                <ImageOptionsSlider
                    name={'Blur'}
                    Icon={MdLensBlur}
                    onChangeParent={handleFilterChange}
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
