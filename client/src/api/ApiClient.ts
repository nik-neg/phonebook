import { IContact } from '../components/Dashboard/ContactsList/ContactCard/types';
import axios from 'axios/index';

const baseUrl = 'http://localhost:3001';

export const createContact = async (contact: IContact) => {
    try {
        const response = await axios.post(`${baseUrl}/contact`, contact);
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
};
