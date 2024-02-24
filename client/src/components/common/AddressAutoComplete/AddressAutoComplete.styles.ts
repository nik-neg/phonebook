import styled from 'styled-components';
import TextField from '@mui/material/TextField';

export const SSAddressAutoCompleteWrapper = styled.div``;

export const SAddressAutoComplete = styled(TextField)`
    width: 100%;
    .MuiInputBase-root {
        font-size: 15px;
        color: black;
      &::placeholder {
        opacity: 1
      },
    }
`;

export const SContentSuggestions = styled.div`
    display: flex;
    flex-direction: column;
`;

export const SContentElementWrapper = styled.div`
    padding: 5px 0 5px 0;
`;

export const SResultStrong = styled.strong`
    padding-right: 0.5rem;
`;

export const SResultSmall = styled.small``;

export const SContentElement = styled.div`
    height: 40px;
    display: flex;
    align-items: center;
    cursor: pointer;
    border: 1px solid #d3d3d3;
    border-radius: 5px;
    font-size: 14px;
    padding: 2px;

    &:hover {
        background-color: #f5f5f5;
    }
`;
