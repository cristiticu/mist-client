import { useCallback, useEffect, useState } from 'react';
import { useAddUserGameMutation } from '../service';
import { useNetwork } from '../../shared/hooks/useNetwork';

export default function useAddUserGameWithRetry() {
    const [gameIdToAdd, setGameIdToAdd] = useState<string | null>(null);
    const [error, setError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const networkStatus = useNetwork();

    const [addGame, { isLoading: isAddingGame }] = useAddUserGameMutation();

    const addUserGame = useCallback(
        async (gameId: string) => {
            try {
                setSuccess(false);
                await addGame({ gameId }).unwrap();
                setSuccess(true);
            } catch (error) {
                setGameIdToAdd(gameId);
                setError(true);
            }
        },
        [addGame]
    );

    useEffect(() => {
        let interval: number;

        const retryAddGame = async (gameId: string) => {
            try {
                await addGame({ gameId }).unwrap();
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
    }, [addGame, gameIdToAdd, networkStatus.connected]);

    return {
        addUserGame,
        isAddingGame,
        error,
        success,
    };
}
