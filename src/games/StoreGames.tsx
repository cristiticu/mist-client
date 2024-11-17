import './Games.css';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import { useState } from 'react';
import { useFetchGamesQuery } from './service';
import GamesList from './GamesList';

export default function StoreGames() {
    const [currentOffset, setCurrentOffset] = useState<number>(0);
    const { data: games } = useFetchGamesQuery({ offset: currentOffset, limit: 5 });

    const showList = games;

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
                {showList && <GamesList games={games} />}
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
