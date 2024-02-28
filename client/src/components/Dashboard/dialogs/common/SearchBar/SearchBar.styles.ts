import TextField from '@mui/material/TextField';
import styled from 'styled-components';

export const STextFieldWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
    top: 0;
`;
export const STextField = styled(TextField)`
    && {
        width: 300px;
        background-color: white;
        border-radius: 20px;
        border-color: black;
        & .MuiOutlinedInput-root {
            border-radius: 20px;
            &.Mui-focused fieldset {
                border-color: black;
                border-radius: 20px;
            }
        }
    }
`;
