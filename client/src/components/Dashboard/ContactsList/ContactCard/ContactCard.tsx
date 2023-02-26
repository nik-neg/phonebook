import {
    SContactCardContainer,
    SContactCardPhoto,
    SContactCardWrapper,
    SContactInfoWrapper,
    SContactName,
    SContactNickName,
    SNameWrapper,
} from './ContactCard.styles';
import React, { useState } from 'react';
import { IContact, IContactCardProps } from './types';
import { EditDialog } from '../../EditDialog/EditDialog';

export const ContactCard = (contact: IContactCardProps): JSX.Element => {
    const { nickName, firstName, lastName, address, photo, phoneNumbers } =
        contact.contact;

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: IContact) => {
        setOpen(false);
    };

    const handleEdit = () => {
        console.log({ contact });
    };
    return (
        <SContactCardContainer>
            <SContactCardWrapper onClick={handleClickOpen}>
                <SContactInfoWrapper>
                    <SContactCardPhoto src={photo} />
                    <SNameWrapper>
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
        </SContactCardContainer>
    );
};

export default ContactCard;
