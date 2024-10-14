import { configureStore } from '@reduxjs/toolkit';
import { gamesApi } from './games/service';

export const store = configureStore({
    reducer: {
        [gamesApi.reducerPath]: gamesApi.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(gamesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
