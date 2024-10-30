import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_BASE_URL } from '../../config';
import { Game } from '../games/types';
import { prepareHeaders } from '../auth/prepareHeaders';

export const userApi = createApi({
    reducerPath: 'userApi',

    keepUnusedDataFor: 3600,

    baseQuery: fetchBaseQuery({
        baseUrl: BACKEND_BASE_URL,
        prepareHeaders: prepareHeaders,
    }),

    endpoints: (builder) => ({
        fetchUserGames: builder.query<Game[], void>({
            query: (args) => {
                return {
                    method: 'GET',
                    url: '/user/my-games',
                };
            },
        }),
    }),
});
