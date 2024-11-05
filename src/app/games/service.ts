import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_BASE_URL, BACKEND_WEBSOCKET_URL } from '../../config';
import { FetchGameParams, FetchGamesParams, Game } from './types';

export const gamesApi = createApi({
    reducerPath: 'gamesApi',

    keepUnusedDataFor: 3600,

    baseQuery: fetchBaseQuery({ baseUrl: BACKEND_BASE_URL }),

    tagTypes: ['Game'],

    endpoints: (builder) => ({
        fetchGames: builder.query<Game[], FetchGamesParams>({
            query: (args) => {
                const { limit, offset } = args;
                return {
                    method: 'GET',
                    url: `/games?limit=${limit}&offset=${offset}`,
                };
            },

            providesTags: (result, error, args) => [{ type: 'Game', id: '*' }],

            // serializeQueryArgs: () => {
            //     return '';
            // },

            // forceRefetch: ({ currentArg, previousArg }) => {
            //     if (!currentArg || !previousArg) {
            //         return true;
            //     }

            //     return currentArg.offset > previousArg.offset;
            // },

            // merge: (currentCacheData, responseData) => {
            //     return currentCacheData.concat(responseData);
            // },

            // onCacheEntryAdded: async (args, api) => {
            //     const { cacheDataLoaded, cacheEntryRemoved, dispatch } = api;
            //     const webSocket = new WebSocket(`${BACKEND_WEBSOCKET_URL}/games`);

            //     try {
            //         await cacheDataLoaded;

            //         const listener = (event: MessageEvent) => {
            //             const message = JSON.parse(event.data);

            //             if (message.type === 'notification') {
            //                 dispatch(gamesApi.util.invalidateTags([{ type: 'Game', id: '*' }]));
            //             }

            //             if (message.type === 'heartbeat') {
            //                 webSocket.send(
            //                     JSON.stringify({
            //                         type: 'heartbeat',
            //                     })
            //                 );
            //             }
            //         };

            //         webSocket.addEventListener('message', listener);
            //     } catch (error) {}

            //     await cacheEntryRemoved;
            //     webSocket.close();
            // },
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

export const { useFetchGamesQuery, useFetchGameQuery } = gamesApi;
