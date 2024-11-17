import { Directory, Filesystem } from '@capacitor/filesystem';
import { useCallback } from 'react';

export function useFilesystem() {
    const readFile = useCallback(async (path: string) => {
        const result = await Filesystem.readFile({
            path,
            directory: Directory.Data,
        });

        return result.data;
    }, []);

    const writeFile = useCallback(async (path: string, data: string) => {
        const result = await Filesystem.writeFile({
            path,
            data,
            directory: Directory.Data,
        });

        return result.uri;
    }, []);

    const deleteFile = useCallback(async (path: string) => {
        await Filesystem.deleteFile({
            path,
            directory: Directory.Data,
        });
    }, []);

    return {
        readFile,
        writeFile,
        deleteFile,
    };
}
