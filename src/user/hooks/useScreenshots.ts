import { useCallback, useEffect, useState } from 'react';
import { useCamera } from '../../shared/hooks/useCamera';
import { useFilesystem } from '../../shared/hooks/useFilesystem';
import { usePreferences } from '../../shared/hooks/usePreferences';
import { PHOTOS_PREFERENCES_KEY } from '../../config';

export type UserPhoto = {
    filepath: string;
    webviewPath?: string;
};

export function useScreenshots(userId: string, gameId: string) {
    const [screenshots, setScreenshots] = useState<UserPhoto[]>([]);

    const { getPhoto } = useCamera();
    const { readFile, writeFile, deleteFile } = useFilesystem();
    const { get, set } = usePreferences();

    const SCREENSHOTS_KEY = `${PHOTOS_PREFERENCES_KEY}:${userId}:${gameId}`;

    const takePhoto = useCallback(async () => {
        const data = await getPhoto();
        const filepath = new Date().getTime() + '.jpeg';

        await writeFile(filepath, data.base64String!);

        const webviewPath = `data:image/jpeg;base64,${data.base64String}`;
        const newScreenshot = { filepath, webviewPath };
        const newScreenshots = [newScreenshot, ...screenshots];

        await set(SCREENSHOTS_KEY, JSON.stringify(newScreenshots.map((p) => ({ filepath: p.filepath }))));
        setScreenshots(newScreenshots);
    }, [SCREENSHOTS_KEY, getPhoto, screenshots, set, writeFile]);

    const deletePhoto = useCallback(
        async (photo: UserPhoto) => {
            const newScreenshots = screenshots.filter((p) => p.filepath !== photo.filepath);
            await set(SCREENSHOTS_KEY, JSON.stringify(newScreenshots));
            await deleteFile(photo.filepath);
            setScreenshots(newScreenshots);
        },
        [SCREENSHOTS_KEY, deleteFile, screenshots, set]
    );

    useEffect(() => {
        const loadSavedScreenshots = async () => {
            const savedPhotoString = await get(SCREENSHOTS_KEY);
            const savedScreenshots: UserPhoto[] = savedPhotoString ? JSON.parse(savedPhotoString) : [];

            for (const photo of savedScreenshots) {
                const data = await readFile(photo.filepath);
                photo.webviewPath = `data:image/jpeg;base64,${data}`;
            }

            setScreenshots(savedScreenshots);
        };

        loadSavedScreenshots();
    }, [SCREENSHOTS_KEY, get, readFile]);

    return {
        screenshots,
        takePhoto,
        deletePhoto,
    };
}
