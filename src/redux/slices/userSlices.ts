import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMedia, IUserData } from '../../utiltes/Type/main';

export interface State {
    isUserAuthenticated: boolean;
    userData: IUserData;
    token: string | null;
    loading: boolean;
    media: IMedia; // Add media to the state
}

const initialState: State = {
    isUserAuthenticated: false,
    userData: {} as IUserData,
    token: null,
    loading: false,
    media: {} as IMedia, // Initialize media as empty
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.userData = {} as IUserData;
            state.isUserAuthenticated = false;
            state.token = null; // Clear token on logout
            state.media = {} as IMedia; // Clear media on logout
        },
        signinUser: (state, action: PayloadAction<{ userData: IUserData; token: string; media: IMedia }>) => {
            state.isUserAuthenticated = true;
            state.userData = action.payload.userData;
            state.token = action.payload.token;
            state.media = action.payload.media; // Store media in state
        },
        updateUserData: (state, action: PayloadAction<IUserData>) => {
            state.userData = action.payload; // Directly replace old data with new data
        },
        updateMedia: (state, action: PayloadAction<IMedia>) => {
            state.media = action.payload; // Directly replace media with new media
        },
    },
});

export const { logoutUser, signinUser, updateUserData, updateMedia } = userSlice.actions;
export default userSlice.reducer;
