import {
    SButton,
    SButtonContainer,
    SButtonPanel,
    SButtonPanelWrapper,
    SButtonRow,
    SButtonWrapper,
} from '../Dashboard/ContactsList';
import { CiPower, IoPersonAdd, MdOutlinePersonSearch } from 'react-icons/all';
import { shouldActivate } from '../../utils';
import React from 'react';

export const ButtonPanel = () => {
    return (
        <SButtonPanelWrapper>
            <SButtonPanel>
                <SButtonWrapper>
                    <SButton onClick={() => {}} disableRipple>
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
                        <SButton onClick={() => {}} disableRipple>
                            <SButtonContainer>
                                <SButtonRow>Search</SButtonRow>
                                <SButtonRow>
                                    <MdOutlinePersonSearch size={'1rem'} />
                                </SButtonRow>
                            </SButtonContainer>
                        </SButton>
                    </SButtonWrapper>
                )}

                <SButtonWrapper>
                    <SButton onClick={() => {}} disableRipple>
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
    );
};
