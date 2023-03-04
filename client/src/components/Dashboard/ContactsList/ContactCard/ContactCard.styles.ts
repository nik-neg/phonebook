import styled from 'styled-components';

export const SContactCardContainer = styled.div`
    padding: 1rem;
    z-index: 1;
`;

export const SContactCardWrapper = styled.div`
    cursor: pointer;
    opacity: 0.75;
    background: aliceblue;
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 2px solid black;
    border-radius: 10px;
    box-shadow: 5px 2.5px 2.5px #262626;
    position: relative;
    z-index: 2;

    &:hover {
        opacity: 1;
        background: aliceblue;
        border-color: aliceblue;
    }
`;

export const SContactInfoWrapper = styled.div`
    display: flex;
    align-items: center;
    padding-left: 0.5rem;
    height: 100px;
    width: 100px;
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
