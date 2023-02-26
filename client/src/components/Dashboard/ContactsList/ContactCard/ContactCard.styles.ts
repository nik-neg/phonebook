import styled from 'styled-components';
import { IContactCardPhotoProps } from './types';

export const SContactCardContainer = styled.div`
    padding: 1rem;
`;

export const SContactCardWrapper = styled.div`
    height: 100px;
    width: 300px;
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
    height: 75px;
    width: 75px;
`;
export const SContactCardPhoto = styled.img<IContactCardPhotoProps>`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    src: url(${(props) => props.src});
`;

export const SContactNickName = styled.div`
    padding-left: 0.5rem;
    font-size: 1.5rem;
`;

export const SContactFirstName = styled.div`
    padding-left: 0.5rem;
    font-size: 1.5rem;
`;

export const SContactLastName = styled.div`
    padding-left: 0.5rem;
    font-size: 1.5rem;
`;
