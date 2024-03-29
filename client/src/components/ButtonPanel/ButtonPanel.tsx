import { CiPower, IoPersonAdd, MdOutlinePersonSearch } from 'react-icons/all';
import { shouldActivate } from '../../utils';
import React from 'react';
import { IButtonPanelProps } from './types';
import {
    SButton,
    SButtonContainer,
    SButtonElement,
    SButtonPanel,
    SButtonPanelWrapper,
    SButtonRow,
    SButtonWrapper,
    SMuiColorInput,
    SVerticalSliderWrapper,
} from './ButtonPanel.styles';
import { VerticalSlider } from '../common/VerticalSlider/VerticalSlider';
import { MuiColorInput } from 'mui-color-input';

export const ButtonPanel = ({
    isDeviceOn,
    colorValue,
    onColorChange,
    onAddContact,
    onFetchContacts,
    toggleDevice,
    onOpenSearch,
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

    const handleChange = (newValue: string) => {
        onColorChange(newValue);
    };

    return (
        <SButtonPanelWrapper>
            <SButtonPanel
                $searchBarWithoutButton={shouldActivate(
                    import.meta.env.VITE_SEARCH_BAR_WITHOUT_BUTTON
                )}
            >
                <SButtonElement area={'color'}>
                    <SMuiColorInput>
                        <MuiColorInput
                            format="rgb"
                            value={colorValue}
                            onChange={handleChange}
                            isAlphaHidden
                        />
                    </SMuiColorInput>
                </SButtonElement>

                <SButtonElement area={'add-button'}>
                    <SButtonWrapper>
                        <SButton
                            onClick={handleAddContact}
                            $searchBarWithoutButton={shouldActivate(
                                import.meta.env.VITE_SEARCH_BAR_WITHOUT_BUTTON
                            )}
                            disableRipple
                        >
                            <SButtonContainer>
                                <SButtonRow>Add</SButtonRow>
                                <SButtonRow>
                                    <IoPersonAdd size={'1rem'} />
                                </SButtonRow>
                            </SButtonContainer>
                        </SButton>
                    </SButtonWrapper>
                </SButtonElement>
                {!shouldActivate(
                    import.meta.env.VITE_SEARCH_BAR_WITHOUT_BUTTON
                ) && (
                    <SButtonElement area={'search-button'}>
                        <SButtonWrapper>
                            <SButton onClick={onOpenSearch} disableRipple>
                                <SButtonContainer>
                                    <SButtonRow>Search</SButtonRow>
                                    <SButtonRow>
                                        <MdOutlinePersonSearch size={'1rem'} />
                                    </SButtonRow>
                                </SButtonContainer>
                            </SButton>
                        </SButtonWrapper>
                    </SButtonElement>
                )}
                <SButtonElement area={'power-button'}>
                    <SButtonWrapper>
                        <SButton
                            onClick={handlePowerOn}
                            $searchBarWithoutButton={shouldActivate(
                                import.meta.env.VITE_SEARCH_BAR_WITHOUT_BUTTON
                            )}
                            disableRipple
                        >
                            <SButtonContainer>
                                <SButtonRow>Power</SButtonRow>
                                <SButtonRow>
                                    <CiPower size={'1rem'} />
                                </SButtonRow>
                            </SButtonContainer>
                        </SButton>
                    </SButtonWrapper>
                </SButtonElement>
                <SButtonElement area={'slider'}>
                    <SVerticalSliderWrapper>
                        <VerticalSlider />
                    </SVerticalSliderWrapper>
                </SButtonElement>
            </SButtonPanel>
        </SButtonPanelWrapper>
    );
};
