import {
    configureStore,
    createSlice,
    getDefaultMiddleware,
    PayloadAction,
} from "@reduxjs/toolkit";
import {IMessage} from "../shared";

const counterSlice = createSlice({
    name: "stream",
    initialState: {
        messages: new Array<IMessage>(),
        remoteStreams: new Array<MediaStream>(),
    },
    reducers: {
        pushMessages: (state, payload: PayloadAction<IMessage>) => {
            state.messages = [...state.messages, payload.payload];
        },
        pushRemoteStream: (state, payload: PayloadAction<MediaStream>) => {
            state.remoteStreams = [...state.remoteStreams, payload.payload];
        },
        sliceRemoteStream: (state, payload: PayloadAction<number>) => {
            state.remoteStreams.splice(payload.payload, 1);
        },
        clear: (state) => {
            state.messages = [];
            state.remoteStreams = [];
        },
    },
});

export const {pushMessages, pushRemoteStream, sliceRemoteStream, clear} = counterSlice.actions

export const store = configureStore({
    reducer: counterSlice.reducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['stream/pushRemoteStream', 'stream/sliceRemoteStream'],
            ignoreState: true
        },
    }),
})