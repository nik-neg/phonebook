import { CiPower, IoPersonAdd, MdOutlinePersonSearch } from 'react-icons/all';
import { shouldActivate } from '../../utils';
import React from 'react';
import { IButtonPanelProps } from './types';
import { SButtonPanel, SButtonWrapper } from '../Dashboard/ContactsList';
import {
    SButton,
    SButtonContainer,
    SButtonPanelWrapper,
    SButtonRow,
} from './ButtonPanel.styles';
import { VerticalSlider } from '../common/VerticalSlider/VerticalSlider';

export const ButtonPanel = ({
    isDeviceOn,
    onAddContact,
    onFetchContacts,
    toggleDevice,
}: IButtonPanelProps) => {
    const handleAddContact = () => {
        onAddContact?.();
    };

    const handlePowerOn = async () => {
        if (isDeviceOn) {
            onFetchContacts?.([]);
        }
        toggleDevice();
    };
    return (
        <SButtonPanelWrapper>
            <SButtonPanel>
                <VerticalSlider />

                <SButtonWrapper>
                    <SButton onClick={handleAddContact} disableRipple>
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
    );
};
