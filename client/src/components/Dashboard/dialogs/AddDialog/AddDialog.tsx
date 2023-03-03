import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IAddDialogProps, IFilter } from './types';
import { SUploadButtonWrapper } from '../common/UploadButton/UploadButton.styles';
import { UploadButton } from '../common/UploadButton/UploadButton';
import { SAddDialogContainer } from './AddDialog.styles';
import {
    createContact,
    prefetchFilteredImage,
} from '../../../../api/ApiClient';
import { ImageFilter } from '../common/ImageFilter';
import { ContactWithPhoneNumbersAsStringWithoutId } from '../UpdateDialog';
import { useForm } from 'react-hook-form';
import { addContactSchema } from './validation/schema';
import { yupResolver } from '@hookform/resolvers/yup';

export const AddDialog = (props: IAddDialogProps): JSX.Element => {
    const { onClose, open } = props;

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
        formState: { errors, isValid },
        getValues,
        setValue,
        reset,
    } = useForm({
        defaultValues,
        resolver: yupResolver(addContactSchema),
    });

    const [contact, setContact] = useState<
        Partial<ContactWithPhoneNumbersAsStringWithoutId>
    >({});

    const handleClose = () => {
        clearForm();
        onClose?.();
    };

    const triggerValidation = async (): Promise<boolean> => {
        const lastName = await trigger('lastName');
        const firstName = await trigger('firstName');
        const address = await trigger('address');
        const phoneNumbers = await trigger('phoneNumbers');
        const imageFile = await trigger('imageFile');

        return lastName && firstName && address && phoneNumbers && imageFile;
    };

    const clearForm = () => {
        reset(defaultValues);
        setValue('imageFile', '');
        setContact(getValues());
    };

    const handleSave = async () => {
        if (await triggerValidation()) {
            const response = await createContact(getValues());
            clearForm();
            onClose?.();
        }
    };

    const handleUploadImage = async (
        imagePath: string | ArrayBuffer
    ): Promise<void> => {
        setValue('imageFile', imagePath.toString());
        setContact(getValues());
    };

    const [filter, setFilter] = useState<IFilter>({
        blur: 0,
        grayscale: false,
        saturation: 0,
    });

    const handleFilter = async (filter: IFilter) => {
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
        <SAddDialogContainer>
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
                        <ImageFilter
                            contact={contact}
                            onFilter={handleFilter}
                            isFetchingImage={loading}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={filterImage}>Filter</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </SAddDialogContainer>
    );
};
