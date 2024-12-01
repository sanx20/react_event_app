import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './slices/eventSlice';

export const store = configureStore({
    reducer: {
        event: eventReducer,
    },
});
