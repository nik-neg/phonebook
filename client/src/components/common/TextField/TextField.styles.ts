import TextField from '@mui/material/TextField';
import styled from 'styled-components';

export const STextFieldWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
`;

interface STextFieldProps {
    $hasInput: boolean;
}
export const STextField = styled(TextField)<STextFieldProps>`
    ${({ $hasInput }) => $hasInput && `opacity: 1;`}

    :hover {
        opacity: 1;
    }

    && {
        width: 300px;
        background-color: aliceblue;
        border-radius: 20px;

        & .MuiOutlinedInput-root {
            border-radius: 20px;

            &.Mui-focused fieldset {
                border-color: white;
                border-radius: 20px;
            }
        }
    }
`;
