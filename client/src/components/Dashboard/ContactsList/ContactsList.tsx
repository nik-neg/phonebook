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
import { debounce } from 'lodash-es';
import { useGetContactsQuery } from '../../../store/api/contacts.api';

export const ContactsList = ({
    contacts,
    onAddContact,
    onRemoveContact,
    onFetchContacts,
    onOpenSearch,
}: IContactListProps): JSX.Element => {
    const [scroll, setScroll] = useState(0);

    const [page, setPage] = useState(1);
    // const [data, setData] = useState([]);
    // useEffect(() => {
    //     const fetchInitialData = async () => {
    //         const initialData = await getContacts({ page });
    //         setData(initialData?.data?.data?.contacts);
    //     };
    //     fetchInitialData();
    // }, [page]);
    //
    // useEffect(() => {
    //     const handleScroll = () => {
    //         if (
    //             window.innerHeight + window.pageYOffset >=
    //             document.body.scrollHeight - 500
    //         ) {
    //             setPage((page) => page + 1);
    //         }
    //     };
    //
    //     window.addEventListener('scroll', handleScroll);
    //
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    // const handleScroll = async (event: React.UIEvent<HTMLInputElement>) => {
    //     if (event.currentTarget.scrollTop >= scroll) {
    //         setScroll(event.currentTarget.scrollTop);
    //         setPage((page) => page + 1);
    //         // fetch more contacts
    //         const newContacts = await getContacts({
    //             page: page + 1,
    //         });
    //         onFetchContacts?.(newContacts?.data?.data?.contacts ?? []);
    //     }
    // };
    const handleScroll = debounce(
        async (event: React.UIEvent<HTMLInputElement>) => {
            const target = event.target as HTMLInputElement; // Type assertion to HTMLInputElement
            if (target.scrollTop >= scroll) {
                setScroll(target.scrollTop);
                setPage((page) => page + 1);
                // fetch more contacts
                const newContacts = await getContacts({
                    page: page + 1,
                });
                console.log({ res: newContacts?.data?.data?.contacts });
                onFetchContacts?.(
                    newContacts?.data?.data?.contacts?.length > 0
                        ? newContacts?.data?.data?.contacts
                        : contacts
                );
            }
        },
        100
    );

    const handleAddContact = () => {
        console.log('add contact');
        onAddContact?.();
    };

    const [isDeviceOn, setIsDeviceOn] = React.useState(false);

    const { data, error, isLoading } = useGetContactsQuery(
        { page: 1 },
        { skip: !isDeviceOn, refetchOnMountOrArgChange: true }
    );

    useEffect(() => {
        if (!isLoading && data?.data?.contacts?.length > 0 && isDeviceOn) {
            onFetchContacts?.(data?.data?.contacts);
        }
    }, [data, isLoading, isDeviceOn]);

    const handlePowerOn = async () => {
        setIsDeviceOn(!isDeviceOn);
        if (isDeviceOn) {
            setIsDeviceOn(false);

            onFetchContacts?.([]);
            return;
        }
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
                        onScroll={handleScroll}
                        contactsAreFetched={isDeviceOn}
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
