import { useEffect, useState } from 'react';
import { App, AppState } from '@capacitor/app';
import { PluginListenerHandle } from '@capacitor/core';

const initialState = {
    isActive: true,
};

export const useAppState = () => {
    const [appState, setAppState] = useState(initialState);

    useEffect(() => {
        let handler: PluginListenerHandle;
        let canceled = false;

        const registerAppStateChange = async () => {
            handler = await App.addListener('appStateChange', handleAppStateChange);
        };

        const handleAppStateChange = (state: AppState) => {
            console.log('useAppState - state change', state);
            if (!canceled) {
                setAppState(state);
            }
        };

        registerAppStateChange();
        App.getState().then(handleAppStateChange);

        return () => {
            canceled = true;
            handler?.remove();
        };
    }, []);

    return { appState };
};
