import axios from 'axios';
import { IFilterImageInput } from './types';
import { ContactWithPhoneNumbersAsString } from '../components/Dashboard/dialogs/UpdateDialog';
import { BASE_URL } from './constants';

export const createContact = async (
    contact: ContactWithPhoneNumbersAsString
) => {
    try {
        const response = await axios.post(`${BASE_URL}`, {
            query: `mutation {
                      createContact(createContactInput: {
                        firstName: "${contact.firstName}",
                        lastName: "${contact.lastName}",
                        phoneNumbers: "${contact.phoneNumbers}",
                        address: "${contact.address}"
                        imageFile: "${contact.imageFile}",
                      }) {
                        id,
                        firstName,
                        lastName,
                        nickName,
                        phoneNumbers {
                            id
                            phoneNumber
                        },
                        address,
                        imageFile
                      }
                }`,
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};

// uuid

export const prefetchFilteredImage = async (
    filterImageInput: IFilterImageInput
) => {
    try {
        const response = await axios.post(`${BASE_URL}`, {
            query: `{
                   filterImage(filterImageInput: {
                      imageFile: "${filterImageInput.imageFile}",
                      blur: ${filterImageInput.blur},
                      grayscale: ${filterImageInput.grayscale},
                      saturation: ${filterImageInput.saturation},
                    })
                }`,
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};
