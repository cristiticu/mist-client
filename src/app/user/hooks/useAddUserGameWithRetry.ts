import { useCallback, useEffect, useState } from 'react';
import { useAddUserGameMutation } from '../service';
import { useNetwork } from '../../shared/hooks/useNetwork';

export default function useAddUserGameWithRetry() {
    const [gameIdToAdd, setGameIdToAdd] = useState<string | null>(null);
    const [error, setError] = useState<boolean>(false);
    const networkStatus = useNetwork();

    const [addGame, { isLoading: isAddingGame }] = useAddUserGameMutation();

    const addUserGame = useCallback(
        async (gameId: string) => {
            try {
                await addGame({ gameId }).unwrap();
            } catch (error) {
                setGameIdToAdd(gameId);
                setError(true);
            }
        },
        [addGame]
    );

    useEffect(() => {
        if (networkStatus.connected && gameIdToAdd) {
            console.log('Should do');
        }
    }, [gameIdToAdd, networkStatus.connected]);

    return {
        addUserGame,
        isAddingGame,
        error,
    };
}
