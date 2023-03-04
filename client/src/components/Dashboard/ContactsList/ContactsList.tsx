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
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    useGetContactsQuery,
    useLazyGetContactsQuery,
} from '../../../store/api/contacts.api';
import { CiPower, IoPersonAdd, MdOutlinePersonSearch } from 'react-icons/all';

export const ContactsList = ({
    contacts,
    onAddContact,
    onFetchContacts,
    onOpenSearch,
    onRemoveContact,
}: IContactListProps): JSX.Element => {
    const outerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const [items, setItems] = useState<number[]>([]);
    const [page, setPage] = useState(1);
    const [isLoadingItems, setIsLoadingItems] = useState(false);

    const [scroll, setScroll] = useState(0);

    const [total, setTotal] = useState(0);

    const [getContacts] = useLazyGetContactsQuery();

    /////////////////////////////////////////////////

    const loadMore = useCallback(() => {
        if (isLoading) {
            return;
        }
        setIsLoadingItems(true);
        setTimeout(() => {
            const newItems = Array.from(
                { length: 40 },
                (_, i) => i + items.length
            );
            setItems((prevItems) => [...prevItems, ...newItems]);
            setIsLoadingItems(false);
            setPage((prevPage) => prevPage + 1);
        }, 1000);
    }, [isLoadingItems, items.length]);

    useEffect(() => {
        const outerElem = outerRef.current;
        const innerElem = innerRef.current;
        if (!outerElem || !innerElem) {
            return;
        }
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = outerElem;
            console.log({
                scrollTop,
                scrollHeight,
                clientHeight,
                t: scrollTop < clientHeight,
            });
            if (scrollTop < clientHeight) {
                loadMore();
            }
        };
        outerElem.addEventListener('scroll', handleScroll);
        return () => {
            outerElem.removeEventListener('scroll', handleScroll);
        };
    }, [loadMore]);
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

    const [isDeviceOn, setIsDeviceOn] = React.useState(false);

    const { data, error, isLoading } = useGetContactsQuery(
        { page: 1 },
        { skip: !isDeviceOn, refetchOnMountOrArgChange: true }
    );

    // useEffect(() => {
    //     if (
    //         !isLoading &&
    //         data?.data?.getContacts?.contacts?.length > 0 &&
    //         isDeviceOn
    //     ) {
    //         setTotal(data?.data?.getContacts?.total);
    //         onFetchContacts?.(data?.data?.getContacts?.contacts);
    //     }
    // }, [data, isLoading, isDeviceOn]);

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
                            {/*{contacts.map(*/}
                            {/*    (contact, index) =>*/}
                            {/*        index <= 4 && (*/}
                            {/*            <ContactCard*/}
                            {/*                key={index}*/}
                            {/*                contact={contact}*/}
                            {/*                onRemoveContact={onRemoveContact}*/}
                            {/*            />*/}
                            {/*        )*/}
                            {/*)}*/}
                            {items.map((item) => (
                                <div
                                    key={item + Math.random() * 10000000}
                                    style={{
                                        height: 'calc(679 / 100)px',
                                        color: 'white',
                                    }}
                                >
                                    {item}
                                </div>
                            ))}
                            {isLoadingItems && <div>Loading...</div>}
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
