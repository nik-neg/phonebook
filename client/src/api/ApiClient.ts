import { IContact } from '../components/Dashboard/ContactsList/ContactCard/types';
import axios from 'axios';
import { IQueryPaginationInput } from './types';

const baseUrl = 'http://localhost:3001/graphql';

export const createContact = async (contact: IContact) => {
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

export const updateContact = async (contact: IContact) => {};

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

export const prefetchFilteredImage = async (image: string) => {
    try {
        const response = await axios.post(`${baseUrl}`, {
            query: `{
                  filterImage {
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
