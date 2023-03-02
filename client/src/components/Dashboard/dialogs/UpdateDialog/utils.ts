import { IPhoneNumber } from '../../ContactsList/ContactCard/types';

export const convertPhoneNumbersToString = (phoneNumbers: IPhoneNumber[]) => {
    return phoneNumbers?.map((entry) => entry.phoneNumber)?.join(', ');
};
