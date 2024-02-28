import { CSSProperties } from 'styled-components';

export interface ITheme {
    palette: {
        primary: {
            main: string;
        };
        secondary: {
            main: string;
        };
    };
    typography: {
        fontFamily?: CSSProperties['fontFamily'] | undefined;
    };
}
