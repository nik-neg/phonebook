import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { ISearchDialogProps } from './types';
import { SearchBar } from '../common/SearchBar/SearchBar';

export const SearchDialog = (props: ISearchDialogProps): JSX.Element => {
    const { onClose, selectedValue, open, onEdit, onSearch } = props;

    const [content, setContent] = React.useState<string>('');
    const handleClose = () => {
        // fetch contacts
        onClose();
    };

    const handleSearch = () => {
        onSearch?.(content);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <SearchBar onSearch={handleSearch} content={content} />
        </Dialog>
    );
};
