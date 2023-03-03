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
    console.log({ selectedValue, v: getValues() });

    // const [contact, setContact] =
    //     useState<ContactWithPhoneNumbersAsStringWithoutId>({
    //         ...selectedValue,
    //         phoneNumbers: convertPhoneNumbersToString(
    //             selectedValue.phoneNumbers
    //         ),
    //     });

    const handleUploadImage = (imagePath: string | ArrayBuffer) => {
        setValue('imageFile', imagePath.toString());
    };
    const clearForm = () => {
        reset(defaultValues);
        setValue('imageFile', '');
        // setContact(getValues());
    };

    const handleClose = () => {
        clearForm();
        onClose?.();
    };

    const [filter, setFilter] = useState<IFilter>({
        blur: 0,
        grayscale: false,
        saturation: 0,
    });

    const [updateContact, { isLoading: isRemoving, isSuccess, isError }] =
        useUpdateContactMutation();

    const triggerValidation = async (): Promise<boolean> => {
        const lastName = await trigger('lastName');
        const firstName = await trigger('firstName');
        const address = await trigger('address');
        const phoneNumbers = await trigger('phoneNumbers');
        const imageFile = await trigger('imageFile');

        return lastName && firstName && address && phoneNumbers && imageFile;
    };

    const handleUpdate = async () => {
        if (await triggerValidation()) {
            const res = await updateContact({
                contact: { ...getValues(), id: selectedValue.id },
                filterImageInput: filter,
            }).unwrap();
            clearForm();
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
            imageFile: selectedValue.imageFile,
            ...filter,
        });
        setLoading(false);

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
                    {selectedValue.imageFile && (
                        <>
                            <ImageFilter
                                contact={selectedValue}
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
