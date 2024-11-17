import { configureStore } from '@reduxjs/toolkit';
import { gamesApi } from './games/service';
import { authApi } from './auth/service';
import authReducer from './auth/slice';
import { userApi } from './user/service';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { licensesApi } from './licenses/service';

export const store = configureStore({
    reducer: {
        [gamesApi.reducerPath]: gamesApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [licensesApi.reducerPath]: licensesApi.reducer,
        auth: authReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(gamesApi.middleware).concat(authApi.middleware).concat(userApi.middleware).concat(licensesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
