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
    border: none;
    border-radius: 20px;
    ${({ isSubmit }: InputProps) =>
        isSubmit &&
        `
          padding: 0.5rem 1rem;
          background: rgb(240, 240, 240);
          background: linear-gradient(
              90deg,
              rgba(240, 240, 240, 1) 0%,
              rgba(111, 111, 111, 1) 35%,
              rgba(111, 111, 111, 0.9402135854341737) 52%,
              rgba(111, 111, 111, 0.9402135854341737) 94%
          );
          color: black;
          border: 2px solid rgba(111, 111, 111, 1);
          border-color: rgba(111, 111, 111, 0.9402135854341737)
            rgba(35, 35, 35, 1) rgba(35, 35, 35, 1)
            rgba(111, 111, 111, 0.9402135854341737);
          border-radius: 20px;
          cursor: pointer;
          transition: background-color 0.3s;
          font-family: "'Crimson Pro', serif, 'Mochiy Pop One', sans-serif";
          
        
          &:hover {
            text-transform: none;
            transition: none;
            background: #e1e1e1;
            border: 2px solid #e1e1e1;
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
