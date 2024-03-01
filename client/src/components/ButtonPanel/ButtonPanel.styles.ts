import styled from 'styled-components';
import Button from '@mui/material/Button';

export const SButtonPanelWrapper = styled.div`
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    z-index: 2;
`;

interface SButtonProps {
    fontFamily?: string;
}
export const SButton = styled(Button)<SButtonProps>`
    width: 6rem;
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
