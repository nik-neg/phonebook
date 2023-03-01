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
import {
    SFilterPanelItem,
    SImageOptionContainer,
    SUploadedImage,
    SUploadedImageWrapper,
} from '../UpdateDialog/UpdateDialog.styles';
import { ImageOptionsSlider } from '../common/ImageOptionsSlider/ImageOptionsSlider';
import { IoIosColorPalette, MdLensBlur, RxShadowInner } from 'react-icons/all';
import { SAddDialogContainer } from './AddDialog.styles';
import { IContact } from '../../ContactsList/ContactCard/types';
import { createContact } from '../../../../api/ApiClient';

export const AddDialog = (props: IAddDialogProps): JSX.Element => {
    const { onClose, selectedValue, open, onEdit } = props;

    // react hook form, or currying ?
    const [contact, setContact] = useState<IContact>({
        firstName: 'sadasdasd',
        lastName: 'asdasdasd',
        nickName: 'asdasdasd',
        address: 'sadasdasd',
        phoneNumbers: ['123544488'],
        imageUrl: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log({ v: event.target.value, n: event.target.name });
        setContact({ ...contact, [event.target.id]: event.target.value });
    };

    const [filter, setFilter] = useState<IFilter>({
        blur: 0,
        grayscale: 0,
        saturation: 0,
    });

    const handleFilterChange = (name: string, value: number) => {
        setFilter({ ...filter, [name]: value });

        console.log({ filter });
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
        // Apply the filter
        setContact({ ...contact, imageUrl: imagePath.toString() });
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
                    {contact.imageUrl && (
                        <>
                            <SImageOptionContainer>
                                <SUploadedImageWrapper>
                                    <SUploadedImage
                                        src={contact.imageUrl.toString()}
                                    />
                                </SUploadedImageWrapper>
                                <SFilterPanelItem>
                                    <ImageOptionsSlider
                                        name={'Grayscale'}
                                        Icon={RxShadowInner}
                                        onChangeParent={handleFilterChange}
                                    />
                                </SFilterPanelItem>

                                <SFilterPanelItem>
                                    <ImageOptionsSlider
                                        name={'Blur'}
                                        Icon={MdLensBlur}
                                        onChangeParent={handleFilterChange}
                                    />
                                </SFilterPanelItem>

                                <SFilterPanelItem>
                                    <ImageOptionsSlider
                                        name={'Saturation'}
                                        Icon={IoIosColorPalette}
                                        onChangeParent={handleFilterChange}
                                    />
                                </SFilterPanelItem>
                            </SImageOptionContainer>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </SAddDialogContainer>
    );
};
