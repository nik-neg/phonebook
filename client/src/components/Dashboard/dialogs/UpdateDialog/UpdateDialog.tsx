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
import { prefetchFilteredImage } from '../../../../api/ApiClient';
import { convertPhoneNumbersToString } from './utils';
import { IFilter } from '../AddDialog';
import { useUpdateContactMutation } from '../../../../store/api/contacts.api';

// second dialog after choosing a contact to update
export const UpdateDialog = ({
    selectedValue,
    open,
    onEdit,
    onClose,
}: IUpdateDialogProps): JSX.Element => {
    const {
        register,
        reset,
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
        ...selectedValue,
        phoneNumbers: convertPhoneNumbersToString(selectedValue.phoneNumbers),
    });

    const handleUploadImage = (imagePath: string | ArrayBuffer) => {
        setValue('imageFile', imagePath.toString());
        setContact(getValues());
    };

    const handleClickOpen = () => {};

    const handleClose = () => {
        onClose?.();
    };

    const [filter, setFilter] = useState<IFilter>({
        blur: 0,
        grayscale: false,
        saturation: 0,
    });

    const [updateContact, { isLoading: isRemoving, isSuccess, isError }] =
        useUpdateContactMutation();

    const handleUpdate = async () => {
        const res = await updateContact({
            contact: getValues(),
            filterImageInput: filter,
        }).unwrap();
        reset({
            firstName: null,
            lastName: null,
            nickName: null,
            imageFile: null,
            address: null,
            phoneNumbers: null,
        });
        onClose?.();
    };

    const handleFilter = async (filter: IFilter) => {
        console.log('update', { filter });
        setFilter(filter);
    };

    const [loading, setLoading] = useState<boolean>(false);

    const filterImage = async () => {
        setLoading(true);
        const image = await prefetchFilteredImage({
            imageFile: contact.imageFile,
            ...filter,
        });
        setLoading(false);

        setContact({ ...contact, imageFile: image?.data?.data?.filterImage });
        setValue('imageFile', image?.data?.data?.filterImage);
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
                    <Button onClick={filterImage}>Filter</Button>
                    <Button onClick={handleUpdate}>Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
