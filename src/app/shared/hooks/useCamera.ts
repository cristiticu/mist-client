import { useCallback } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export function useCamera() {
    const getPhoto = useCallback(() => {
        return Camera.getPhoto({
            resultType: CameraResultType.Base64,
            source: CameraSource.Camera,
            quality: 100,
        });
    }, []);

    return {
        getPhoto,
    };
}
