import React, { ChangeEvent, useState } from 'react';
import { TextField } from '@mui/material';
import { ISearchBarProps } from './types';

export const SearchBar = ({ onSearch, content }: ISearchBarProps) => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchChange = (
        event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setSearchValue(event.target.value);
        onSearch(event.target.value);

        console.log({ searchValue });
    };

    return (
        <TextField
            value={searchValue}
            onChange={handleSearchChange}
            fullWidth
        />
    );
};
