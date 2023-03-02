import {
    SAddButton,
    SAddButtonWrapper,
    SButtonPanel,
    SButtonWrapper,
    SContactCardsContainer,
    SContactListContainer,
    SContactListContainerWrapper,
    SContactListWrapper,
    SIconWrapper,
    STimePanelTime,
    STimePanelWrapper,
    STimePanelYear,
} from './ContactsList.styles';
import { IContactListProps } from './types';
import { ContactCard } from './ContactCard';
import { CiPower, IoPersonAdd, MdOutlinePersonSearch } from 'react-icons/all';
import React, { useEffect, useState } from 'react';
import { getContacts } from '../../../api/ApiClient';
import date from 'date-and-time';
import Tilt from 'react-parallax-tilt';

export const ContactsList = ({
    contacts,
    onAddContact,
    onRemoveContact,
    onFetchContacts,
    onOpenSearch,
}: IContactListProps): JSX.Element => {
    const [scroll, setScroll] = useState(0);

    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchInitialData = async () => {
            const initialData = await getContacts({ page });
            setData(initialData?.data?.data?.contacts);
        };
        fetchInitialData();
    }, [page]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.pageYOffset >=
                document.body.scrollHeight - 500
            ) {
                setPage((page) => page + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // const handleScroll = async (event: React.UIEvent<HTMLInputElement>) => {
    //     console.log({ sc: event.currentTarget.scrollTop, scroll });
    //     // event.stopPropagation();
    //     if (event.currentTarget.scrollTop > scroll) {
    //         setScroll(event.currentTarget.scrollTop);
    //         // fetch more contacts
    //         const newContacts = await getContacts({
    //             skip: contacts.length,
    //             take: 5,
    //             keyword: '',
    //         });
    //         onFetchContacts?.(newContacts?.data?.data?.contacts ?? []);
    //     }
    // };

    const handleAddContact = () => {
        console.log('add contact');
        onAddContact?.();
    };

    const [isFetched, setIsFetched] = React.useState(false);

    const handlePowerOn = async () => {
        if (isFetched) {
            setIsFetched(false);

            onFetchContacts?.([]);
            return;
        }
        const contacts = await getContacts({
            skip: 0,
            take: 5,
            keyword: '',
            page: 1,
        });
        if (contacts?.data?.data?.contacts?.length > 0) {
            setIsFetched(true);
        }
        console.log({ handlePowerOn, contacts });
        onFetchContacts?.(contacts?.data?.data?.contacts ?? []);
    };

    const handleRemove = async (id: number) => {
        onRemoveContact?.(id);
    };

    const [time, setTime] = React.useState(new Date());

    // useEffect(() => {
    //     setTimeout(() => {
    //         setTime(new Date());
    //     }, 1000);
    // }, [time]);

    const handleSearch = () => {
        onOpenSearch?.();
    };

    // on remove refetch new contacts and sort

    return (
        <Tilt>
            <SContactListContainerWrapper>
                <SContactListContainer>
                    <SContactListWrapper
                        // onScroll={handleScroll}
                        contactsAreFetched={isFetched}
                    >
                        <STimePanelWrapper>
                            <STimePanelYear>
                                {date.format(time, 'YYYY/MM/DD')}
                            </STimePanelYear>
                            <STimePanelTime>
                                {date.format(time, 'HH:mm:ss')}
                            </STimePanelTime>
                        </STimePanelWrapper>
                        <SContactCardsContainer>
                            {contacts.map(
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
                                    <SAddButton onClick={handleSearch}>
                                        {'Search'}
                                        <SIconWrapper>
                                            <MdOutlinePersonSearch />
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
            </SContactListContainerWrapper>
        </Tilt>
    );
};

export default ContactsList;
