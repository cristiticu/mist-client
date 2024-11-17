import './Games.css';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonImg, IonRow } from '@ionic/react';
import { useState } from 'react';
import { useFetchGamesQuery } from './service';

export default function StoreGames() {
    const [currentOffset, setCurrentOffset] = useState<number>(0);
    const { data: games } = useFetchGamesQuery({ offset: currentOffset, limit: 5 });

    const handlePageClicked = (direction: 'next' | 'previous') => {
        if (direction === 'next') {
            setCurrentOffset(currentOffset + 5);
        } else {
            setCurrentOffset(currentOffset - 5);
        }
    };

    return (
        <IonCard className="games-list-card">
            <IonCardHeader>
                <IonCardTitle>Available games</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                {games && (
                    <IonGrid>
                        <IonRow>
                            {games.map((game) => (
                                <IonCol
                                    size="6"
                                    key={game.id}
                                >
                                    <IonCard routerLink={`/games/${game.id}`}>
                                        <IonImg
                                            alt=""
                                            src={game.image_src || undefined}
                                        />
                                        <IonCardHeader>
                                            <IonCardTitle>{game.title}</IonCardTitle>
                                        </IonCardHeader>
                                    </IonCard>
                                </IonCol>
                            ))}
                        </IonRow>
                    </IonGrid>
                )}
                <IonButton
                    disabled={currentOffset <= 0}
                    onClick={() => handlePageClicked('previous')}
                >
                    Previous
                </IonButton>
                <IonButton
                    disabled={games && games.length < 5}
                    onClick={() => handlePageClicked('next')}
                >
                    Next
                </IonButton>
            </IonCardContent>
        </IonCard>
    );
}
