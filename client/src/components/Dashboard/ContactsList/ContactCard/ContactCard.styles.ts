import styled from 'styled-components';
import { IContactCardPhotoProps } from './types';

export const SContactCardContainer = styled.div`
    padding: 1rem;

    :last-of-type {
        opacity: 0;
    }
`;

export const SContactCardWrapper = styled.div`
    height: 100px;
    width: 300px;
    cursor: pointer;
    background: #faf5ef;
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid saddlebrown;
    border-radius: 10px;
`;

export const SContactInfoWrapper = styled.div`
    display: flex;
    align-items: center;
    padding-left: 0.5rem;
    height: 100px;
    width: 100px;
`;

export const SContactCardPhoto = styled.img<IContactCardPhotoProps>`
    width: 75%;
    height: 75%;
    border-radius: 50%;
    border: 1px solid black;
    src: url(${(props) => props.src});
`;

export const SNameWrapper = styled.div`
    display: flex;
`;

export const SContactNickName = styled.div`
    padding-left: 0.5rem;
    font-size: 1.5rem;
    width: 200px;
    padding-top: 3rem;
    display: flex;
    justify-content: flex-end;
`;

export const SContactName = styled.div`
    padding-left: 0.5rem;
    font-size: 1.5rem;
    width: 200px;
    padding-top: 3rem;
    display: flex;
    justify-content: flex-end;
`;
