import { useCallback, useEffect, useState } from 'react';
import { useAddLicenseMutation } from '../service';
import { useNetwork } from '../../shared/hooks/useNetwork';

export default function useAddLicenseWithRetry() {
    const [gameIdToAdd, setGameIdToAdd] = useState<string | null>(null);
    const [error, setError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const networkStatus = useNetwork();

    const [addLicenseTrigger, { isLoading: isAddingGame }] = useAddLicenseMutation();

    const addLicense = useCallback(
        async (gameId: string) => {
            try {
                setSuccess(false);
                await addLicenseTrigger({ gameId }).unwrap();
                setSuccess(true);
            } catch (error) {
                setGameIdToAdd(gameId);
                setError(true);
            }
        },
        [addLicenseTrigger]
    );

    useEffect(() => {
        let interval: number;

        const retryAddGame = async (gameId: string) => {
            try {
                await addLicenseTrigger({ gameId }).unwrap();
                setGameIdToAdd(null);
                setError(false);
                setSuccess(true);
            } catch (error) {
                setError(true);
            }
        };

        if (networkStatus.connected && gameIdToAdd) {
            interval = window.setInterval(() => retryAddGame(gameIdToAdd), 10000);
        }

        return () => window.clearInterval(interval);
    }, [addLicenseTrigger, gameIdToAdd, networkStatus.connected]);

    return {
        addLicense,
        isAddingGame,
        error,
        success,
    };
}
