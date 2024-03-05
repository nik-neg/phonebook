import styled from 'styled-components';

export const SContactCardContainer = styled.div`
    padding: 1rem;
    z-index: 1;
`;

interface SContactCardWrapperProps {
    isSkeleton?: boolean;
}
export const SContactCardWrapper = styled.div<SContactCardWrapperProps>`
    cursor: pointer;
    opacity: ${({ isSkeleton }) => (isSkeleton ? 1 : 0.75)};
    background: aliceblue;
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 2px solid black;
    border-radius: 10px;
    box-shadow: 5px 2.5px 2.5px #262626;
    position: relative;
    z-index: 2;

    &:hover {
        opacity: 1;
        background: aliceblue;
        border-color: aliceblue;
    }
`;

export const SContactInfoWrapper = styled.div`
    display: flex;
    align-items: center;
    padding-left: 0.5rem;
    display: grid;
    grid-template-areas: 'image details';
    height: 100px;
    width: 100px;
`;

export const SAvatar = styled.div`
    grid-area: image;
`;

export const SDetailsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 200px;
    grid-area: details;
`;

export const SAddress = styled.div`
    width: 100%;
    padding-top: 0.5rem;
    color: black;
    text-align: end;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const SContactName = styled.div`
    padding-left: 0.5rem;
    font-size: 1.5rem;
    width: 200px;
    padding-top: 3rem;
    color: black;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
