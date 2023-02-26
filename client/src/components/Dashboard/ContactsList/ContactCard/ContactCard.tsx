import {
    SContactCardPhoto,
    SContactCardPhotoWrapper,
    SContactCardWrapper,
} from './ContactCard.styles';
import React, { useState } from 'react';
import { IContactCardProps } from './types';

export const ContactCard = (contact: IContactCardProps) => {
    const { nickName, firstName, lastName, address, photo, phoneNumbers } =
        contact.contact;
    const [loaded, setLoaded] = useState(false);
    return (
        <SContactCardWrapper>
            <SContactCardPhotoWrapper>
                <SContactCardPhoto src={photo} />
            </SContactCardPhotoWrapper>
        </SContactCardWrapper>
    );
};

export default ContactCard;
