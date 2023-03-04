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
import { ContactCard } from './ContactCard';
import { useAppDispatch, useAppSelector } from '../../../store';
import { selectTotalNumberOfContacts } from '../../../store/selectors/contacts.selector';
import { getTotalNumberOfContacts } from '../../../store/slices';
import { debounce } from 'lodash-es';

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
    const [page, setPage] = useState(1);
    const [isLoadingItems, setIsLoadingItems] = useState(false);

    const [scroll, setScroll] = useState(0);

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

    const loadMoreContacts = useCallback(
        async (outerElem: HTMLDivElement) => {
            setTimeout(async () => {
                const { scrollTop, scrollHeight, clientHeight } = outerElem;
                console.log({ scrollTop, scroll });
                if (
                    scrollTop !== 0 &&
                    scrollTop >= scroll &&
                    scrollTop < clientHeight &&
                    totalNumberOfContacts >= page * 5
                ) {
                    setPage((page) => page + 1);
                    const newContacts = await getContacts({
                        page: page + 1,
                    });
                    dispatch(
                        getTotalNumberOfContacts(
                            newContacts?.data?.data?.getContacts?.total
                        )
                    );
                    onFetchContacts?.(
                        newContacts?.data?.data?.getContacts?.contacts?.length >
                            0
                            ? newContacts?.data?.data?.getContacts?.contacts
                            : contacts
                    );
                } else {
                    console.log('else', page - 1 > 1 ? page - 1 : 1);
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
                setScroll(scrollTop);
            }, 1000);
        },
        [page]
    );

    useEffect(() => {
        const outerElem = outerRef.current;
        const innerElem = innerRef.current;
        if (!outerElem || !innerElem) {
            return;
        }
        const handleScroll = debounce(async () => {
            const { scrollTop, scrollHeight, clientHeight } = outerElem;
            console.log({ scrollTop, scrollHeight, clientHeight });
            if (scrollTop < clientHeight) {
                await loadMoreContacts(outerElem);
                console.log('if ok');
            }
        }, 100);
        outerElem.addEventListener('scroll', handleScroll);
        return () => {
            outerElem.removeEventListener('scroll', handleScroll);
        };
    }, [page]);

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
                        style={{ height: '775px' }}
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
