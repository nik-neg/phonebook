import styled from 'styled-components';
import background from '../../../assets/mobile.jpg';
import { IContactListWrapper } from './types';

export const SContactListPanel = styled.div`
    display: flex;
    flex-direction: column;
`;

export const SContactListContainerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 365px;
    height: 760px;
    background: black;
    border-radius: 10px;

    &:hover {
        -moz-box-shadow: 0 0 10px 10px #bcd4e6;
        -webkit-box-shadow: 0 0 10px 10px #bcd4e6;
        box-shadow: 0 0 10px 10px #bcd4e6;
    }
`;
export const SContactListContainer = styled.div`
    padding-top: 0.25rem;
    display: flex;
    justify-content: center;
    width: 350px;
    border: 3px solid rgba(196, 196, 196, 0.67);
    border-bottom: none;
    border-radius: 15px;
    background: url(${background}) repeat;
    &::-webkit-scrollbar {
        display: none;
    }
`;

export const SContactCardsContainer = styled.div`
    height: 675px;
    border-radius: 10px 10px 0px 10px;
`;

export const SContactListWrapper = styled.div<IContactListWrapper>`
    width: 100%;
    //box-shadow: 10px 5px 5px black;
    border: 3px solid transparent;
    border-bottom: none;
    border-radius: 12px;

    //overflow-x: hidden;
    //overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }

    width: 100%;
    position: relative;
`;

export const SButtonPanelWrapper = styled.div`
    display: flex;
    justify-content: center;
    overflow: hidden;
`;

export const SButtonPanel = styled.div`
    display: flex;
    justify-content: center;
    height: 3.85rem; // change to 4-5 ?
    width: 100%;
    background: black;
    border-right: 4px solid black;
    border-left: 4px solid black;
    border-bottom: 4px solid black;
    border-radius: 0px 0px 10px 10px;
`;

export const SButtonWrapper = styled.div`
    padding: 0.5rem 0.25rem 0.25rem 0.25rem;
`;

export const SAddButton = styled.button`
    width: 6rem;
    height: 3rem;
    border-radius: 10px;
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
