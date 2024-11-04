import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_BASE_URL } from '../../config';
import { LoginResponse, LoginParams } from './types';
import { login, logout } from './slice';

export const authApi = createApi({
    reducerPath: 'authApi',

    keepUnusedDataFor: 3600,

    baseQuery: fetchBaseQuery({ baseUrl: BACKEND_BASE_URL }),

    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginParams>({
            query: (args) => {
                const bodyFormData = new FormData();
                bodyFormData.append('username', args.username);
                bodyFormData.append('password', args.password);

                return {
                    method: 'POST',
                    url: '/auth/login',
                    body: bodyFormData,
                };
            },

            onQueryStarted: async (args, api) => {
                const { dispatch, queryFulfilled } = api;

                try {
                    const { data } = await queryFulfilled;

                    dispatch(login(data.access_token));
                } catch (error) {
                    dispatch(logout());
                }
            },
        }),
    }),
});

export const { useLoginMutation } = authApi;
