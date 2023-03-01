import {
    SAddButton,
    SAddButtonWrapper,
    SButtonPanel,
    SButtonWrapper,
    SContactCardsContainer,
    SContactListContainer,
    SContactListWrapper,
    SIconWrapper,
} from './ContactsList.styles';
import { IContactListProps } from './types';
import { ContactCard } from './ContactCard';
import { CiPower, IoPersonAdd } from 'react-icons/all';
import React from 'react';
import { getContacts } from '../../../api/ApiClient';

export const ContactsList = ({
    contacts,
    onAddContact,
    onFetchContacts,
}: IContactListProps): JSX.Element => {
    const handleScroll = () => {
        console.log('scroll');
    };

    const handleAddContact = () => {
        console.log('add contact');
        onAddContact?.();
    };

    const handlePowerOn = async () => {
        const contacts = await getContacts({ skip: 0, take: 5, keyword: '' });

        onFetchContacts?.(contacts?.data?.data?.contacts ?? []);
    };

    // on remove refetch new contacts and sort

    return (
        <SContactListContainer>
            <SContactListWrapper onScroll={handleScroll}>
                <SContactCardsContainer>
                    {contacts.map(
                        (contact, index) =>
                            index !== 5 && (
                                <ContactCard key={index} contact={contact} />
                            )
                    )}
                </SContactCardsContainer>
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
                            <SAddButton onClick={handlePowerOn}>
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
