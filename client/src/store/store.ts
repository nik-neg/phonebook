import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { contactsApi } from './api/contacts.api';
import contactSlice from './slices/contactSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { sliderSlice } from './slices/sliderSlice';

const rootReducer = combineReducers({
    contactsApi: contactsApi.reducer,
    contacts: contactSlice.reducer,
    slider: sliderSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(contactsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
