import styled from 'styled-components';

interface SDividerProps {
    width: number;
}
export const SDivider = styled.div<SDividerProps>`
    border-bottom: 2px solid whitesmoke;
    height: 10px;
    opacity: 0.55;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${({ width }) => `${width}%`};
`;
