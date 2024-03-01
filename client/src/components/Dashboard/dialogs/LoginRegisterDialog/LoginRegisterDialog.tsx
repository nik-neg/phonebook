import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { DialogCommonProps } from '../types';
import { TextField } from '../../../common/TextField';

export const LoginRegisterDialog = ({
    open,
    onClose,
}: DialogCommonProps): JSX.Element => {
    const handleClose = async () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <TextField
                hasInput={true}
                value={'test'}
                handleChange={() => console.log()}
            />
        </Dialog>
    );
};
