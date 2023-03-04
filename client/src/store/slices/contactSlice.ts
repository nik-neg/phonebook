import { createSlice } from '@reduxjs/toolkit';
import { State } from './types';

const initialState: State = {
    contacts: [],
    total: 0,
};

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        getTotalNumberOfContacts: (state, action) => {
            state.total = action.payload;
        },
        addContact: (state, action) => {
            state.contacts.push(action.payload);
        },
        removeContact: (state, action) => {
            state.contacts = state.contacts.filter(
                (contact) => contact.id !== action.payload
            );
        },
    },
});

export const { addContact, removeContact, getTotalNumberOfContacts } =
    contactsSlice.actions;

export default contactsSlice;
