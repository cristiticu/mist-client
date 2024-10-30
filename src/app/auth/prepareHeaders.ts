import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/react';
import { RootState } from '../store';

export function prepareHeaders(headers: Headers, api: Pick<BaseQueryApi, 'getState' | 'extra' | 'endpoint' | 'type' | 'forced'>): Headers {
    const { getState } = api;
    const state = getState() as RootState;
    const token = state.auth.token;

    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
}
