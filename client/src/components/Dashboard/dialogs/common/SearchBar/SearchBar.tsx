import React, { ChangeEvent, useState } from 'react';
import { ISearchBarProps } from './types';
import { TextField } from '../../../../common/TextField';

export const SearchBar = ({ onSearch }: ISearchBarProps) => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchChange = (
        event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setSearchValue(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <TextField
            hasInput={!!searchValue}
            value={searchValue}
            handleChange={handleSearchChange}
        />
    );
};
