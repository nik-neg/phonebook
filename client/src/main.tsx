import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalStyle } from './styles/theme/global.styles';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from '@mui/material';
import { theme } from './styles/theme/theme';
import { UserProvider } from './store/context';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <UserProvider>
                    <App />
                </UserProvider>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);
