import axios from 'axios';
import { IFilterImageInput, IQueryPaginationInput } from './types';
import { ContactWithPhoneNumbersAsString } from '../components/Dashboard/dialogs/UpdateDialog';

const baseUrl = 'http://localhost:3001/graphql';

export const createContact = async (
    contact: ContactWithPhoneNumbersAsString
) => {
    try {
        const response = await axios.post(`${baseUrl}`, {
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
export const getContact = async (id: number) => {
    try {
        const response = await axios.post(`${baseUrl}`, {
            query: `{
                        contact(id: ${id}) {
                            id
                            firstName
                            lastName
                            nickName
                            phoneNumbers {
                                id
                                phoneNumber
                            }
                            address
                            imageFile
                        }
                    }`,
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const getContacts = async (
    queryPaginationInput: IQueryPaginationInput
) => {
    try {
        const response = await axios.post(`${baseUrl}`, {
            query: `{
                    contacts(queryPaginationInput: {
                        keyword: "${queryPaginationInput?.keyword}",
                        take: ${queryPaginationInput?.take},
                        skip: ${queryPaginationInput?.skip},
                    }) {
                        id
                        firstName
                        lastName
                        nickName
                        phoneNumbers {
                            id
                            phoneNumber
                        }
                        address
                        imageFile
                    }
                }`,
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const updateContact = async (
    contact: ContactWithPhoneNumbersAsString,
    filterImageInput?: IFilterImageInput
) => {
    try {
        const response = await axios.post(`${baseUrl}`, {
            query: `mutation {
                      updateContact(id: ${contact.id}, updateContactInput: {
                        firstName: "${contact.firstName}"
                        lastName: "${contact.lastName}",
                        nickName: "${contact.nickName}",
                        phoneNumbers: "${contact.phoneNumbers}",
                        address: "${contact.address}",
                        imageFile: "${contact.imageFile}",
                        filter: {
                            blur: ${filterImageInput?.blur},
                            grayscale: ${filterImageInput?.grayscale},
                            saturation: ${filterImageInput?.saturation},  
                        }          
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

export const removeContact = async (id: number) => {
    try {
        const response = await axios.post(`${baseUrl}`, {
            query: `mutation {
                  removeContact(id: ${id}) {
                    firstName,
                    lastName,
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
        const response = await axios.post(`${baseUrl}`, {
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

export const fetchFilteredImage = async (id: number) => {
    try {
        const response = await axios.post(`${baseUrl}`, {
            query: `mutation {
                  removeContact(id: ${id}) {
                    firstName,
                    lastName,
                  }
                }`,
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};
