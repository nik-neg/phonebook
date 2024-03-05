import styled from 'styled-components';

interface SContactCardSkeletonContainerProps {
    justifyContent?: string;
}
export const SContactCardSkeletonContainer = styled.div`
    display: flex;
    justify-content: ${({
        justifyContent,
    }: SContactCardSkeletonContainerProps) => justifyContent || 'center'};
`;
