import { useCallback, useEffect, useState } from 'react';
import { useCamera } from './useCamera';
import { useFilesystem } from './useFilesystem';
import { usePreferences } from './usePreferences';
import { PHOTOS_PREFERENCES_KEY } from '../../config';

export type UserPhoto = {
    filepath: string;
    webviewPath?: string;
};

export function usePhotos() {
    const [photos, setPhotos] = useState<UserPhoto[]>([]);

    const { getPhoto } = useCamera();
    const { readFile, writeFile, deleteFile } = useFilesystem();
    const { get, set } = usePreferences();

    const PHOTOS_KEY = `${PHOTOS_PREFERENCES_KEY}`;

    const takePhoto = useCallback(async () => {
        const data = await getPhoto();
        const filepath = new Date().getTime() + '.jpeg';

        await writeFile(filepath, data.base64String!);

        const webviewPath = `data:image/jpeg;base64,${data.base64String}`;
        const newPhoto = { filepath, webviewPath };
        const newPhotos = [newPhoto, ...photos];

        await set(PHOTOS_KEY, JSON.stringify(newPhotos.map((p) => ({ filepath: p.filepath }))));
        setPhotos(newPhotos);
    }, [PHOTOS_KEY, getPhoto, photos, set, writeFile]);

    const deletePhoto = useCallback(
        async (photo: UserPhoto) => {
            const newPhotos = photos.filter((p) => p.filepath !== photo.filepath);
            await set(PHOTOS_KEY, JSON.stringify(newPhotos));
            await deleteFile(photo.filepath);
            setPhotos(newPhotos);
        },
        [PHOTOS_KEY, deleteFile, photos, set]
    );

    useEffect(() => {
        const loadSavedPhotos = async () => {
            const savedPhotoString = await get(PHOTOS_KEY);
            const savedPhotos: UserPhoto[] = savedPhotoString ? JSON.parse(savedPhotoString) : [];

            for (const photo of savedPhotos) {
                const data = await readFile(photo.filepath);
                photo.webviewPath = `data:image/jpeg;base64,${data}`;
            }

            setPhotos(savedPhotos);
        };

        loadSavedPhotos();
    }, [PHOTOS_KEY, get, readFile]);

    return {
        photos,
        takePhoto,
        deletePhoto,
    };
}
