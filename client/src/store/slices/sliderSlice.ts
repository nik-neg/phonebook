import { createSlice } from '@reduxjs/toolkit';

export const sliderSlice = createSlice({
    name: 'slider',
    initialState: {
        value: 10,
    },
    reducers: {
        updated: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { updated } = sliderSlice.actions;
