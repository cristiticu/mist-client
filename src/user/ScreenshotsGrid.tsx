import { useState } from 'react';
import { UserPhoto } from '../shared/hooks/usePhotos';
import { useScreenshots } from './hooks/useScreenshots';
import { IonGrid, IonRow, IonCol, IonImg, IonActionSheet, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { camera, close, trash, save } from 'ionicons/icons';
import { useUpdateLicenseMutation } from '../licenses/service';

type Props = {
    userId: string;
    gameId: string;
};

export default function ScreenshotsGrid({ userId, gameId }: Props) {
    const { screenshots, takePhoto, deletePhoto } = useScreenshots(userId, gameId);
    const [selectedScreenshot, setSelectedScreenshot] = useState<UserPhoto>();

    const [updateLicense] = useUpdateLicenseMutation();

    return (
        <>
            <IonGrid>
                <IonRow>
                    {screenshots.map((screenshot, index) => (
                        <IonCol
                            size="4"
                            key={index}
                        >
                            <IonImg
                                onClick={() => setSelectedScreenshot(screenshot)}
                                src={screenshot.webviewPath}
                            />
                        </IonCol>
                    ))}
                </IonRow>
            </IonGrid>
            <IonFab
                vertical="bottom"
                horizontal="center"
                slot="fixed"
            >
                <IonFabButton onClick={() => takePhoto()}>
                    <IonIcon icon={camera} />
                </IonFabButton>
            </IonFab>
            <IonActionSheet
                isOpen={!!selectedScreenshot}
                buttons={[
                    {
                        text: 'Set as display',
                        role: 'selected',
                        icon: save,
                        handler: () => {
                            if (selectedScreenshot && selectedScreenshot.webviewPath) {
                                updateLicense({ game_id: gameId, custom_image_src: selectedScreenshot.webviewPath });
                            }
                        },
                    },
                    {
                        text: 'Delete',
                        role: 'destructive',
                        icon: trash,
                        handler: () => {
                            if (selectedScreenshot) {
                                deletePhoto(selectedScreenshot);
                                setSelectedScreenshot(undefined);
                            }
                        },
                    },
                    {
                        text: 'Cancel',
                        icon: close,
                        role: 'cancel',
                    },
                ]}
                onDidDismiss={() => setSelectedScreenshot(undefined)}
            />
        </>
    );
}
