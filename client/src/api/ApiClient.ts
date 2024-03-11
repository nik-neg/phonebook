import axios from 'axios';
import { CreateUserInput, IFilterImageInput } from './types';
import { ContactWithPhoneNumbersAsStringWithoutId } from '../components/Dashboard/dialogs/UpdateDialog';
import { BASE_URL } from './constants';

export const createContact = async (
    contact: ContactWithPhoneNumbersAsStringWithoutId
) => {
    try {
        const response = await axios.post(`${BASE_URL}`, {
            query: `mutation {
                      createContact(createContactInput: {
                        firstName: "${contact.firstName}",
                        lastName: "${contact.lastName}",
                        nickName: "${contact.nickName}",
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

export const createUser = async (user: CreateUserInput) => {
    try {
        const response = await axios.post(`${BASE_URL}`, {
            query: `mutation {
                      createUser(createOrReadUserInput: {
                        email: "${user.email}",
                        password: "${user.password}",
                      }) {
                        id,
                        email,
                        password,
                        nickName,
                        contacts {
                            id
                            firstName,
                            lastName,
                            nickName,
                            phoneNumbers {
                                id
                                phoneNumber
                            },
                            address,
                            imageFile,
                        },
                      }
                }`,
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const readUser = async (user: CreateUserInput) => {
    try {
        const response = await axios.post(`${BASE_URL}`, {
            query: `query {
                      getUser(createOrReadUserInput: {
                        email: "${user.email}",
                        password: "${user.password}",
                      }) {
                        id,
                        email,
                        password,
                        nickName,
                        contacts {
                            id
                            firstName,
                            lastName,
                            nickName,
                            phoneNumbers {
                                id
                                phoneNumber
                            },
                            address,
                            imageFile,
                        },
                      }
                }`,
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};

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
