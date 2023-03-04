import {
    SAddButton,
    SButtonPanel,
    SButtonPanelWrapper,
    SButtonWrapper,
    SContactCardsContainer,
    SContactListContainer,
    SContactListContainerWrapper,
    SContactListPanel,
    SContactListWrapper,
    SIconWrapper,
} from './ContactsList.styles';
import { IContactListProps } from './types';
import React, { useEffect, useRef, useState } from 'react';
import {
    useGetContactsQuery,
    useLazyGetContactsQuery,
} from '../../../store/api/contacts.api';
import { CiPower, IoPersonAdd, MdOutlinePersonSearch } from 'react-icons/all';
import { ContactCard } from './ContactCard';
import { useAppDispatch, useAppSelector } from '../../../store';
import { getTotalNumberOfContacts } from '../../../store/slices';
import { selectTotalNumberOfContacts } from '../../../store/selectors/contacts.selector';

export const ContactsList = ({
    contacts,
    onAddContact,
    onFetchContacts,
    onOpenSearch,
    onRemoveContact,
}: IContactListProps): JSX.Element => {
    const dispatch = useAppDispatch();

    const totalNumberOfContacts = useAppSelector(selectTotalNumberOfContacts);

    const outerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const [items, setItems] = useState<number[]>([]);
    const [page, setPage] = useState(1);
    const [isLoadingItems, setIsLoadingItems] = useState(false);

    const [scroll, setScroll] = useState(0);

    const [total, setTotal] = useState(0);

    const [getContacts] = useLazyGetContactsQuery();

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
            console.log({ totla: data?.data?.getContacts?.total });
            dispatch(getTotalNumberOfContacts(data?.data?.getContacts?.total));
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

    /////////////////////////////////////////////////

    // const loadMore = useCallback(async () => {
    //     if (isLoading) {
    //         return;
    //     }
    //     setIsLoadingItems(true);
    //     setTimeout(async () => {
    //         const newItems = Array.from(
    //             { length: 40 },
    //             (_, i) => i + items.length
    //         );
    //         setItems((prevItems) => [...prevItems, ...newItems]);
    //         setIsLoadingItems(false);
    //         setPage((prevPage) => prevPage + 1);
    //     }, 1000);
    // }, [isLoadingItems, items.length]);

    useEffect(() => {
        const outerElem = outerRef.current;
        const innerElem = innerRef.current;
        if (!outerElem || !innerElem) {
            return;
        }
        const handleScroll = async () => {
            const { scrollTop, scrollHeight, clientHeight } = outerElem;
            console.log({ scrollTop, scrollHeight, clientHeight });
            if (scrollTop < clientHeight) {
                console.log({ total, page, t: scrollTop >= scroll });
                if (
                    totalNumberOfContacts !== 0 &&
                    totalNumberOfContacts > page * 5 &&
                    scrollTop >= scroll
                ) {
                    setPage((page) => page + 1);
                    const newContacts = await getContacts({
                        page: page + 1,
                    });
                    onFetchContacts?.(
                        newContacts?.data?.data?.getContacts?.contacts?.length >
                            0
                            ? newContacts?.data?.data?.getContacts?.contacts
                            : contacts
                    );
                } else {
                    const scrollBackOCondition = (page: number) =>
                        page - 1 > 1 ? page - 1 : 1;
                    setPage((page) => scrollBackOCondition(page));
                    // fetch more contacts
                    const newContacts = await getContacts({
                        page: scrollBackOCondition(page),
                    });
                    onFetchContacts?.(
                        newContacts?.data?.data?.getContacts?.contacts?.length >
                            0
                            ? newContacts?.data?.data?.getContacts?.contacts
                            : contacts
                    );
                }
            }
        };
        outerElem.addEventListener('scroll', handleScroll);
        return () => {
            outerElem.removeEventListener('scroll', handleScroll);
        };
    }, [page]);
    /////////////////////////////////////////////////

    // const handleScroll = async (event: React.UIEvent<HTMLInputElement>) => {
    //     const target = event.target as HTMLInputElement;
    //     console.log({ scrollTop: target.scrollTop, scroll });
    //     // setScroll(target.scrollTop);
    //     //
    //     // if (total !== 0 && total > page * 5 && target.scrollTop >= scroll) {
    //     //     setPage((page) => page + 1);
    //     //     const newContacts = await getContacts({
    //     //         page: page + 1,
    //     //     });
    //     //     onFetchContacts?.(
    //     //         newContacts?.data?.data?.getContacts?.contacts?.length > 0
    //     //             ? newContacts?.data?.data?.getContacts?.contacts
    //     //             : contacts
    //     //     );
    //     // } else {
    //     //     const scrollBackOCondition = (page: number) =>
    //     //         page - 1 > 1 ? page - 1 : 1;
    //     //     setPage((page) => scrollBackOCondition(page));
    //     //     // fetch more contacts
    //     //     const newContacts = await getContacts({
    //     //         page: scrollBackOCondition(page),
    //     //     });
    //     //     onFetchContacts?.(
    //     //         newContacts?.data?.data?.getContacts?.contacts?.length > 0
    //     //             ? newContacts?.data?.data?.getContacts?.contacts
    //     //             : contacts
    //     //     );
    //     // }
    // };

    const handleAddContact = () => {
        onAddContact?.();
    };

    const handleSearch = () => {
        onOpenSearch?.();
    };

    return (
        // <Tilt>
        <SContactListPanel>
            <SContactListContainerWrapper>
                <SContactListContainer
                    ref={outerRef}
                    style={{ overflow: 'auto', height: '680px' }}
                >
                    <SContactListWrapper
                        style={{ height: '679px' }}
                        ref={innerRef}
                        // onScroll={handleScroll}
                        contactsAreFetched={isDeviceOn}
                    >
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
                    </SContactListWrapper>
                </SContactListContainer>
                <SButtonPanelWrapper>
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
                </SButtonPanelWrapper>
            </SContactListContainerWrapper>
        </SContactListPanel>
        // </Tilt>
    );
};

export default ContactsList;
