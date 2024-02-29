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
    box-shadow: 5px 2.5px 5px #262626;
    border-radius: 15px;
    &:hover {
        -moz-box-shadow: 0 0 10px 10px #bcd4e6;
        -webkit-box-shadow: 0 0 10px 10px #bcd4e6;
        box-shadow: 0 0 10px 10px #bcd4e6;
    }
`;

export const SDashboardHeader = styled.div`
    grid-area: header;
`;

export const SDashboard = styled.div`
    grid-area: list;
    justify-self: center;
    display: flex;
    flex-direction: column;
`;
export const SDashboardFooter = styled.div`
    grid-area: footer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
`;
