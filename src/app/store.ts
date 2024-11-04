import { configureStore } from '@reduxjs/toolkit';
import { gamesApi } from './games/service';
import { authApi } from './auth/service';
import authReducer from './auth/slice';
import { userApi } from './user/service';

export const store = configureStore({
    reducer: {
        [gamesApi.reducerPath]: gamesApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        auth: authReducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(gamesApi.middleware).concat(authApi.middleware).concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
