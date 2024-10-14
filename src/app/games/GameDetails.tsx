import React from 'react';
import dayjs from 'dayjs';
import { useFetchGameQuery } from './service';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonThumbnail, IonLabel, IonItemDivider } from '@ionic/react';

type Props = {
    id: string;
};

export default function GameDetails({ id }: Props) {
    const { data: game, isLoading: isLoadingGame, isSuccess: isFetchGameSuccess, isError: isFetchGameError } = useFetchGameQuery({ id });

    const showDetails = game && isFetchGameSuccess;
    const showError = isFetchGameError;

    return (
        <>
            {showDetails && (
                <IonCard className="games-list-card">
                    <IonCardHeader>
                        <IonCardTitle>{game.title}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonItem>
                            <IonThumbnail
                                className="item-thumbnail"
                                slot="start"
                            >
                                <img
                                    alt=""
                                    src={game.image_src}
                                />
                            </IonThumbnail>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="item-title">{game.description}</IonLabel>
                        </IonItem>

                        <IonItem>
                            <IonLabel className="item-title">Price: {game.price}</IonLabel>
                        </IonItem>

                        <IonItem>
                            <IonLabel className="item-title">
                                Reviews: {game.positive_reviews} positive / {game.negative_reviews} negative
                            </IonLabel>
                        </IonItem>

                        <IonItem>
                            <IonLabel className="item-title">Added {dayjs(game.added_at).format('DD MMM YYYY')}</IonLabel>
                        </IonItem>
                    </IonCardContent>
                </IonCard>
            )}
        </>
    );
}
