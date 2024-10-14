import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';
import GameDetails from '../GameDetails';

type Props = RouteComponentProps<{
    id: string;
}>;

export default function GameDetailsPage({ match }: Props) {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Game Details</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Blank</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <GameDetails id={match.params.id} />
            </IonContent>
        </IonPage>
    );
}
