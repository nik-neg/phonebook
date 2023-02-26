import styled from 'styled-components';

export const SContactCardWrapper = styled.div`
    padding: 1rem;
`;

export const SContactCardPhotoWrapper = styled.div`
    height: 100px;
    width: 300px;
`;
export const SContactCardPhoto = styled.img`
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    src: url(${(props) => props.src});
`;

export const SContactNickName = styled.div``;

export const SContactFirstName = styled.div``;

export const SContactLastName = styled.div``;
