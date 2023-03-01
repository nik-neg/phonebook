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
import { createContact } from '../../../../api/ApiClient';

export const AddDialog = (props: IAddDialogProps): JSX.Element => {
    const { onClose, selectedValue, open, onEdit } = props;

    const [imagePath, setImagePath] = useState<string | ArrayBuffer>('');

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
        const response = await createContact(selectedValue);
    };

    const handleUploadImage = async (
        imagePath: string | ArrayBuffer
    ): Promise<void> => {
        // Apply the filter
        // LenaJS.filterImage(filteredImageCanvas, filter, originalImage);
        setImagePath(imagePath);
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
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Last Name"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nickname"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Address"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Phone Numbers"
                        fullWidth
                        variant="standard"
                    />
                    <SUploadButtonWrapper>
                        <UploadButton onUpload={handleUploadImage} />
                    </SUploadButtonWrapper>
                    {imagePath && (
                        <>
                            <SImageOptionContainer>
                                <SUploadedImageWrapper>
                                    <SUploadedImage
                                        src={imagePath.toString()}
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
