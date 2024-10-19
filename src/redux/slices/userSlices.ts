import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserData } from '../../utiltes/Type/main';

export interface State {
    isUserAuthenticated: boolean;
    userData: IUserData;
    token: string | null;
    loading: boolean;
}

const initialState: State = {
    isUserAuthenticated: false,
    userData: {} as IUserData,
    token: null,
    loading: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.userData = {} as IUserData;
            state.isUserAuthenticated = false;
            state.token = null; // Clear token on logout
        },
        signinUser: (state, action: PayloadAction<{ userData: IUserData; token: string }>) => {
            state.isUserAuthenticated = true;
            state.userData = action.payload.userData;
            state.token = action.payload.token;
        },
        updateUserData: (state, action: PayloadAction<IUserData>) => {
            state.userData = action.payload; // Directly replace old data with new data
        },
    },
});

export const { logoutUser, signinUser, updateUserData } = userSlice.actions;
export default userSlice.reducer;
