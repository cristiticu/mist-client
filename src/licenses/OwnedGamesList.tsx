import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import { useFetchOwnedGamesQuery } from './service';
import GamesList from '../games/GamesList';

export default function OwnedGamesList() {
    const { data: games } = useFetchOwnedGamesQuery();

    return (
        <IonCard className="games-list-card">
            <IonCardHeader>
                <IonCardTitle>My Library</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{!!games && <GamesList games={games} />}</IonCardContent>
        </IonCard>
    );
}
