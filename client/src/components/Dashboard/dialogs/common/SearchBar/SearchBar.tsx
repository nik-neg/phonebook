import React, { ChangeEvent, useState } from 'react';
import { ISearchBarProps } from './types';
import { STextField, STextFieldWrapper } from './SearchBar.styles';

export const SearchBar = ({ onSearch }: ISearchBarProps) => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchChange = (
        event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setSearchValue(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <STextFieldWrapper>
            <STextField
                value={searchValue}
                onChange={handleSearchChange}
                hasInput={!!searchValue}
                fullWidth
            />
        </STextFieldWrapper>
    );
};
