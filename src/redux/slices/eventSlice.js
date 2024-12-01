import { createSlice } from '@reduxjs/toolkit';

const eventSlice = createSlice({
    name: 'event',
    initialState: {
        events: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchEventsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchEventsSuccess: (state, action) => {
            state.loading = false;
            state.events = action.payload;
        },
        fetchEventsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export default eventSlice.reducer;