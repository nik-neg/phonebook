import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { ISearchDialogProps } from './types';
import { SearchBar } from '../common/SearchBar/SearchBar';

export const SearchDialog = ({
    open,
    onClose,
    onSearch,
}: ISearchDialogProps): JSX.Element => {
    const handleClose = async () => {
        onClose();
    };

    const handleSearch = (value: string) => {
        onSearch?.(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <SearchBar onSearch={handleSearch} />
        </Dialog>
    );
};
