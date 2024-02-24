import usePlacesAutocomplete from 'use-places-autocomplete';
import * as React from 'react';
import { ChangeEvent, useRef } from 'react';
import {
    SAddressAutoComplete,
    SContentElement,
    SContentElementWrapper,
    SContentSuggestions,
    SResultSmall,
    SResultStrong,
    SSAddressAutoCompleteWrapper,
} from './AddressAutoComplete.styles';
import { AddressAutoCompleteProps, InputAdornmentWrapperProps } from './types';
import { ONE_REM } from '../Spacer/constants';
import { Spacer } from '../Spacer';
import { InputAdornment } from '@mui/material';
import { FiSearch } from 'react-icons/all';
import { noop } from 'lodash-es';

export const InputAdornmentWrapper = ({
    color,
    ...otherProps
}: InputAdornmentWrapperProps) => {
    return (
        <InputAdornment style={{ ...otherProps }} position="start">
            <FiSearch size={20} color={color} />
        </InputAdornment>
    );
};

export const AddressAutoCompleteWithAdornment = (props: any) => {
    return (
        <SAddressAutoComplete
            {...props}
            sx={{
                input: {
                    color: 'black',
                    '&::placeholder': {
                        opacity: 0.9,
                    },
                },
            }}
            InputProps={{
                ...props.InputProps,
                startAdornment: (
                    <InputAdornmentWrapper width={'14%'} color={'#343ebe'} />
                ),
            }}
        />
    );
};

export const AddressAutoComplete = ({
    isSuggestionsVisible,
    handleSetValue,
    formFieldName,
}: AddressAutoCompleteProps) => {
    const handlePlaces = () => {
        noop();
    };
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        callbackName: 'handlePlaces',
        requestOptions: {
            /* Define search scope here */
        },
        debounce: 300,
    });
    const ref = useRef<HTMLDivElement | null>(null);

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        // Update the keyword of the input element
        setValue(e?.target?.value);
    };

    const handleSelect =
        ({ description }: { description: string }) =>
        () => {
            // When the user selects a place, we can replace the keyword without request data from API
            // by setting the second parameter to "false"
            setValue(description, false);
            clearSuggestions();
            handleSetValue(formFieldName, description);
        };

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
                <SContentElementWrapper>
                    <SContentElement
                        key={place_id}
                        onClick={handleSelect(suggestion)}
                    >
                        <SResultStrong>{main_text}</SResultStrong>
                        <SResultSmall>{secondary_text}</SResultSmall>
                    </SContentElement>
                </SContentElementWrapper>
            );
        });

    return (
        <SSAddressAutoCompleteWrapper ref={ref}>
            <AddressAutoCompleteWithAdornment
                value={value}
                onChange={handleInput}
                disabled={!ready}
                placeholder="Search for address"
                role="searchbox"
            />
            {status === 'OK' && (
                <>
                    <Spacer height={ONE_REM} />
                    <SContentSuggestions>
                        {renderSuggestions()}
                    </SContentSuggestions>
                </>
            )}
        </SSAddressAutoCompleteWrapper>
    );
};
