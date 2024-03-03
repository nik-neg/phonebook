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
import { selectSliderValue, useAppSelector } from '../../../store';
import { debounce } from 'lodash-es';
import { SearchBar } from '../dialogs/common/SearchBar';
import {
    SCROLL_DOWN_STEP,
    SCROLL_UP_STEP,
    SHINE_TIME_COEFFICIENT,
    SHINE_TIME_REFERENCE,
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
    const outerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    const [scroll, setScroll] = useState<number>(0);

    const { data, isLoading, isFetching } = useGetContactsQuery(
        { page },
        { skip: !isDeviceOn, refetchOnMountOrArgChange: true }
    );

    useEffect(() => {
        if (!isLoading && data?.length > 0 && !isFetching && isDeviceOn) {
            onFetchContacts?.(data);
        }
    }, [data, isLoading, isFetching, isDeviceOn]);

    const loadMoreContacts = useCallback(
        async (outerElem: HTMLDivElement) => {
            setTimeout(async () => {
                const { scrollTop, clientHeight } = outerElem;

                setScroll(scrollTop);

                if (
                    scrollTop >= scroll &&
                    scrollTop < clientHeight &&
                    scrollTop !== SCROLL_UP_STEP &&
                    scrollTop !== SCROLL_DOWN_STEP
                ) {
                    onPageChange(page + 1);
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

    const selectedSliderValue = useAppSelector(selectSliderValue);

    return (
        <SContactListPanel>
            <SContactListContainerWrapper>
                <SContactListContainerPanel
                    contactsAreFetched={isDeviceOn}
                    shineTimer={
                        SHINE_TIME_REFERENCE /
                        (selectedSliderValue / SHINE_TIME_COEFFICIENT)
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
                                    (contact: IContact, index: number) => (
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
                </SContactListContainerPanel>
            </SContactListContainerWrapper>
        </SContactListPanel>
    );
};
