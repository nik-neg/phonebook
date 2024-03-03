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
import { IContactCardProps } from './types';
import { EditDialog } from '../../dialogs/EditDialog/EditDialog';
import { UpdateDialog } from '../../dialogs/UpdateDialog/UpdateDialog';
import Avatar from '@mui/material/Avatar';
import { useRemoveContactMutation } from '../../../../store/api/contacts.api';
import { ContactWithPhoneNumbersAsString } from '../../dialogs/UpdateDialog';
import { convertPhoneNumbersToString } from '../../dialogs/UpdateDialog/utils';
import { ADDRESS_STRIP_LENGTH } from './constants';

export const ContactCard = ({
    contact,
    onRemoveContact,
}: IContactCardProps): JSX.Element => {
    const { id, nickName, firstName, lastName, address, imageFile } = contact;

    const [contactState, setContactState] =
        useState<ContactWithPhoneNumbersAsString>({
            ...contact,
            phoneNumbers: convertPhoneNumbersToString(contact.phoneNumbers),
        });

    const [open, setOpen] = useState<boolean>(false);

    const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseUpdateDialog = () => {
        setOpenUpdateDialog(false);
    };

    const [removeContact] = useRemoveContactMutation();

    const handleEdit = async (remove: boolean) => {
        setOpen(false);

        if (!remove) {
            setOpenUpdateDialog(true);
            return;
        }
        try {
            await removeContact(id).unwrap();
        } catch (e) {
            console.log(e);
        }

        onRemoveContact?.(id);
    };

    const handleFilterImage = (filteredImage: string) => {
        setContactState((prevState) => ({
            ...prevState,
            imageFile: filteredImage,
        }));
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
                        <SAddress>
                            {address.slice(0, ADDRESS_STRIP_LENGTH)}
                        </SAddress>

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
                selectedValue={contactState}
                open={openUpdateDialog}
                onClose={handleCloseUpdateDialog}
                onEdit={handleEdit}
                onFilterImage={handleFilterImage}
            />
        </SContactCardContainer>
    );
};
