import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { ISearchDialogProps } from './types';
import { SearchBar } from '../common/SearchBar/SearchBar';

export const SearchDialog = (props: ISearchDialogProps): JSX.Element => {
    const { open, onClose, onSearch } = props;

    const [content, setContent] = React.useState<string>('');
    const handleClose = async () => {
        onClose();
    };

    const handleSearch = (value: string) => {
        setContent(value);
        onSearch?.(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <SearchBar onSearch={handleSearch} content={content} />
        </Dialog>
    );
};
