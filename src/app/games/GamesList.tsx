import './Games.css';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonList, IonThumbnail } from '@ionic/react';
import React from 'react';
import { useFetchAllGamesQuery } from './service';

export default function GamesList() {
    const { data: games, isLoading: isLoadingGames, isSuccess: isFetchGamesSuccess, isError: isFetchGamesError } = useFetchAllGamesQuery();

    const showList = games && isFetchGamesSuccess;
    const showError = isFetchGamesError;

    return (
        <IonCard className="games-list-card">
            <IonCardHeader>
                <IonCardTitle>Available games</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                {showList && (
                    <IonList>
                        {games.map((game) => (
                            <IonItem key={game.id}>
                                <IonThumbnail
                                    className="item-thumbnail"
                                    style={{ '--size': '' }}
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
