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
    box-shadow: 5px 2.5px 2.5px #262626;

    &:hover {
        -moz-box-shadow: 0 0 10px 10px #bcd4e6;
        -webkit-box-shadow: 0 0 10px 10px #bcd4e6;
        box-shadow: 0 0 10px 10px #bcd4e6;
    }
`;
export const SContactListContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 350px;
    border: 3px solid rgba(196, 196, 196, 0.67);
    border-radius: 15px;
    height: 760px;
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

    &:hover {
        cursor: pointer;
    }

    width: 100%;
    position: relative;

    ${(props) =>
        !props.contactsAreFetched &&
        !props.hover &&
        `
        &:after {
        content: '';
        top: -10px;
        transform: translateX(100%);
        width: 225px;
        height: 690px;
        position: absolute;
        z-index: 1;
        animation: slide 6.67s infinite;
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
            transform: translateX(-100%);
        }
        100% {
            transform: translateX(100%);
        }
    }`}
`;

export const SButtonPanelWrapper = styled.div`
    display: flex;
    justify-content: center;
    overflow: hidden;
`;

export const SButtonPanel = styled.div`
    display: flex;
    justify-content: center;
    height: 3.85rem;
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

export const SButton = styled.button`
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

    :hover {
        background: #e1e1e1;
        border: 2px solid #e1e1e1;
    }
`;

export const SIconWrapper = styled.div`
    padding-top: 0.25rem;
`;
