import styled from 'styled-components';
import background from '../../../assets/mobile.jpg';

export const SContactListContainerWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 360px;
    height: 760px;
    background: black;
    border-radius: 10px;
`;
export const SContactListContainer = styled.div`
    padding-top: 0.25rem;
    display: flex;
    justify-content: center;
    width: 350px;
    height: 750px;
`;

export const SContactCardsContainer = styled.div`
    height: 675px;
`;

export const SContactListWrapper = styled.div`
    width: 100%;
    box-shadow: 5px 2.5px 2.5px #262626;
    background: url(${background}) no-repeat center center fixed;
    border: 3px solid #262626;
    border-radius: 12px;
    overflow: hidden;
    overflow-y: scroll;
    border-color: rgba(196, 196, 196, 0.67);
`;

export const SAddButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    position: sticky;
`;

export const SButtonPanel = styled.div`
    display: flex;
    justify-content: center;
    height: 4.5rem;
    width: 100%;
    background: #262626;
`;

export const SButtonWrapper = styled.div`
    padding: 0.75rem 0.25rem 0.25rem 0.25rem;
`;

export const SAddButton = styled.button`
    width: 6rem;
    height: 3rem;
    border-radius: 10px;
    border: 1px solid #e7e7e7;
    background: rgb(240, 240, 240);
    background: linear-gradient(
        90deg,
        rgba(240, 240, 240, 1) 0%,
        rgba(111, 111, 111, 1) 35%,
        rgba(111, 111, 111, 0.9402135854341737) 52%,
        rgba(111, 111, 111, 0.9402135854341737) 94%
    );
    opacity: 0.9;

    :hover {
        background: #e1e1e1;
        border: 2px solid #e1e1e1;
    }
`;

export const SIconWrapper = styled.div`
    padding-top: 0.25rem;
`;
