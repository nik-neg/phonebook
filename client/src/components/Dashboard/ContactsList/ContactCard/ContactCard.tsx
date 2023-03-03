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
import { useRemoveContactMutation } from '../../../../store/api/contacts.api';

export const ContactCard = ({
    contact,
    onRemoveContact,
}: IContactCardProps): JSX.Element => {
    const {
        id,
        nickName,
        firstName,
        lastName,
        address,
        imageFile,
        phoneNumbers,
    } = contact;

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

    const [removeContact, { isLoading: isRemoving, isSuccess, isError }] =
        useRemoveContactMutation();

    const handleEdit = async (remove: boolean) => {
        setOpen(false);

        if (!remove) {
            setOpenUpdateDialog(true);
            return;
        }
        await removeContact(id).unwrap();

        onRemoveContact?.(id);
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
                selectedValue={contact}
                open={open}
                onClose={handleClose}
                onEdit={handleEdit}
            />
            <UpdateDialog
                selectedValue={contact}
                open={openUpdateDialog}
                onClose={handleCloseUpdateDialog}
                onEdit={handleEdit}
            />
        </SContactCardContainer>
    );
};
