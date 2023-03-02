import { IPhoneNumber } from '../../ContactsList/ContactCard/types';

export const convertPhoneNumbersToString = (
    phoneNumbers: IPhoneNumber[] | undefined
) => {
    return phoneNumbers?.map((entry) => entry.phoneNumber)?.join(', ') ?? '';
};
