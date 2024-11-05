import React from 'react';
import dayjs from 'dayjs';
import { useFetchGameQuery } from './service';
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonThumbnail,
    IonLabel,
    IonItemDivider,
    IonButton,
    useIonRouter,
    IonLoading,
} from '@ionic/react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useAddUserGameMutation } from '../user/service';

type Props = {
    id: string;
};

export default function GameDetails({ id }: Props) {
    const token = useSelector((state: RootState) => state.auth.token);
    const { push } = useIonRouter();
    const { data: game, isSuccess: isFetchGameSuccess, isError: isFetchGameError } = useFetchGameQuery({ id });
    const [addGame, { isLoading: isAddingGame }] = useAddUserGameMutation();

    const showDetails = game && isFetchGameSuccess;
    const showError = isFetchGameError;

    const handleBuyClicked = async () => {
        if (!token) {
            push('/auth/login');
            return;
        }

        try {
            await addGame({ gameId: id });
        } catch (error) {}
    };

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
                        <IonButton onClick={handleBuyClicked}>Buy</IonButton>
                        <IonLoading isOpen={isAddingGame} />
                    </IonCardContent>
                </IonCard>
            )}
        </>
    );
}
