import styled from 'styled-components';
import Slider from '@mui/material/Slider';

export const SBox = styled.div`
    height: 30px;
`;

export const SliderContainer = styled(Slider)({
    // Target the thumb
    '& .MuiSlider-thumb': {
        // Remove box shadow
        boxShadow: 'none',
        // Additional customizations (e.g., background, border) can go here
        '&:hover, &.Mui-focusVisible': {
            // Remove or customize the box shadow on hover and focus
            boxShadow: 'none',
        },
        '&.Mui-active': {
            // Remove or customize the box shadow when active (clicked)
            boxShadow: 'none',
        },
    },
    '& .MuiSlider-thumbSizeSmall': {
        color: 'rgba(111, 111, 111, 1)',
        border: '2px solid rgba(111, 111, 111, 0.94)',
        borderColor:
            'rgba(111, 111, 111, 0.9402135854341737)' +
            'rgba(35, 35, 35, 1) rgba(35, 35, 35, 1)' +
            'rgba(111, 111, 111, 0.9402135854341737);',
        background:
            'linear-gradient(90deg, rgba(240, 240, 240, 1) 0%, rgba(111, 111, 111, 1) 35%, rgba(111, 111, 111, 0.94) 52%, rgba(111, 111, 111, 0.94) 94%)',
    },
    '&': {
        color: 'rgba(111, 111, 111, 1)',
        borderColor:
            'rgba(111, 111, 111, 0.94), rgba(35, 35, 35, 1), rgba(35, 35, 35, 1), rgba(111, 111, 111, 0.94)',
    },
});
