import dayjs from 'dayjs';
import { useFetchGameQuery } from './service';
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonThumbnail,
    IonLabel,
    IonButton,
    IonLoading,
    IonToast,
    useIonRouter,
} from '@ionic/react';
import { useAppSelector } from '../store';
import { useFetchOwnedGamesQuery } from '../licenses/service';
import useAddOwnedGameWithRetry from '../licenses/hooks/useAddOwnedGameWithRetry';
import { useState } from 'react';

type Props = {
    id: string;
};

export default function GameDetails({ id }: Props) {
    const { push } = useIonRouter();
    const [errorDismissed, setErrorDismissed] = useState<boolean>(false);
    const [successDismissed, setSuccessDismissed] = useState<boolean>(false);

    const token = useAppSelector((state) => state.auth.token);

    const { data: ownedGames } = useFetchOwnedGamesQuery(undefined, { skip: !token });
    const { data: game } = useFetchGameQuery({ id });

    const { addUserGame, isAddingGame, error, success } = useAddOwnedGameWithRetry();

    const handleBuyClicked = async () => {
        if (!token) {
            push('/auth/login');
            return;
        }

        addUserGame(id);
    };

    const showDetails = !!game;
    const userHasGame = !!ownedGames && !!ownedGames.find((game) => game.id === id);

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
                        <IonButton
                            disabled={userHasGame || error}
                            onClick={handleBuyClicked}
                        >
                            {userHasGame ? 'In library' : 'Purchase'}
                        </IonButton>
                        <IonLoading isOpen={isAddingGame} />
                        <IonToast
                            isOpen={error && !errorDismissed}
                            onDidDismiss={() => setErrorDismissed(true)}
                            message="An error has occurred! The game was not added to the library. Retrying.."
                        />
                        <IonToast
                            isOpen={success && !successDismissed}
                            onDidDismiss={() => setSuccessDismissed(true)}
                            duration={5000}
                            message="Game added to library"
                        />
                    </IonCardContent>
                </IonCard>
            )}
        </>
    );
}
