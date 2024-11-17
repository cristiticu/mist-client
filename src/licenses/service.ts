import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_BASE_URL } from '../config';
import { prepareHeaders } from '../auth/utils/prepareHeaders';
import { License, AddLicenseParams, OwnedGame } from './types';

export const licensesApi = createApi({
    reducerPath: 'licensesApi',

    keepUnusedDataFor: 3600,

    tagTypes: ['OwnedGames'],

    baseQuery: fetchBaseQuery({
        baseUrl: BACKEND_BASE_URL,
        prepareHeaders: prepareHeaders,
    }),

    endpoints: (builder) => ({
        fetchOwnedGames: builder.query<OwnedGame[], void>({
            query: () => {
                return {
                    method: 'GET',
                    url: '/license',
                };
            },

            providesTags: [{ type: 'OwnedGames', id: 'LIST' }],
        }),

        addOwnedGame: builder.mutation<License, AddLicenseParams>({
            query: (args) => {
                const { gameId } = args;
                return {
                    method: 'POST',
                    url: `/license?game_id=${gameId}`,
                };
            },

            invalidatesTags: [{ type: 'OwnedGames', id: 'LIST' }],
        }),
    }),
});

export const { useFetchOwnedGamesQuery, useAddOwnedGameMutation } = licensesApi;
