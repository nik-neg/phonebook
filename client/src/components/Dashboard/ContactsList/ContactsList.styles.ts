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

    ${({ contactsAreFetched }) =>
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
        animation: slide 12s infinite;
        /*
        CSS Gradient - complete browser support from http://www.colorzilla.com/gradient-editor/
        */
        background: -moz-linear-gradient(
            left,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.8) 50%,
            rgba(128, 186, 232, 0) 99%,
            rgba(125, 185, 232, 0) 100%
        ); /* FF3.6+ */
        background: -webkit-gradient(
            linear,
            left top,
            right top,
            color-stop(0%, rgba(255, 255, 255, 0)),
            color-stop(50%, rgba(255, 255, 255, 0.8)),
            color-stop(99%, rgba(128, 186, 232, 0)),
            color-stop(100%, rgba(125, 185, 232, 0))
        ); /* Chrome,Safari4+ */
        background: -webkit-linear-gradient(
            left,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.8) 50%,
            rgba(128, 186, 232, 0) 99%,
            rgba(125, 185, 232, 0) 100%
        ); /* Chrome10+,Safari5.1+ */
        background: -o-linear-gradient(
            left,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.8) 50%,
            rgba(128, 186, 232, 0) 99%,
            rgba(125, 185, 232, 0) 100%
        ); /* Opera 11.10+ */
        background: -ms-linear-gradient(
            left,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.8) 50%,
            rgba(128, 186, 232, 0) 99%,
            rgba(125, 185, 232, 0) 100%
        ); /* IE10+ */
        background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.8) 50%,
            rgba(128, 186, 232, 0) 99%,
            rgba(125, 185, 232, 0) 100%
        ); /* W3C */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#007db9e8',GradientType=1 ); /* IE6-9 */
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

export const SButtonPanel = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3.5rem;
    width: 100%;
    background: black;
    border-right: 4px solid black;
    border-left: 4px solid black;
    border-bottom: 4px solid black;
    border-radius: 0px 0px 10px 10px;
`;

export const SButtonWrapper = styled.div`
    padding: 0.5rem;
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
