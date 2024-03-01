import { ChangeEvent } from 'react';

export interface TextFieldProps {
    hasInput: boolean;
    value: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
