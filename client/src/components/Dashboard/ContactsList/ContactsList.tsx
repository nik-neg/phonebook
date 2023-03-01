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
import React, { useState } from 'react';
import { getContacts } from '../../../api/ApiClient';
import { IContact } from './ContactCard/types';

export const ContactsList = ({
    contacts,
    onAddContact,
    onFetchContacts,
}: IContactListProps): JSX.Element => {
    const [visibleContacts, setVisibleContacts] =
        useState<IContact[]>(contacts);

    console.log({ visibleContacts });

    const handleScroll = () => {
        console.log('scroll');
    };

    const handleAddContact = () => {
        console.log('add contact');
        onAddContact?.();
    };

    const handlePowerOn = async () => {
        const contacts = await getContacts({ skip: 0, take: 5, keyword: '' });
        console.log({ handlePowerOn, contacts });
        onFetchContacts?.(contacts?.data?.data?.contacts ?? []);
    };

    const handleRemove = async (id: number) => {
        setVisibleContacts((prev) => prev.filter((c) => c.id !== id));
    };

    // on remove refetch new contacts and sort

    return (
        <SContactListContainer>
            <SContactListWrapper onScroll={handleScroll}>
                <SContactCardsContainer>
                    {visibleContacts.map(
                        (contact, index) =>
                            index !== 5 && (
                                <ContactCard
                                    key={index}
                                    contact={contact}
                                    onRemove={handleRemove}
                                />
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
