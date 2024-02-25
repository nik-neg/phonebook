import {
    SButton,
    SButtonContainer,
    SButtonPanel,
    SButtonPanelWrapper,
    SButtonRow,
    SButtonWrapper,
    SContactCardsContainer,
    SContactListContainer,
    SContactListContainerPanel,
    SContactListContainerWrapper,
    SContactListPanel,
    SContactListWrapper,
    SearchBarContainer,
} from './ContactsList.styles';
import { IContactListProps } from './types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    useGetContactsQuery,
    useLazyGetContactsQuery,
} from '../../../store/api/contacts.api';
import { CiPower, IoPersonAdd, MdOutlinePersonSearch } from 'react-icons/all';
import { useAppDispatch, useAppSelector } from '../../../store';
import { selectTotalNumberOfContacts } from '../../../store/selectors/contacts.selector';
import { getTotalNumberOfContacts } from '../../../store/slices';
import { debounce } from 'lodash-es';
import Tilt from 'react-parallax-tilt';
import { SearchBar } from '../dialogs/common/SearchBar';
import { CONTACTS_PER_PAGE } from './constants';
import { ContactCard } from './ContactCard';
import { Spacer } from '../../common/Spacer';
import { shouldActivate } from '../../../utils';

export const ContactsList = ({
    contacts,
    onAddContact,
    onFetchContacts,
    onRemoveContact,
    onHandleSearch,
}: IContactListProps): JSX.Element => {
    const dispatch = useAppDispatch();

    const totalNumberOfContacts = useAppSelector(selectTotalNumberOfContacts);

    const outerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    const [page, setPage] = useState(1);

    const [scroll, setScroll] = useState(0);

    const [getContacts] = useLazyGetContactsQuery();

    const [isDeviceOn, setIsDeviceOn] = useState(true);

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
        if (isDeviceOn) {
            onFetchContacts?.([]);
        }
        setIsDeviceOn(!isDeviceOn);
    };

    const reloadCondition = totalNumberOfContacts - page * CONTACTS_PER_PAGE;

    const loadMoreContacts = useCallback(
        async (outerElem: HTMLDivElement) => {
            setTimeout(async () => {
                let newContacts;

                const { scrollTop, clientHeight } = outerElem;
                setScroll(scrollTop);

                if (
                    !(scrollTop < scroll) &&
                    scrollTop < clientHeight &&
                    totalNumberOfContacts >= page * CONTACTS_PER_PAGE
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
        [page, reloadCondition]
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

    const [content, setContent] = useState<string>('');

    const handleSearch = (value: string) => {
        setContent(value);
        onHandleSearch?.(value);
    };

    const handleButtonSearch = () => {
        onHandleSearch?.(content);
    };

    return (
        <Tilt>
            <SContactListPanel>
                <SContactListContainerWrapper>
                    <SContactListContainerPanel>
                        {shouldActivate(
                            import.meta.env.VITE_SEARCH_BAR_WITHOUT_BUTTON
                        ) && (
                            <SearchBarContainer>
                                <Spacer height={10} />
                                <SearchBar onSearch={handleSearch} />
                                <Spacer height={10} />
                            </SearchBarContainer>
                        )}
                        <SContactListContainer ref={outerRef}>
                            <SContactListWrapper
                                contactsAreFetched={isDeviceOn}
                                ref={innerRef}
                            >
                                <SContactCardsContainer>
                                    {contacts.map(
                                        (contact, index) =>
                                            index < CONTACTS_PER_PAGE && (
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
                    </SContactListContainerPanel>

                    <SButtonPanelWrapper>
                        <SButtonPanel>
                            <SButtonWrapper>
                                <SButton
                                    onClick={handleAddContact}
                                    disableRipple
                                >
                                    <SButtonContainer>
                                        <SButtonRow>Add Contact</SButtonRow>
                                        <SButtonRow>
                                            <IoPersonAdd size={'1rem'} />
                                        </SButtonRow>
                                    </SButtonContainer>
                                </SButton>
                            </SButtonWrapper>
                            {!shouldActivate(
                                import.meta.env.VITE_SEARCH_BAR_WITHOUT_BUTTON
                            ) && (
                                <SButtonWrapper>
                                    <SButton
                                        onClick={handleButtonSearch}
                                        disableRipple
                                    >
                                        <SButtonContainer>
                                            <SButtonRow>Search</SButtonRow>
                                            <SButtonRow>
                                                <MdOutlinePersonSearch
                                                    size={'1rem'}
                                                />
                                            </SButtonRow>
                                        </SButtonContainer>
                                    </SButton>
                                </SButtonWrapper>
                            )}

                            <SButtonWrapper>
                                <SButton onClick={handlePowerOn} disableRipple>
                                    <SButtonContainer>
                                        <SButtonRow>Power</SButtonRow>
                                        <SButtonRow>
                                            <CiPower size={'1rem'} />
                                        </SButtonRow>
                                    </SButtonContainer>
                                </SButton>
                            </SButtonWrapper>
                        </SButtonPanel>
                    </SButtonPanelWrapper>
                </SContactListContainerWrapper>
            </SContactListPanel>
        </Tilt>
    );
};
