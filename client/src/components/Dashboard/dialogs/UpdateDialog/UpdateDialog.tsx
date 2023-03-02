import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ContactWithPhoneNumbersAsString, IUpdateDialogProps } from './types';
import { UploadButton } from '../common/UploadButton/UploadButton';
import { SUploadButtonWrapper } from '../common/UploadButton/UploadButton.styles';
import { ImageFilter } from '../common/ImageFilter';
import { useForm } from 'react-hook-form';
import { updateContactSchema } from './validation/schema';
import { useYupValidationResolver } from '../common/validation/resolver';
import { updateContact } from '../../../../api/ApiClient';
import { convertPhoneNumbersToString } from './utils';

// second dialog after choosing a contact to update
export const UpdateDialog = ({
    selectedValue,
    open,
    onEdit,
    onClose,
}: IUpdateDialogProps): JSX.Element => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm({
        defaultValues: {
            ...selectedValue,
            phoneNumbers: convertPhoneNumbersToString(
                selectedValue.phoneNumbers
            ),
        },
        resolver: useYupValidationResolver(updateContactSchema),
    });

    const [contact, setContact] = useState<ContactWithPhoneNumbersAsString>({
        ...selectedValue,
        phoneNumbers: convertPhoneNumbersToString(selectedValue.phoneNumbers),
    });

    useEffect(() => {
        setContact((prevState) => ({
            ...prevState,
            ...getValues(),
            phoneNumbers: convertPhoneNumbersToString(
                selectedValue.phoneNumbers
            ),
        }));
    }, [setContact, getValues]);

    const [imagePath, setImagePath] = useState<string | ArrayBuffer>(
        contact.imageFile
    );

    const handleUploadImage = (imagePath: string | ArrayBuffer) => {
        setImagePath(imagePath);
    };

    const handleClickOpen = () => {};

    const handleClose = () => {
        onClose?.();
    };

    const handleUpdate = async () => {
        const res = await updateContact(contact);
        console.log({ res });
        // onEditContact?.(res.data.data.up);
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
                        {...register('firstName')}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Last Name"
                        type="email"
                        fullWidth
                        variant="standard"
                        {...register('lastName')}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nickname"
                        fullWidth
                        variant="standard"
                        {...register('nickName')}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Address"
                        fullWidth
                        variant="standard"
                        {...register('address')}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Phone Numbers"
                        fullWidth
                        variant="standard"
                        {...register('phoneNumbers')}
                    />
                    <SUploadButtonWrapper>
                        <UploadButton onUpload={handleUploadImage} />
                    </SUploadButtonWrapper>
                    {imagePath && (
                        <>
                            <ImageFilter contact={selectedValue} />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleUpdate}>Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
