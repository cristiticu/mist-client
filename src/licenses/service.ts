import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_BASE_URL } from '../config';
import { prepareHeaders } from '../auth/utils/prepareHeaders';
import { License, AddLicenseParams, UpdateLicenseParams } from './types';
import { Game } from '../games/types';

export const licensesApi = createApi({
    reducerPath: 'licensesApi',

    keepUnusedDataFor: 3600,

    tagTypes: ['License', 'OwnedGame'],

    baseQuery: fetchBaseQuery({
        baseUrl: BACKEND_BASE_URL,
        prepareHeaders: prepareHeaders,
    }),

    endpoints: (builder) => ({
        fetchLicenses: builder.query<Game[], void>({
            query: () => {
                return {
                    method: 'GET',
                    url: '/license',
                };
            },

            providesTags: [{ type: 'License', id: 'LIST' }],
        }),

        addLicense: builder.mutation<License, AddLicenseParams>({
            query: (args) => {
                const { gameId } = args;
                return {
                    method: 'POST',
                    url: `/license?game_id=${gameId}`,
                };
            },

            invalidatesTags: [
                { type: 'License', id: 'LIST' },
                { type: 'OwnedGame', id: 'LIST' },
            ],
        }),

        updateLicense: builder.mutation<License, UpdateLicenseParams>({
            query: (args) => {
                const { game_id, ...rest } = args;

                return {
                    method: 'PATCH',
                    url: `/license/${game_id}`,
                    body: rest,
                };
            },

            invalidatesTags: [
                { type: 'License', id: 'LIST' },
                { type: 'OwnedGame', id: 'LIST' },
            ],
        }),

        fetchOwnedGames: builder.query<Game[], void>({
            query: () => {
                return {
                    method: 'GET',
                    url: '/license/aggregate/owned-games',
                };
            },

            providesTags: [{ type: 'OwnedGame', id: 'LIST' }],
        }),
    }),
});

export const { useFetchLicensesQuery, useFetchOwnedGamesQuery, useAddLicenseMutation, useUpdateLicenseMutation } = licensesApi;
