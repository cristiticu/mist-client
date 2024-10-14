import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_BASE_URL, BACKEND_WEBSOCKET_URL } from '../../config';
import { FetchGameParams, Game } from './types';

export const gamesApi = createApi({
    reducerPath: 'gamesApi',

    keepUnusedDataFor: 3600,

    baseQuery: fetchBaseQuery({ baseUrl: BACKEND_BASE_URL }),

    tagTypes: ['Game'],

    endpoints: (builder) => ({
        fetchAllGames: builder.query<Game[], void>({
            query: () => {
                return {
                    method: 'GET',
                    url: '/games',
                };
            },

            providesTags: (result, error, args) => [{ type: 'Game', id: '*' }],

            onCacheEntryAdded: async (args, api) => {
                const { cacheDataLoaded, cacheEntryRemoved, dispatch } = api;
                const webSocket = new WebSocket(`${BACKEND_WEBSOCKET_URL}/games`);

                try {
                    await cacheDataLoaded;

                    const listener = (event: MessageEvent) => {
                        if (typeof event.data === 'string' && event.data === '0xAA') {
                            dispatch(gamesApi.util.invalidateTags([{ type: 'Game', id: '*' }]));
                        }
                    };

                    webSocket.addEventListener('message', listener);
                } catch (error) {}

                await cacheEntryRemoved;
                webSocket.close();
            },
        }),

        fetchGame: builder.query<Game, FetchGameParams>({
            query: (args) => {
                const { id } = args;

                return {
                    method: 'GET',
                    url: `/games/${id}`,
                };
            },

            providesTags: (result, error, args) => [{ type: 'Game', id: args.id }],
        }),
    }),
});

export const { useFetchAllGamesQuery, useFetchGameQuery } = gamesApi;
