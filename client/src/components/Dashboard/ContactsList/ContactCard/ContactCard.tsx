import {
    SContactCardContainer,
    SContactCardPhoto,
    SContactCardWrapper,
    SContactInfoWrapper,
    SContactName,
    SContactNickName,
    SNameWrapper,
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
        </SContactCardContainer>
    );
};

export default ContactCard;
