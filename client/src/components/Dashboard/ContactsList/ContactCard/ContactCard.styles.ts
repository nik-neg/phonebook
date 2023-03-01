import styled from 'styled-components';
import { IContactCardPhotoProps } from './types';

export const SContactCardContainer = styled.div`
    padding: 1rem;
    z-index: 1;
    //:last-of-type {
    //    opacity: 0;
    //}
`;

export const SContactCardWrapper = styled.div`
    cursor: pointer;
    background: aliceblue;
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 2px solid black;
    border-radius: 10px;

    &:hover {
        opacity: 0.9;
        background: aliceblue;
    }
`;

export const SContactInfoWrapper = styled.div`
    display: flex;
    align-items: center;
    padding-left: 0.5rem;
    height: 100px;
    width: 100px;
`;

export const SContactCardPhoto = styled.img<IContactCardPhotoProps>`
    display: flex;
    width: 75px;
    height: 75px;
    border-radius: 75%;
    border: 1px solid black;
    src: url(${(props) => props.src});
`;

export const SNameWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 200px;
`;

export const SAddress = styled.div`
    padding-top: 0.5rem;
    display: flex;
    justify-content: flex-end;
`;

export const SContactNickName = styled.div`
    padding-left: 0.5rem;
    font-size: 1.5rem;
    width: 200px;
    padding-top: 3rem;
`;

export const SContactName = styled.div`
    padding-left: 0.5rem;
    font-size: 1.5rem;
    width: 190px;
    padding-top: 3rem;
    justify-content: flex-end;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
