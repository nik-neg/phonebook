import * as React from 'react';
import { useEffect, useState } from 'react';
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
import { IAddDialogState, IFilter } from '../AddDialog';
import { useUpdateContactMutation } from '../../../../store/api/contacts.api';
import { yupResolver } from '@hookform/resolvers/yup';
import { triggerValidation } from '../common/utils';
import { keys, omit } from 'lodash-es';

export const UpdateDialog = ({
    selectedValue,
    open,
    onClose,
    onFilterImage,
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
        trigger,
        formState: { errors },
        getValues,
        setValue,
        reset,
    } = useForm({
        defaultValues: {
            ...selectedValue,
        },
        resolver: yupResolver(updateContactSchema),
    });

    useEffect(() => {
        clearForm();
        setValue('firstName', selectedValue.firstName);
        setValue('lastName', selectedValue.lastName);
        setValue('nickName', selectedValue.nickName);
        setValue('imageFile', selectedValue.imageFile);
        setValue('address', selectedValue.address);
        setValue('phoneNumbers', selectedValue.phoneNumbers);
    }, [selectedValue]);

    const handleUploadImage = (imagePath: string | ArrayBuffer) => {
        setValue('imageFile', imagePath.toString());
    };

    const handleClose = () => {
        onClose?.();
    };

    const [filter, setFilter] = useState<IFilter>({
        blur: 0,
        grayscale: false,
        saturation: 0,
    });

    const [updateContact] = useUpdateContactMutation();

    const handleUpdate = async () => {
        try {
            if (
                await triggerValidation(
                    trigger,
                    keys(omit(defaultValues, 'nickName')) as Array<
                        keyof IAddDialogState
                    >
                )
            ) {
                await updateContact({
                    contact: { ...getValues(), id: selectedValue.id },
                    filterImageInput: filter,
                }).unwrap();

                setValue('imageFile', getValues().imageFile);
                onClose?.();
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleFilter = async (filter: IFilter) => {
        setFilter(filter);
    };

    const [loading, setLoading] = useState<boolean>(false);

    const filterImage = async () => {
        setLoading(true);
        let image;
        try {
            image = await prefetchFilteredImage({
                imageFile: selectedValue.imageFile,
                ...filter,
            });
        } catch (e) {
            console.log(e);
        }
        setLoading(false);

        onFilterImage?.(image?.data?.data?.filterImage);
        setValue('imageFile', image?.data?.data?.filterImage);
    };
    const clearForm = () => {
        reset(defaultValues);
        setValue('imageFile', '');
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
                                isFetchingImage={loading}
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
