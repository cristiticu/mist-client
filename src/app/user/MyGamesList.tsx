import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import { useFetchUserGamesQuery } from './service';
import GamesList from '../games/GamesList';

export default function MyGamesList() {
    const { data: games, isLoading: isLoadingGames } = useFetchUserGamesQuery();

    const showList = games && !isLoadingGames;
    return (
        <IonCard className="games-list-card">
            <IonCardHeader>
                <IonCardTitle>My Library</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{showList && <GamesList games={games} />}</IonCardContent>
        </IonCard>
    );
}
