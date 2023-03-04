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
    STimePanelWrapper,
    STimePanelYear,
} from './ContactsList.styles';
import { IContactListProps } from './types';
import { ContactCard } from './ContactCard';
import { CiPower, IoPersonAdd, MdOutlinePersonSearch } from 'react-icons/all';
import React, { useEffect, useState } from 'react';
import Tilt from 'react-parallax-tilt';
import {
    useGetContactsQuery,
    useLazyGetContactsQuery,
} from '../../../store/api/contacts.api';

export const ContactsList = ({
    contacts,
    onAddContact,
    onFetchContacts,
    onOpenSearch,
    onRemoveContact,
}: IContactListProps): JSX.Element => {
    const [page, setPage] = useState(1);

    const [scroll, setScroll] = useState(0);

    const [total, setTotal] = useState(0);

    const [getContacts] = useLazyGetContactsQuery();

    const handleScroll = async (event: React.UIEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        console.log({ scrollTop: target.scrollTop, scroll });
        // setScroll(target.scrollTop);
        //
        // if (total !== 0 && total > page * 5 && target.scrollTop >= scroll) {
        //     setPage((page) => page + 1);
        //     const newContacts = await getContacts({
        //         page: page + 1,
        //     });
        //     onFetchContacts?.(
        //         newContacts?.data?.data?.getContacts?.contacts?.length > 0
        //             ? newContacts?.data?.data?.getContacts?.contacts
        //             : contacts
        //     );
        // } else {
        //     const scrollBackOCondition = (page: number) =>
        //         page - 1 > 1 ? page - 1 : 1;
        //     setPage((page) => scrollBackOCondition(page));
        //     // fetch more contacts
        //     const newContacts = await getContacts({
        //         page: scrollBackOCondition(page),
        //     });
        //     onFetchContacts?.(
        //         newContacts?.data?.data?.getContacts?.contacts?.length > 0
        //             ? newContacts?.data?.data?.getContacts?.contacts
        //             : contacts
        //     );
        // }
    };

    const handleAddContact = () => {
        onAddContact?.();
    };

    const [isDeviceOn, setIsDeviceOn] = React.useState(false);

    const { data, error, isLoading } = useGetContactsQuery(
        { page: 1 },
        { skip: !isDeviceOn, refetchOnMountOrArgChange: true }
    );

    useEffect(() => {
        if (
            !isLoading &&
            data?.data?.getContacts?.contacts?.length > 0 &&
            isDeviceOn
        ) {
            setTotal(data?.data?.getContacts?.total);
            onFetchContacts?.(data?.data?.getContacts?.contacts);
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

    const handleSearch = () => {
        onOpenSearch?.();
    };

    return (
        <Tilt>
            <SContactListContainerWrapper>
                <SContactListContainer>
                    <SContactListWrapper
                        onScroll={handleScroll}
                        contactsAreFetched={isDeviceOn}
                    >
                        <STimePanelWrapper>
                            <STimePanelYear></STimePanelYear>
                        </STimePanelWrapper>
                        <SContactCardsContainer>
                            {contacts.map(
                                (contact, index) =>
                                    index <= 4 && (
                                        <ContactCard
                                            key={index}
                                            contact={contact}
                                            onRemoveContact={onRemoveContact}
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
