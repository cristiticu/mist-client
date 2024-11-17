import { Preferences } from '@capacitor/preferences';
import { useCallback } from 'react';

export function usePreferences() {
    const get = useCallback(async (key: string) => {
        const result = await Preferences.get({ key });

        return result.value;
    }, []);

    const set = useCallback(async (key: string, value: string) => {
        await Preferences.set({ key, value });
    }, []);

    return { get, set };
}
