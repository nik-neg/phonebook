import styled from 'styled-components';
import Button from '@mui/material/Button';

export const SMuiColorInput = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 100%;
`;

export const SButtonPanelWrapper = styled.div`
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    z-index: 2;
`;

interface SearchPanelProps {
    searchBarWithoutButton?: boolean;
}

export const SButtonPanel = styled.div<SearchPanelProps>`
    display: grid;
    grid-template-areas: ${({ searchBarWithoutButton }) =>
        searchBarWithoutButton
            ? '"color add-button power-button slider"'
            : '"color add-button search-button power-button slider"'};

    grid-template-columns: ${({ searchBarWithoutButton }) =>
        searchBarWithoutButton
            ? '1fr 2fr 2fr 1fr'
            : '1fr minmax(20%, 4rem) minmax(20%, 4rem) minmax(20%, 4rem) 1fr;'};
    height: 4rem;
    width: 100%;
    background: black;
    border-right: 4px solid black;
    border-left: 4px solid black;
    border-bottom: 4px solid black;
    border-radius: 0px 0px 10px 10px;
`;

interface SButtonElementProps {
    area: string;
}
export const SButtonElement = styled.div<SButtonElementProps>`
    grid-area: ${({ area }) => area};
`;

export const SButtonWrapper = styled.div`
    padding: 0.5rem;
`;

interface SButtonProps {
    fontFamily?: string;
}
export const SButton = styled(Button)<SButtonProps & SearchPanelProps>`
    width: ${({ searchBarWithoutButton }) =>
        searchBarWithoutButton ? '6rem' : '100%'};
    height: 3rem;
    border-radius: 10px;
    cursor: pointer;

    background: rgb(240, 240, 240);
    background: linear-gradient(
        90deg,
        rgba(240, 240, 240, 1) 0%,
        rgba(111, 111, 111, 1) 35%,
        rgba(111, 111, 111, 0.9402135854341737) 52%,
        rgba(111, 111, 111, 0.9402135854341737) 94%
    );
    opacity: 0.9;

    && {
        text-transform: none;
        transition: none;
        color: black;
        font-size: 14px;
        font-family: "'Crimson Pro', serif, 'Mochiy Pop One', sans-serif";

        border: 2px solid rgba(111, 111, 111, 1);
        border-color: rgba(111, 111, 111, 0.9402135854341737)
            rgba(35, 35, 35, 1) rgba(35, 35, 35, 1)
            rgba(111, 111, 111, 0.9402135854341737);

        &:hover {
            background: #e1e1e1;
            border: 2px solid #e1e1e1;
        }
    }
`;

export const SButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

export const SButtonRow = styled.div`
    display: flex;
    justify-content: center;
`;

export const SVerticalSliderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const SVerticalSliderWrapper = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
