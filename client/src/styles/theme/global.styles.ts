import { createGlobalStyle } from 'styled-components';
import background from '../../assets/lobby.jpeg';

export const GlobalStyle = createGlobalStyle`
  html {
    background: url(${background}) no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
`;
