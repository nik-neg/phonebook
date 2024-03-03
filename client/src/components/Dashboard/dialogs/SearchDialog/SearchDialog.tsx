import * as React from 'react';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { ISearchDialogProps } from './types';
import { SearchBar } from '../common/SearchBar/SearchBar';

export const SearchDialog = ({
    open,
    onClose,
    onSearch,
}: ISearchDialogProps): JSX.Element => {
    const [content, setContent] = useState<string>('');
    const handleClose = async () => {
        onClose();
    };

    const handleSearch = (value: string) => {
        setContent(value);
        onSearch?.(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <SearchBar onSearch={handleSearch} />
        </Dialog>
    );
};
