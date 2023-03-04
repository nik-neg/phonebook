import {
    SButton,
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
import Tilt from 'react-parallax-tilt';

export const ContactsList = ({
    contacts,
    onAddContact,
    onFetchContacts,
    onOpenSearch,
    onRemoveContact,
}: IContactListProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const [hover, setHover] = useState(false);

    const totalNumberOfContacts = useAppSelector(selectTotalNumberOfContacts);

    const outerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const [page, setPage] = useState(1);

    const [scroll, setScroll] = useState(0);

    const [getContacts] = useLazyGetContactsQuery();

    const [isDeviceOn, setIsDeviceOn] = React.useState(false);

    const { data, isLoading } = useGetContactsQuery(
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
                let newContacts;

                const { scrollTop, clientHeight } = outerElem;
                setScroll(scrollTop);

                if (
                    !(scrollTop < scroll) &&
                    scrollTop < clientHeight &&
                    totalNumberOfContacts >= page * 5
                ) {
                    onFetchContacts?.([]);
                    setPage((page) => page + 1);
                    try {
                        newContacts = await getContacts({
                            page: page + 1,
                        });
                    } catch (e) {
                        console.log(e);
                    }

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
                    const scrollBackOCondition = (page: number) =>
                        page - 1 > 1 ? page - 1 : 1;
                    setPage((page) => scrollBackOCondition(page));

                    try {
                        newContacts = await getContacts({
                            page: scrollBackOCondition(page),
                        });
                    } catch (e) {
                        console.log(e);
                    }
                    onFetchContacts?.(
                        newContacts?.data?.data?.getContacts?.contacts?.length >
                            0
                            ? newContacts?.data?.data?.getContacts?.contacts
                            : contacts
                    );
                }
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
            const { scrollTop, clientHeight } = outerElem;
            if (scrollTop < clientHeight) {
                try {
                    await loadMoreContacts(outerElem);
                } catch (e) {
                    console.log(e);
                }
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
        <Tilt>
            <SContactListPanel>
                <SContactListContainerWrapper>
                    <SContactListContainer
                        ref={outerRef}
                        style={{ overflow: 'auto', height: '680px' }}
                    >
                        <SContactListWrapper
                            contactsAreFetched={
                                isDeviceOn || contacts?.length > 0
                            }
                            style={{ height: '750px' }}
                            ref={innerRef}
                            hover={hover}
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                        >
                            <SContactCardsContainer>
                                {contacts.map(
                                    (contact, index) =>
                                        index <= 4 && (
                                            <ContactCard
                                                key={index}
                                                contact={contact}
                                                onRemoveContact={
                                                    onRemoveContact
                                                }
                                            />
                                        )
                                )}
                            </SContactCardsContainer>
                        </SContactListWrapper>
                    </SContactListContainer>
                    <SButtonPanelWrapper>
                        <SButtonPanel>
                            <SButtonWrapper>
                                <SButton onClick={handleAddContact}>
                                    {'Add Contact'}
                                    <SIconWrapper>
                                        <IoPersonAdd />
                                    </SIconWrapper>
                                </SButton>
                            </SButtonWrapper>
                            <SButtonWrapper>
                                <SButton onClick={handleSearch}>
                                    {'Search'}
                                    <SIconWrapper>
                                        <MdOutlinePersonSearch />
                                    </SIconWrapper>
                                </SButton>
                            </SButtonWrapper>
                            <SButtonWrapper>
                                <SButton onClick={handlePowerOn}>
                                    {'Power'}
                                    <SIconWrapper>
                                        <CiPower />
                                    </SIconWrapper>
                                </SButton>
                            </SButtonWrapper>
                        </SButtonPanel>
                    </SButtonPanelWrapper>
                </SContactListContainerWrapper>
            </SContactListPanel>
        </Tilt>
    );
};

export default ContactsList;
