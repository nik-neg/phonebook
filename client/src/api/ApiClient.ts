import { IContact } from '../components/Dashboard/ContactsList/ContactCard/types';
import axios from 'axios';

const baseUrl = 'http://localhost:3001/graphql';

export const createContact = async (contact: IContact) => {
    try {
        const response = await axios.post(`${baseUrl}`, {
            query: contact,
        });
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
};
