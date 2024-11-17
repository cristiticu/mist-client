import { useEffect, useState } from 'react';
import { Network, ConnectionStatus } from '@capacitor/network';
import { PluginListenerHandle } from '@capacitor/core';

const initialState = {
    connected: false,
    connectionType: 'unknown',
};

export const useNetwork = () => {
    const [networkStatus, setNetworkStatus] = useState(initialState);

    useEffect(() => {
        let handler: PluginListenerHandle;
        let canceled = false;

        async function registerNetworkStatusChange() {
            handler = await Network.addListener('networkStatusChange', handleNetworkStatusChange);
        }

        async function handleNetworkStatusChange(status: ConnectionStatus) {
            if (!canceled) {
                setNetworkStatus(status);
            }
        }

        registerNetworkStatusChange();

        Network.getStatus().then(handleNetworkStatusChange);

        return () => {
            canceled = true;
            handler?.remove();
        };
    }, []);

    return networkStatus;
};
