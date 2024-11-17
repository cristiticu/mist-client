import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonButton, IonGrid, IonCol, IonRow } from '@ionic/react';
import { useFetchOwnedGamesQuery } from '../licenses/service';

export default function OwnedGamesList() {
    const { data: games } = useFetchOwnedGamesQuery();

    return (
        <IonCard className="games-list-card">
            <IonCardHeader>
                <IonCardTitle>My Library</IonCardTitle>
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
                                        <IonCardContent>
                                            <IonButton
                                                size="small"
                                                onClick={(event) => event.stopPropagation()}
                                                routerLink={`/user/screenshots/${game.id}`}
                                            >
                                                View your screenshots
                                            </IonButton>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            ))}
                        </IonRow>
                    </IonGrid>
                )}
            </IonCardContent>
        </IonCard>
    );
}
