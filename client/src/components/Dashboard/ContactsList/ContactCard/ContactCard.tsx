import {
    SContactCardContainer,
    SContactCardPhoto,
    SContactCardWrapper,
    SContactFirstName,
    SContactInfoWrapper,
    SContactLastName,
    SContactNickName,
} from './ContactCard.styles';
import React from 'react';
import { IContactCardProps } from './types';

export const ContactCard = (contact: IContactCardProps) => {
    const { nickName, firstName, lastName, address, photo, phoneNumbers } =
        contact.contact;
    return (
        <SContactCardContainer>
            <SContactCardWrapper>
                <SContactInfoWrapper>
                    <SContactCardPhoto src={photo} />
                    {nickName ? (
                        <SContactNickName>{nickName}</SContactNickName>
                    ) : (
                        <>
                            <SContactFirstName>{firstName}</SContactFirstName>
                            <SContactLastName>{lastName}</SContactLastName>
                        </>
                    )}
                </SContactInfoWrapper>
            </SContactCardWrapper>
        </SContactCardContainer>
    );
};

export default ContactCard;
