import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { contactsApi } from './api/contacts.api';
import contactSlice from './slices/contactSlice';

const rootReducer = combineReducers({
    contactsApi: contactsApi.reducer,
    contacts: contactSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(contactsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
