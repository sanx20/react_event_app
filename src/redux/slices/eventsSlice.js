import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../../FirebaseConfig';

export const fetchAllEvents = createAsyncThunk('events/fetchAllEvents', async () => {
    const eventsRef = collection(FIREBASE_DB, 'events');
    const snapshot = await getDocs(eventsRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});

export const addEvent = createAsyncThunk('events/addEvent', async (eventData) => {
    const userId = FIREBASE_AUTH.currentUser.uid;
    const newEventRef = doc(collection(FIREBASE_DB, 'events'));
    const newEvent = { ...eventData, organizer: userId, createdAt: new Date().toISOString() };
    await setDoc(newEventRef, newEvent);
    return { id: newEventRef.id, ...newEvent };
});

export const toggleFavourite = createAsyncThunk('events/toggleFavourite', async (eventId, { getState }) => {
    const userId = FIREBASE_AUTH.currentUser.uid;
    const userDocRef = doc(FIREBASE_DB, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    const favourites = userDoc.exists() ? userDoc.data().favourites || [] : [];

    const updatedFavourites = favourites.includes(eventId)
        ? favourites.filter((id) => id !== eventId)
        : [...favourites, eventId];

    await setDoc(userDocRef, { favourites: updatedFavourites }, { merge: true });
    return updatedFavourites;
});

export const fetchUserFavourites = createAsyncThunk('events/fetchUserFavourites', async () => {
    const userId = FIREBASE_AUTH.currentUser.uid;
    const userDocRef = doc(FIREBASE_DB, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    return userDoc.exists() ? userDoc.data().favourites || [] : [];
});

export const editEvent = createAsyncThunk('events/editEvent', async ({ id, updatedData }) => {
    const eventRef = doc(FIREBASE_DB, 'events', id);
    await updateDoc(eventRef, updatedData);
    return { id, updatedData };
});

export const deleteEvent = createAsyncThunk('events/deleteEvent', async (id) => {
    const eventRef = doc(FIREBASE_DB, 'events', id);
    await deleteDoc(eventRef);
    return id;
});

const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        allEvents: [],
        myEvents: [],
        userFavourites: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllEvents.fulfilled, (state, action) => {
                state.allEvents = action.payload;
                state.myEvents = action.payload.filter(
                    (event) => event.organizer === FIREBASE_AUTH.currentUser?.uid
                );
            })
            .addCase(addEvent.fulfilled, (state, action) => {
                state.allEvents.push(action.payload);
                if (action.payload.organizer === FIREBASE_AUTH.currentUser?.uid) {
                    state.myEvents.push(action.payload);
                }
            })
            .addCase(toggleFavourite.fulfilled, (state, action) => {
                state.userFavourites = action.payload;
            })
            .addCase(fetchUserFavourites.fulfilled, (state, action) => {
                state.userFavourites = action.payload;
            })
            .addCase(editEvent.fulfilled, (state, action) => {
                const { id, updatedData } = action.payload;
                state.allEvents = state.allEvents.map((event) =>
                    event.id === id ? { ...event, ...updatedData } : event
                );
                state.myEvents = state.myEvents.map((event) =>
                    event.id === id ? { ...event, ...updatedData } : event
                );
            })
            .addCase(deleteEvent.fulfilled, (state, action) => {
                const id = action.payload;
                state.allEvents = state.allEvents.filter((event) => event.id !== id);
                state.myEvents = state.myEvents.filter((event) => event.id !== id);
            });
    },
});

export default eventsSlice.reducer;
