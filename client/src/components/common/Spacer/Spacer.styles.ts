import styled from 'styled-components';
import { SpacerProps } from './types';

export const Spacer = styled.div<SpacerProps>`
    padding-top: ${({ height }) => height}px;
`;
