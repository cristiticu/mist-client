import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonThumbnail, IonLabel } from '@ionic/react';
import { useFetchUserGamesQuery } from './service';

export default function MyGamesList() {
    const { data: games, isLoading: isLoadingGames, isSuccess: isFetchGamesSuccess, isError: isFetchGamesError } = useFetchUserGamesQuery();

    const showList = games && isFetchGamesSuccess;
    const showError = isFetchGamesError;
    return (
        <IonCard className="games-list-card">
            <IonCardHeader>
                <IonCardTitle>My Library</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                {showList && (
                    <IonList>
                        {games.map((game) => (
                            <IonItem
                                key={game.id}
                                routerLink={`/games/${game.id}`}
                            >
                                <IonThumbnail
                                    className="item-thumbnail"
                                    slot="start"
                                >
                                    <img
                                        alt=""
                                        src={game.image_src}
                                    />
                                </IonThumbnail>
                                <IonLabel className="item-title">{game.title}</IonLabel>
                            </IonItem>
                        ))}
                    </IonList>
                )}
            </IonCardContent>
        </IonCard>
    );
}
