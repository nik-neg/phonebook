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
import { ContactWithPhoneNumbersAsString } from '../UpdateDialog';
import { useForm } from 'react-hook-form';
import { convertPhoneNumbersToString } from '../UpdateDialog/utils';
import { useYupValidationResolver } from '../common/validation/resolver';
import { addContactSchema } from './validation/schema';

export const AddDialog = (props: IAddDialogProps): JSX.Element => {
    const { onClose, selectedValue, open, onEdit } = props;

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
                selectedValue?.phoneNumbers
            ),
        },
        resolver: useYupValidationResolver(addContactSchema),
    });

    const [contact, setContact] = useState<ContactWithPhoneNumbersAsString>({
        id: null,
        firstName: '',
        lastName: '',
        nickName: '',
        address: '',
        phoneNumbers: '',
        imageFile: '',
    });

    console.log({ i: contact.imageFile, iv: getValues() });

    const handleClose = () => {
        onClose?.();
    };

    const handleSave = async () => {
        setContact(getValues());
        const response = await createContact(getValues());
        onClose?.();
    };

    const handleUploadImage = async (
        imagePath: string | ArrayBuffer
    ): Promise<void> => {
        console.log({ imagePath });
        // Apply the filter
        // setContact({ ...contact, imageFile: imagePath.toString() });
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

        console.log({ image });
        setContact({ ...contact, imageFile: image?.data?.data?.filterImage });
    };

    return (
        <SAddDialogContainer>
            <Dialog
                open={open}
                onClose={handleClose}
                // style={{ height: '92.5%', paddingTop: '10%' }} // for mobile
            >
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
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Last Name"
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
