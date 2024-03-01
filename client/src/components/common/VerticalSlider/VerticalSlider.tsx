import { KeyboardEvent } from 'react';
import { updated, useAppDispatch } from '../../../store';
import { SBox, SliderContainer } from './VerticalSlider.styles';

export const VerticalSlider = () => {
    const dispatch = useAppDispatch();
    function preventHorizontalKeyboardNavigation(event: KeyboardEvent) {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
        }
    }

    const handleChange = (e: Event, value: number | number[]) => {
        dispatch(updated(value));
    };

    return (
        <SBox>
            <SliderContainer
                sx={{
                    '& input[type="range"]': {
                        WebkitAppearance: 'slider-vertical',
                    },
                }}
                onChange={handleChange}
                size={'small'}
                min={20}
                step={10}
                orientation="vertical"
                defaultValue={30}
                aria-label="shineTimer"
                valueLabelDisplay="auto"
                onKeyDown={preventHorizontalKeyboardNavigation}
            />
        </SBox>
    );
};
