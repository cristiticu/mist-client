import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_BASE_URL } from '../../config';
import { Game } from '../games/types';
import { prepareHeaders } from '../auth/utils/prepareHeaders';
import { License, AddUserGameParams } from './types';

export const userApi = createApi({
    reducerPath: 'userApi',

    keepUnusedDataFor: 3600,

    tagTypes: ['UserGames'],

    baseQuery: fetchBaseQuery({
        baseUrl: BACKEND_BASE_URL,
        prepareHeaders: prepareHeaders,
    }),

    endpoints: (builder) => ({
        fetchUserGames: builder.query<Game[], void>({
            query: () => {
                return {
                    method: 'GET',
                    url: '/user/my-games',
                };
            },

            providesTags: ['UserGames'],
        }),

        addUserGame: builder.mutation<License, AddUserGameParams>({
            query: (args) => {
                const { gameId } = args;
                return {
                    method: 'POST',
                    url: `/user/add-game?game_id=${gameId}`,
                };
            },

            invalidatesTags: ['UserGames'],
        }),
    }),
});

export const { useFetchUserGamesQuery, useAddUserGameMutation } = userApi;
