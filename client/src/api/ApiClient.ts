import { IContact } from '../components/Dashboard/ContactsList/ContactCard/types';
import axios from 'axios';

const baseUrl = 'http://localhost:3001/graphql';

let config = {
    headers: {
        transferEncoding: 'chunked',
    },
};

export const createContact = async (contact: IContact) => {
    try {
        const response = await axios.post(
            `${baseUrl}`,
            {
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
            },
            config
        );
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
};
