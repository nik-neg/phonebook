import React from 'react';
import { STextField, STextFieldWrapper } from './TextField.styles';
import { TextFieldProps } from './types';

export const TextField = ({
    hasInput,
    value,
    handleChange,
    ...otherProps
}: TextFieldProps) => {
    return (
        <STextFieldWrapper>
            <STextField
                $hasInput={hasInput}
                value={value}
                onChange={handleChange}
                fullWidth
                {...otherProps}
            />
        </STextFieldWrapper>
    );
};
