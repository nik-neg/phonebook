import { createTheme } from '@mui/material';
import { ITheme } from './types';

export const theme: ITheme = createTheme({
    typography: {},
    components: {
        MuiButton: {
            styleOverrides: {
                root: {},
            },
        },
    },
});
