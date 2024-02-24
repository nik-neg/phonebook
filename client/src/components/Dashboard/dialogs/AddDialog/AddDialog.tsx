import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
    ESuggestionType,
    IAddDialogProps,
    IAddDialogState,
    IFilter,
    SuggestionState,
} from './types';
import { SAddDialogContainer, SDialog } from './AddDialog.styles';
import {
    createContact,
    prefetchFilteredImage,
} from '../../../../api/ApiClient';
import { ImageFilter } from '../common/ImageFilter';
import { useForm } from 'react-hook-form';
import { addContactSchema } from './validation/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { ContactWithPhoneNumbersAsString } from '../UpdateDialog';
import '@algolia/autocomplete-theme-classic';
import { AutoCompleteWrapper } from '../../../common/Autocomplete';
import { SUploadButtonWrapper, UploadButton } from '../common/UploadButton';
import { Spacer } from '../../../common/Spacer';
import { HALF_REM, ONE_REM } from '../../../common/Spacer/constants';
import { AddressAutoComplete } from '../../../common/AddressAutoComplete/AddressAutoComplete';
import TextField from '@mui/material/TextField';

export const AddDialog = (props: IAddDialogProps): JSX.Element => {
    const { onClose, open } = props;

    const defaultValues: IAddDialogState = {
        firstName: '',
        lastName: '',
        nickName: '',
        imageFile: '',
        address: '',
        phoneNumbers: '',
    };

    const {
        register,
        trigger,
        formState: { errors, isValid },
        getValues,
        setValue,
        reset,
    } = useForm({
        defaultValues,
        resolver: yupResolver(addContactSchema),
    });

    const handleSetValue = (name: keyof IAddDialogState, value: string) => {
        setValue(name, value);
    };

    const [contact, setContact] = useState<
        Partial<ContactWithPhoneNumbersAsString>
    >({
        firstName: '',
        lastName: '',
        nickName: '',
        imageFile: '',
        address: '',
        phoneNumbers: '',
    });

    const handleClose = () => {
        clearForm();
        onClose?.();
    };

    const triggerValidation = async (): Promise<boolean> => {
        let lastName = false;
        let firstName = false;
        let address = false;
        let phoneNumbers = false;
        let imageFile = false;
        try {
            lastName = await trigger('lastName');
            firstName = await trigger('firstName');

            address = await trigger('address');
            phoneNumbers = await trigger('phoneNumbers');
            imageFile = await trigger('imageFile');
        } catch (e) {
            console.log(e);
        }

        return lastName && firstName && address && phoneNumbers && imageFile;
    };

    const clearForm = () => {
        reset(defaultValues);
        setValue('imageFile', '');
        setContact(getValues());
    };

    const handleSave = async () => {
        try {
            if (await triggerValidation()) {
                await createContact(getValues());
                clearForm();
                setIsSuggestionsVisible(defaultSuggestionsVisible);
                onClose?.();
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleUploadImage = async (
        imagePath: string | ArrayBuffer
    ): Promise<void> => {
        setValue('imageFile', imagePath.toString());
        setContact(getValues());
    };

    const [filter, setFilter] = useState<IFilter>({
        blur: 0,
        grayscale: false,
        saturation: 0,
    });

    const handleFilter = async (filter: IFilter) => {
        setFilter(filter);
    };

    const [loading, setLoading] = useState<boolean>(false);

    const filterImage = async () => {
        setLoading(true);
        let image;
        try {
            image = await prefetchFilteredImage({
                imageFile: contact.imageFile,
                ...filter,
            });
        } catch (e) {
            console.log(e);
        }
        setLoading(false);

        setContact({ ...contact, imageFile: image?.data?.data?.filterImage });
        setValue('imageFile', image?.data?.data?.filterImage);
    };

    const defaultSuggestionsVisible: SuggestionState = {
        'autocomplete-portal-firstname': true,
        'autocomplete-portal-lastname': true,
        'autocomplete-portal-username': true,
        'autocomplete-portal-dial_code': true,
        'autocomplete-address': true,
    };
    const [isSuggestionsVisible, setIsSuggestionsVisible] =
        useState<SuggestionState>(defaultSuggestionsVisible);

    const onHandleSuggestionsVisible = (portalId: string, value: boolean) => {
        setIsSuggestionsVisible((prevState) => {
            return { ...prevState, [portalId]: value };
        });
    };

    return (
        <SAddDialogContainer>
            <SDialog open={open} onClose={handleClose}>
                <DialogTitle>Add Contact</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please type into the form:
                    </DialogContentText>

                    <Spacer height={HALF_REM} />

                    {isSuggestionsVisible[ESuggestionType.FIRST_NAME] ? (
                        <AutoCompleteWrapper
                            portalId={ESuggestionType.FIRST_NAME}
                            isSuggestionsVisible={
                                isSuggestionsVisible[ESuggestionType.FIRST_NAME]
                            }
                            onHandleSuggestionsVisible={
                                onHandleSuggestionsVisible
                            }
                            attributeName={'firstname'}
                            formFieldName={'firstName'}
                            handleSetValue={handleSetValue}
                        />
                    ) : (
                        <>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="First Name"
                                fullWidth
                                variant="standard"
                                {...register('firstName')}
                            />
                            {errors.firstName && (
                                <span style={{ color: 'red' }}>
                                    {errors.firstName.message}
                                </span>
                            )}
                        </>
                    )}

                    <Spacer height={ONE_REM} />

                    {isSuggestionsVisible[ESuggestionType.LAST_NAME] ? (
                        <AutoCompleteWrapper
                            portalId={ESuggestionType.LAST_NAME}
                            isSuggestionsVisible={
                                isSuggestionsVisible[ESuggestionType.LAST_NAME]
                            }
                            onHandleSuggestionsVisible={
                                onHandleSuggestionsVisible
                            }
                            attributeName={'lastname'}
                            formFieldName={'lastName'}
                            handleSetValue={handleSetValue}
                        />
                    ) : (
                        <>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Last Name"
                                fullWidth
                                variant="standard"
                                {...register('lastName')}
                            />
                            {errors.lastName && (
                                <span style={{ color: 'red' }}>
                                    {errors.lastName.message}
                                </span>
                            )}
                        </>
                    )}

                    <Spacer height={ONE_REM} />

                    {isSuggestionsVisible[ESuggestionType.USER_NAME] ? (
                        <AutoCompleteWrapper
                            portalId={ESuggestionType.USER_NAME}
                            isSuggestionsVisible={
                                isSuggestionsVisible[ESuggestionType.USER_NAME]
                            }
                            onHandleSuggestionsVisible={
                                onHandleSuggestionsVisible
                            }
                            attributeName={'username'}
                            formFieldName={'nickName'}
                            handleSetValue={handleSetValue}
                        />
                    ) : (
                        <>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Nickname"
                                fullWidth
                                variant="standard"
                                {...register('nickName')}
                            />
                        </>
                    )}

                    <Spacer height={ONE_REM} />

                    {isSuggestionsVisible[ESuggestionType.ADDRESS] ? (
                        <AddressAutoComplete
                            formFieldName={'address'}
                            handleSetValue={handleSetValue}
                        />
                    ) : (
                        <>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Address"
                                fullWidth
                                variant="standard"
                                {...register('address')}
                            />
                            {errors.address && (
                                <span style={{ color: 'red' }}>
                                    {errors.address.message}
                                </span>
                            )}
                        </>
                    )}

                    <Spacer height={ONE_REM} />

                    {isSuggestionsVisible[ESuggestionType.TELEPHONE] ? (
                        <AutoCompleteWrapper
                            portalId={ESuggestionType.TELEPHONE}
                            isSuggestionsVisible={
                                isSuggestionsVisible[ESuggestionType.TELEPHONE]
                            }
                            onHandleSuggestionsVisible={
                                onHandleSuggestionsVisible
                            }
                            attributeName={'dial_code'}
                            formFieldName={'phoneNumbers'}
                            handleSetValue={handleSetValue}
                        />
                    ) : (
                        <>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Phone Numbers"
                                fullWidth
                                variant="standard"
                                {...register('phoneNumbers')}
                            />
                            {errors.phoneNumbers && (
                                <span style={{ color: 'red' }}>
                                    {errors.phoneNumbers.message}
                                </span>
                            )}
                        </>
                    )}

                    <SUploadButtonWrapper>
                        <UploadButton onUpload={handleUploadImage} />
                    </SUploadButtonWrapper>
                    {errors.imageFile && (
                        <span style={{ color: 'red' }}>
                            {errors.imageFile.message}
                        </span>
                    )}
                    {contact.imageFile && (
                        <ImageFilter
                            contact={contact}
                            onFilter={handleFilter}
                            isFetchingImage={loading}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={filterImage}>Filter</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
                <div id="autocomplete-portal-firstname"></div>
                <div id="autocomplete-portal-lastname"></div>
                <div id="autocomplete-portal-username"></div>
                <div id="autocomplete-portal-dial_code"></div>
            </SDialog>
        </SAddDialogContainer>
    );
};
