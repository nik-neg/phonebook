import {
    SAddButton,
    SAddButtonWrapper,
    SButtonPanel,
    SButtonWrapper,
    SContactListContainer,
    SContactListWrapper,
    SIconWrapper,
} from './ContactsList.styles';
import { IContactListProps } from './types';
import { ContactCard } from './ContactCard';
import { CiPower, IoPersonAdd } from 'react-icons/all';
import React from 'react';

export const ContactsList = ({
    contacts,
    onAddContact,
}: IContactListProps): JSX.Element => {
    const handleScroll = () => {
        console.log('scroll');
    };

    const handleAddContact = () => {
        console.log('add contact');
        onAddContact?.();
    };

    // on remove refetch new contacts and sort

    return (
        <SContactListContainer>
            <SContactListWrapper onScroll={handleScroll}>
                {contacts.map(
                    (contact, index) =>
                        index !== 5 && (
                            <ContactCard key={index} contact={contact} />
                        )
                )}
                <SAddButtonWrapper>
                    <SButtonPanel>
                        <SButtonWrapper>
                            <SAddButton onClick={handleAddContact}>
                                {'Add Contact'}
                                <SIconWrapper>
                                    <IoPersonAdd />
                                </SIconWrapper>
                            </SAddButton>
                        </SButtonWrapper>
                        <SButtonWrapper>
                            <SAddButton>
                                {'Power'}
                                <SIconWrapper>
                                    <CiPower />
                                </SIconWrapper>
                            </SAddButton>
                        </SButtonWrapper>
                    </SButtonPanel>
                </SAddButtonWrapper>
            </SContactListWrapper>
        </SContactListContainer>
    );
};

export default ContactsList;
