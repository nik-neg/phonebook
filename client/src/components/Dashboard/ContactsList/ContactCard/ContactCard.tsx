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
import { IContactCardProps } from './types';
import { EditDialog } from '../../EditDialog/EditDialog';

export const ContactCard = (contact: IContactCardProps): JSX.Element => {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('test');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
        setSelectedValue(value);
    };
    const { nickName, firstName, lastName, address, photo, phoneNumbers } =
        contact.contact;

    const handleEdit = () => {};
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
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
            />
        </SContactCardContainer>
    );
};

export default ContactCard;
