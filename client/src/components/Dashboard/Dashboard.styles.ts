import styled from 'styled-components';

export const SDashboardContainer = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(4, 25%);
    grid-template-rows: auto;
    grid-template-areas:
        'header header header header'
        'title title title title'
        'list list list list'
        'footer footer footer footer';
`;

export const SDashboardHeader = styled.div`
    grid-area: header;
`;
export const SDashboardTitle = styled.div`
    grid-area: title;
    justify-self: center;
`;
export const SDashboardList = styled.div`
    grid-area: list;
    justify-self: end;
    display: flex;
    flex-direction: column;
`;
export const SDashboardFooter = styled.div`
    grid-area: footer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
    height: 10vh;
`;

export const SAddButtonWrapper = styled.div`
    padding-top: 1rem;
    display: flex;
    justify-content: center;
`;

export const SAddButton = styled.button`
    width: 6rem;
    height: 3rem;
    border-radius: 10px;
`;

export const SIconWrapper = styled.div`
    padding-top: 0.25rem;
`;
