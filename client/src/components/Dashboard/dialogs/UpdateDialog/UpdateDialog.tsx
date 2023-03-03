import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
    ContactWithPhoneNumbersAsStringWithoutId,
    IUpdateDialogProps,
} from './types';
import { UploadButton } from '../common/UploadButton/UploadButton';
import { SUploadButtonWrapper } from '../common/UploadButton/UploadButton.styles';
import { ImageFilter } from '../common/ImageFilter';
import { useForm } from 'react-hook-form';
import { updateContactSchema } from './validation/schema';
import { prefetchFilteredImage } from '../../../../api/ApiClient';
import { convertPhoneNumbersToString } from './utils';
import { IFilter } from '../AddDialog';
import { useUpdateContactMutation } from '../../../../store/api/contacts.api';
import { yupResolver } from '@hookform/resolvers/yup';

export const UpdateDialog = ({
    selectedValue,
    open,
    onEdit,
    onClose,
}: IUpdateDialogProps): JSX.Element => {
    const defaultValues = {
        firstName: '',
        lastName: '',
        nickName: '',
        imageFile: '',
        address: '',
        phoneNumbers: '',
    };
    const {
        register,
        reset,
        trigger,
        formState: { errors, isValid },
        getValues,
        setValue,
    } = useForm({
        defaultValues: {
            ...selectedValue,
            phoneNumbers: convertPhoneNumbersToString(
                selectedValue.phoneNumbers
            ),
        },
        resolver: yupResolver(updateContactSchema),
    });

    const [contact, setContact] =
        useState<ContactWithPhoneNumbersAsStringWithoutId>({
            ...selectedValue,
            phoneNumbers: convertPhoneNumbersToString(
                selectedValue.phoneNumbers
            ),
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

    const triggerValidation = async () => {
        await trigger('lastName');
        await trigger('firstName');
        await trigger('address');
        await trigger('phoneNumbers');
        await trigger('imageFile');
    };

    const handleUpdate = async () => {
        await triggerValidation();
        if (isValid) {
            const res = await updateContact({
                contact: { ...getValues(), id: selectedValue.id },
                filterImageInput: filter,
            }).unwrap();
            reset(defaultValues);
            onClose?.();
        }
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
                    {errors.firstName && (
                        <span style={{ color: 'red' }}>
                            {errors.firstName.message}
                        </span>
                    )}
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
                    {errors.lastName && (
                        <span style={{ color: 'red' }}>
                            {errors.lastName.message}
                        </span>
                    )}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nickname"
                        fullWidth
                        variant="standard"
                        {...register('nickName')}
                    />
                    {errors.nickName && (
                        <span style={{ color: 'red' }}>
                            {errors.nickName.message}
                        </span>
                    )}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Address"
                        fullWidth
                        variant="standard"
                        {...register('address')}
                    />
                    {errors.address && (
                        <span style={{ color: 'red' }}>
                            {errors.address.message}
                        </span>
                    )}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Phone Numbers"
                        fullWidth
                        variant="standard"
                        {...register('phoneNumbers')}
                    />
                    {errors.phoneNumbers && (
                        <span style={{ color: 'red' }}>
                            {errors.phoneNumbers.message}
                        </span>
                    )}
                    <SUploadButtonWrapper>
                        <UploadButton onUpload={handleUploadImage} />
                    </SUploadButtonWrapper>
                    {errors.imageFile && (
                        <span style={{ color: 'red' }}>
                            {errors.imageFile.message}
                        </span>
                    )}
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
