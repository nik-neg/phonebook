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
    border: 4px solid black;
    border-radius: 10px 10px 0px 10px;
`;

export const STimePanelWrapper = styled.div``;

export const STimePanelYear = styled.div`
    position: absolute;
    color: white;
    font-size: 1.5rem;
    padding-top: 38rem;
    padding-left: 7.25rem;
    text-align: center;
    text-align: center;
`;
export const STimePanelTime = styled.div`
    position: absolute;
    color: white;
    font-size: 1.5rem;
    padding-top: 40rem;
    padding-left: 8rem;
    text-align: center;
`;

export const SContactListWrapper = styled.div`
    width: 100%;
    box-shadow: 10px 5px 5px black;
    border: 3px solid #262626;
    border-radius: 12px;
    border-color: rgba(196, 196, 196, 0.67);
    background: url(${background}) no-repeat center center fixed;

    overflow: hidden;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }

    width: 100%;
    position: relative;

    &:after {
        content: '';
        top: 0;
        transform: translateX(100%);
        width: 225px;
        height: 680px;
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
    }
`;

export const SAddButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    position: sticky;
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
