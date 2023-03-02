import * as React from 'react';
import { useState } from 'react';
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
import { IFilter } from '../AddDialog';

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
        setValue,
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
        id: 1,
        firstName: '',
        lastName: '',
        nickName: '',
        address: '',
        phoneNumbers: '',
        imageFile: '',
    });

    const handleUploadImage = (imagePath: string | ArrayBuffer) => {
        // setImagePath(imagePath);
        setValue('imageFile', imagePath.toString());
        setContact(getValues());
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

    const [filter, setFilter] = useState<IFilter>({
        blur: 0,
        grayscale: false,
        saturation: 0,
    });

    const handleFilter = async (filter: IFilter) => {
        setFilter(filter);
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
                    {contact.imageFile && (
                        <>
                            <ImageFilter
                                contact={contact}
                                onFilter={handleFilter}
                            />
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
