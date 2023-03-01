import {
    SAddress,
    SContactCardContainer,
    SContactCardWrapper,
    SContactInfoWrapper,
    SContactName,
    SContactNickName,
    SNameWrapper,
} from './ContactCard.styles';
import React, { useState } from 'react';
import { IContact, IContactCardProps } from './types';
import { EditDialog } from '../../dialogs/EditDialog/EditDialog';
import { UpdateDialog } from '../../dialogs/UpdateDialog/UpdateDialog';
import Avatar from '@mui/material/Avatar';

export const ContactCard = (contact: IContactCardProps): JSX.Element => {
    const { nickName, firstName, lastName, address, imageFile, phoneNumbers } =
        contact.contact;

    const [open, setOpen] = useState(false);

    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: IContact) => {
        setOpen(false);
    };

    const handleCloseUpdateDialog = () => {
        setOpenUpdateDialog(false);
    };

    const handleEdit = (remove: boolean) => {
        console.log({ contact });
        setOpen(false);

        if (!remove) {
            setOpenUpdateDialog(true);
        }
    };
    return (
        <SContactCardContainer>
            <SContactCardWrapper onClick={handleClickOpen}>
                <SContactInfoWrapper>
                    <Avatar
                        alt="Remy Sharp"
                        src={imageFile}
                        sx={{ width: 75, height: 75 }}
                    />
                    <SNameWrapper>
                        <SAddress>{address}</SAddress>

                        {nickName ? (
                            <SContactNickName>{nickName}</SContactNickName>
                        ) : (
                            <>
                                <SContactName>
                                    {firstName} {lastName}
                                </SContactName>
                            </>
                        )}
                    </SNameWrapper>
                </SContactInfoWrapper>
            </SContactCardWrapper>
            <EditDialog
                selectedValue={contact.contact}
                open={open}
                onClose={handleClose}
                onEdit={handleEdit}
            />
            <UpdateDialog
                selectedValue={contact.contact}
                open={openUpdateDialog}
                onClose={handleCloseUpdateDialog}
                onEdit={handleEdit}
            />
        </SContactCardContainer>
    );
};
