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
import { IContact } from '../../ContactsList/ContactCard/types';
import {
    createContact,
    prefetchFilteredImage,
} from '../../../../api/ApiClient';
import { ImageFilter } from '../common/ImageFilter';

export const AddDialog = (props: IAddDialogProps): JSX.Element => {
    const { onClose, selectedValue, open, onEdit } = props;

    // react hook form, or currying ?
    const [contact, setContact] = useState<IContact>({
        id: 1,
        firstName: 'gfhgfh',
        lastName: 'hfgfh',
        nickName: 'hfgh',
        address: 'fghfgh',
        phoneNumbers: ['8545687'],
        imageFile: '',
    });

    console.log({ i: contact.imageFile });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log({ v: event.target.value, n: event.target.name });
        setContact({ ...contact, [event.target.id]: event.target.value });
    };

    const handleClose = () => {
        onClose?.();
    };

    const handleSave = async () => {
        setContact(contact);
        console.log({ contact });
        const response = await createContact(contact);
        onClose?.();
    };

    const handleUploadImage = async (
        imagePath: string | ArrayBuffer
    ): Promise<void> => {
        console.log({ imagePath });
        // Apply the filter
        setContact({ ...contact, imageFile: imagePath.toString() });
    };

    const [filter, setFilter] = useState<IFilter>({
        blur: 0,
        grayscale: 0,
        saturation: 0,
    });

    const handleFilter = async (filter: IFilter) => {
        setFilter(filter);
    };

    const filterImage = async () => {
        const image = await prefetchFilteredImage({
            imageFile: contact.imageFile,
            ...filter,
        });

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
                        value={contact.firstName}
                        onChange={handleChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Last Name"
                        fullWidth
                        variant="standard"
                        value={contact.lastName}
                        onChange={handleChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nickname"
                        fullWidth
                        variant="standard"
                        value={contact.nickName}
                        onChange={handleChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Address"
                        fullWidth
                        variant="standard"
                        value={contact.address}
                        onChange={handleChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Phone Numbers"
                        fullWidth
                        variant="standard"
                        value={contact.phoneNumbers}
                        onChange={handleChange}
                    />
                    <SUploadButtonWrapper>
                        <UploadButton onUpload={handleUploadImage} />
                    </SUploadButtonWrapper>
                    {contact.imageFile && (
                        <ImageFilter
                            contact={contact}
                            onFilter={handleFilter}
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
