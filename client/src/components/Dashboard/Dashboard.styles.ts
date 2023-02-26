import styled from 'styled-components';

export const SDashboardContainer = styled.div`
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
`;
export const SDashboardFooter = styled.div`
    grid-area: footer;
`;
