import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './types';
import { Preferences } from '@capacitor/preferences';

const initialState: AuthState = {
    token: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            Preferences.set({ key: 'user', value: action.payload });
        },

        logout: (state) => {
            state.token = '';
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
