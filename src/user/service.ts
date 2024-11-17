import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_BASE_URL } from '../config';
import { FetchUserParams, User } from './types';
import { prepareHeaders } from '../auth/utils/prepareHeaders';

export const userApi = createApi({
    reducerPath: 'usersApi',

    keepUnusedDataFor: 3600,

    tagTypes: ['User'],

    baseQuery: fetchBaseQuery({ baseUrl: BACKEND_BASE_URL, prepareHeaders: prepareHeaders }),

    endpoints: (builder) => ({
        fetchUsers: builder.query<User[], void>({
            query: () => {
                return {
                    method: 'GET',
                    url: '/user',
                };
            },

            providesTags: [{ type: 'User', id: 'LIST' }],
        }),

        fetchUser: builder.query<User, FetchUserParams>({
            query: (args) => {
                const { user_id } = args;

                return {
                    method: 'GET',
                    url: `/user/${user_id}`,
                };
            },

            providesTags: (result, error, args) => [{ type: 'User', id: args.user_id }],
        }),
    }),
});

export const { useFetchUserQuery, useFetchUsersQuery } = userApi;
