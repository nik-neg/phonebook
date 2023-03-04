import { createSlice } from '@reduxjs/toolkit';
import { State } from './types';

const initialState: State = {
    contacts: [],
};

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
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

export const { addContact, removeContact } = contactsSlice.actions;

export default contactsSlice;
