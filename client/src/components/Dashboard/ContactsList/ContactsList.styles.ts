import styled from 'styled-components';
import background from '../../../assets/mobile.jpg';

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
    height: 695px;
    background: black;
    border-radius: 15px 15px 0 0;
`;

interface IContactListWrapper {
    contactsAreFetched: boolean;
    shineTimer: number;
    colorValue: number[];
}
export const SContactListContainerPanel = styled.div<IContactListWrapper>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 680px;
    width: 350px;
    background: url(${background}) repeat;
    border: 3px solid rgba(196, 196, 196, 0.67);
    border-radius: 15px;
    overflow: hidden;
    position: relative;

    ${({ contactsAreFetched, shineTimer, colorValue }) =>
        !contactsAreFetched &&
        `
        &:after {
        content: '';
        top: 0px;
        left: -30px;
        transform: translateX(100%);
        width: 50px;
        height: 680px;
        position: absolute;
        z-index: 1;
        animation: slide ${shineTimer}s infinite;
        background: linear-gradient(
            to right,
            rgba(${colorValue[0]}, ${colorValue[1]}, ${colorValue[2]}, 0) 0%,
            rgba(${colorValue[0]}, ${colorValue[1]}, ${colorValue[2]}, 0.8) 50%,
            rgba(${colorValue[0]}, ${colorValue[1]}, ${colorValue[2]}, 0) 99%,
            rgba(${colorValue[0]}, ${colorValue[1]}, ${colorValue[2]}, 0) 100%
        );
    }
    @keyframes slide {
        0% {
            transform: translateX(-25%);
        }
        50% {
            transform: translateX(735%);
        }
        100% {
            transform: translateX(-25%);
        }
    }`}
`;

export const SearchBarContainer = styled.div`
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    position: relative;
    z-index: 2;
`;

export const SContactListContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;

    border-radius: 0px 0px 15px 15px;
    border: none;
    &::-webkit-scrollbar {
        display: none;
    }
    overflow: auto;
`;

export const SDividerWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

export const SContactCardsContainer = styled.div`
    height: 625px;
    border-radius: 10px 10px 0px 10px;
`;

export const SContactListWrapper = styled.div`
    width: 100%;
    height: 790px;
    border: 3px solid transparent;
    border-bottom: none;
    border-radius: 12px;

    &::-webkit-scrollbar {
        display: none;
    }

    &:hover {
        cursor: pointer;
    }

    position: relative;
`;
