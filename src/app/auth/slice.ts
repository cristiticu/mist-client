import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './types';

const initialState: AuthState = {
    token: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },

        logout: (state) => {
            state.token = '';
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
