import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IAddDialogProps } from './types';
import { SUploadButtonWrapper } from '../UploadButton/UploadButton.styles';
import { UploadButton } from '../UploadButton/UploadButton';
import {
    SUploadImage,
    SUploadImageWrapper,
} from '../UpdateDialog/UpdateDialog.styles';

export const AddDialog = (props: IAddDialogProps): JSX.Element => {
    const { onClose, selectedValue, open, onEdit } = props;

    const handleClose = () => {
        onClose?.();
    };

    const [imagePath, setImagePath] = useState<string | ArrayBuffer>('');

    const handleUploadImage = (imagePath: string | ArrayBuffer) => {
        setImagePath(imagePath);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Contact</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please type into the form:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="First Name"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Last Name"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nickname"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Address"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Phone Numbers"
                        fullWidth
                        variant="standard"
                    />
                    <SUploadButtonWrapper>
                        <UploadButton onUpload={handleUploadImage} />
                    </SUploadButtonWrapper>
                    {imagePath && (
                        <SUploadImageWrapper>
                            <SUploadImage src={imagePath.toString()} />
                        </SUploadImageWrapper>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
