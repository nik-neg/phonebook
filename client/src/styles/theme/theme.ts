import { createTheme } from '@mui/material';
import { ITheme } from './types';

export const theme: ITheme = createTheme({
    typography: {
        fontFamily: [
            '"Crimson Pro"',
            'serif',
            '"Mochiy Pop One"',
            'sans-serif',
        ].join(','),
    },
    palette: {
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#ffffff',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {},
            },
        },
    },
});
