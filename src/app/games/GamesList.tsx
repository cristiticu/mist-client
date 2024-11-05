import './Games.css';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonList, IonThumbnail } from '@ionic/react';
import React, { useState } from 'react';
import { useFetchGamesQuery } from './service';

export default function GamesList() {
    const [currentOffset, setCurrentOffset] = useState<number>(0);
    const {
        data: games,
        isFetching: isFetchingGames,
        isSuccess: isFetchGamesSuccess,
        isError: isFetchGamesError,
    } = useFetchGamesQuery({ offset: currentOffset, limit: 5 });

    const showList = games && !isFetchingGames && isFetchGamesSuccess;
    const showError = isFetchGamesError;

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
