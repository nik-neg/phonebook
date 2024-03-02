import {
    SContactCardsContainer,
    SContactListContainer,
    SContactListContainerPanel,
    SContactListContainerWrapper,
    SContactListPanel,
    SContactListWrapper,
    SDividerWrapper,
    SearchBarContainer,
} from './ContactsList.styles';
import { IContactListProps } from './types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useGetContactsQuery } from '../../../store/api/contacts.api';
import {
    selectSliderValue,
    useAppDispatch,
    useAppSelector,
} from '../../../store';
import { selectTotalNumberOfContacts } from '../../../store/selectors/contacts.selector';
import { getTotalNumberOfContacts } from '../../../store/slices';
import { debounce } from 'lodash-es';
import { SearchBar } from '../dialogs/common/SearchBar';
import {
    CONTACTS_PER_PAGE,
    SCROLL_DOWN_STEP,
    SCROLL_UP_STEP,
    SHINE_TIME_COEFFICIENT,
    SHINE_TIME_REFERENCE,
    START_SCROLL,
} from './constants';
import { ContactCard, IContact } from './ContactCard';
import { Spacer } from '../../common/Spacer';
import { shouldActivate } from '../../../utils';
import { SDivider } from '../../common/Divider';
import { parseColor } from '../../ButtonPanel/utils';

export const ContactsList = ({
    isDeviceOn,
    colorValue,
    page,
    contacts,
    onPageChange,
    onFetchContacts,
    onRemoveContact,
    onHandleSearch,
}: IContactListProps): JSX.Element => {
    const dispatch = useAppDispatch();

    const totalNumberOfContacts = useAppSelector(selectTotalNumberOfContacts);

    const outerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    const [scroll, setScroll] = useState(0);

    const { data, isLoading, isFetching } = useGetContactsQuery(
        { page },
        { skip: !isDeviceOn, refetchOnMountOrArgChange: true }
    );

    useEffect(() => {
        if (
            !isLoading &&
            data?.data?.getContacts?.contacts?.length > 0 &&
            !isFetching &&
            isDeviceOn
        ) {
            dispatch(getTotalNumberOfContacts(data?.data?.getContacts?.total));
            onFetchContacts?.(data?.data?.getContacts?.contacts);
        }
    }, [data, isLoading, isFetching, isDeviceOn]);

    const loadMoreContacts = useCallback(
        async (outerElem: HTMLDivElement) => {
            setTimeout(async () => {
                const { scrollTop, clientHeight } = outerElem;

                setScroll(scrollTop);

                const isNextPageLastPage =
                    totalNumberOfContacts < (page + 1) * CONTACTS_PER_PAGE;

                const hasMoreContacts =
                    totalNumberOfContacts - page * CONTACTS_PER_PAGE > 0;
                if (
                    // scroll down
                    scrollTop >= scroll &&
                    scrollTop < clientHeight &&
                    scrollTop !== SCROLL_UP_STEP &&
                    hasMoreContacts &&
                    scrollTop !== SCROLL_DOWN_STEP
                ) {
                    onPageChange(page + 1);
                    if (isNextPageLastPage) {
                        outerRef?.current?.scrollTo(0, SCROLL_DOWN_STEP);
                        setScroll(SCROLL_DOWN_STEP);
                    }
                } else if (
                    // scroll up
                    scrollTop <= scroll &&
                    !scrollTop &&
                    totalNumberOfContacts < page * CONTACTS_PER_PAGE
                ) {
                    const scrollBackOCondition = (page: number) =>
                        page - 1 > 1 ? page - 1 : 1;
                    onPageChange(scrollBackOCondition(page));

                    outerRef?.current?.scrollTo(0, SCROLL_UP_STEP);
                    setScroll(SCROLL_UP_STEP);
                } else if (
                    scrollTop !== SCROLL_UP_STEP &&
                    scrollTop !== SCROLL_DOWN_STEP
                ) {
                    // scroll up last page
                    const scrollBackOCondition = (page: number) =>
                        page - 1 > 1 ? page - 1 : 1;
                    onPageChange(scrollBackOCondition(page));

                    outerRef?.current?.scrollTo(0, START_SCROLL);
                    setScroll(START_SCROLL);
                }
            }, 500);
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
            await loadMoreContacts(outerElem);
        }, 100);

        outerElem.addEventListener('scroll', handleScroll);

        return () => {
            outerElem.removeEventListener('scroll', handleScroll);
        };
    }, [page]);

    const [content, setContent] = useState<string>('');

    const handleSearch = (value: string) => {
        setContent(value);
        onHandleSearch?.(value);
    };

    const handleButtonSearch = () => {
        onHandleSearch?.(content);
    };

    const sliderValue = useAppSelector(selectSliderValue);

    return (
        <SContactListPanel>
            <SContactListContainerWrapper>
                <SContactListContainerPanel
                    contactsAreFetched={isDeviceOn}
                    shineTimer={
                        SHINE_TIME_REFERENCE /
                        (sliderValue / SHINE_TIME_COEFFICIENT)
                    }
                    colorValue={parseColor(colorValue)}
                >
                    {shouldActivate(
                        import.meta.env.VITE_SEARCH_BAR_WITHOUT_BUTTON
                    ) && (
                        <SearchBarContainer>
                            <Spacer height={10} />
                            <SearchBar onSearch={handleSearch} />
                            <Spacer height={10} />
                            <SDividerWrapper>
                                <SDivider width={50} />
                            </SDividerWrapper>
                        </SearchBarContainer>
                    )}

                    <SContactListContainer ref={outerRef}>
                        <SContactListWrapper ref={innerRef}>
                            <SContactCardsContainer>
                                {contacts.map(
                                    (contact: IContact, index: number) =>
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
            </SContactListContainerWrapper>
        </SContactListPanel>
    );
};
