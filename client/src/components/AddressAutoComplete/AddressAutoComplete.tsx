import usePlacesAutocomplete from 'use-places-autocomplete';
import * as React from 'react';
import { ChangeEvent, useRef } from 'react';
import {
    SAddressAutoComplete,
    SAddressAutoCompleteWrapper,
    SContentElement,
    SContentElementWrapper,
    SContentSuggestions,
    SDataListCountries,
    SInput,
    SInputWrapper,
    SOption,
    SResultSmall,
    SResultStrong,
} from './AddressAutoComplete.styles';
import { AddressAutoCompleteProps, InputAdornmentWrapperProps } from './types';
import { ONE_REM } from '../common/Spacer/constants';
import { Spacer } from '../common/Spacer';
import { InputAdornment } from '@mui/material';
import { FiSearch } from 'react-icons/all';
import { shouldActivate } from '../../utils';
import { COUNTRIES } from './constants';

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
                    <InputAdornmentWrapper
                        width={'2rem'}
                        color={'rgba(64,58,232,0.94)'}
                    />
                ),
            }}
        />
    );
};

export const AddressAutoComplete = ({
    portalId,
    formFieldName,
    handleSetValue,
    onHandleSuggestionsVisible,
}: AddressAutoCompleteProps) => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        callbackName: '',
        requestOptions: {
            /* Define search scope here */
        },
        debounce: 300,
    });
    const ref = useRef<HTMLDivElement | null>(null);

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        // Update the keyword of the input element
        setValue(e?.target?.value);
        handleSetValue(formFieldName, e?.target?.value);
    };

    const handleSelect =
        ({ description }: { description: string }) =>
        () => {
            setValue(description, false);
            clearSuggestions();
            handleSetValue(formFieldName, description);
            onHandleSuggestionsVisible(portalId, false);
        };

    const renderSuggestions = () =>
        data.map((suggestion, index) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
                <SContentElementWrapper key={place_id}>
                    <SContentElement onClick={handleSelect(suggestion)}>
                        <SResultStrong>{main_text}</SResultStrong>
                        <SResultSmall>{secondary_text}</SResultSmall>
                    </SContentElement>
                </SContentElementWrapper>
            );
        });

    return (
        <SAddressAutoCompleteWrapper ref={ref}>
            {shouldActivate(import.meta.env.VITE_SHOULD_USE_LOCATION) ? (
                <>
                    <AddressAutoCompleteWithAdornment
                        value={value}
                        onChange={handleInput}
                        disabled={!ready}
                        placeholder="Search for address"
                        role="searchbox"
                        list="countrydata"
                        id="country"
                        name="country"
                        autoComplete="off"
                    />
                    {status === 'OK' && (
                        <>
                            <Spacer height={ONE_REM} />
                            <SContentSuggestions>
                                {renderSuggestions()}
                            </SContentSuggestions>
                        </>
                    )}
                </>
            ) : (
                <>
                    <SDataListCountries id="countrydata">
                        {COUNTRIES.map((country, index) => (
                            <SOption key={index.toString() + country}>
                                {country}
                            </SOption>
                        ))}
                    </SDataListCountries>
                    <SInputWrapper>
                        <SInput
                            value={value}
                            onChange={handleInput}
                            disabled={!ready}
                            placeholder="Search for address"
                            role="searchbox"
                            list="countrydata"
                            id="country"
                            name="country"
                            autoComplete="off"
                        />
                    </SInputWrapper>
                </>
            )}
        </SAddressAutoCompleteWrapper>
    );
};
