import styled from 'styled-components';
import Dialog from '@mui/material/Dialog';

export const SDialog = styled(Dialog)`
    && .MuiPaper-root {
        border-radius: 20px;
        border: 2px solid black;
        background: transparent;
    }
`;

export const AuthContainer = styled.div`
    height: 100%;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
`;

export const SWelcomeText = styled.h1`
    color: #bcd4e6;
`;
export const AuthFormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 15px;
`;

export const AuthForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

interface InputProps {
    isSubmit?: boolean;
    disabled?: boolean;
}

export const Input = styled.input<InputProps>`
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    ${({ isSubmit }: InputProps) =>
        isSubmit &&
        `
          padding: 0.5rem 1rem;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
        
          &:hover {
            background-color: #0056b3;
          }`};
`;

export const SWarningSpan = styled.span`
    color: #ff003b;
    font-size: 0.8rem;
    text-align: center;
`;

export const SLink = styled.a`
    font-size: 0.8rem;
    cursor: pointer;
    color: white;

    &:hover {
        color: #bcd4e6;
    }
`;
