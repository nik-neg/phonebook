import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IUpdateDialogProps } from './types';
import { UploadButton } from '../common/UploadButton/UploadButton';
import { SUploadedImage, SUploadedImageWrapper } from './UpdateDialog.styles';
import { SUploadButtonWrapper } from '../common/UploadButton/UploadButton.styles';

export const UpdateDialog = ({
    selectedValue,
    open,
    onEdit,
    onClose,
}: IUpdateDialogProps): JSX.Element => {
    const {
        nickName,

        firstName,

        lastName,

        phoneNumbers,

        address,

        imageFile,
    } = selectedValue;

    const [imagePath, setImagePath] = useState<string | ArrayBuffer>(imageFile);

    const handleUploadImage = (imagePath: string | ArrayBuffer) => {
        setImagePath(imagePath);
    };

    const handleClickOpen = () => {};

    const handleClose = () => {
        onClose?.();
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Contact</DialogTitle>
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
                        value={firstName}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Last Name"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={lastName}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nickname"
                        fullWidth
                        variant="standard"
                        value={nickName}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Address"
                        fullWidth
                        variant="standard"
                        value={address}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Phone Numbers"
                        fullWidth
                        variant="standard"
                        value={phoneNumbers}
                    />
                    <SUploadButtonWrapper>
                        <UploadButton onUpload={handleUploadImage} />
                    </SUploadButtonWrapper>
                    {imagePath && (
                        <SUploadedImageWrapper>
                            <SUploadedImage src={imagePath.toString()} />
                        </SUploadedImageWrapper>
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
