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
    IonImg,
} from '@ionic/react';
import { useAppSelector } from '../store';
import { useFetchOwnedGamesQuery } from '../licenses/service';
import { useState } from 'react';
import useAddLicenseWithRetry from '../licenses/hooks/useAddLicenseWithRetry';

type Props = {
    gameId: string;
};

export default function GameDetails({ gameId }: Props) {
    const { push } = useIonRouter();
    const [errorDismissed, setErrorDismissed] = useState<boolean>(false);
    const [successDismissed, setSuccessDismissed] = useState<boolean>(false);

    const token = useAppSelector((state) => state.auth.token);

    const { data: ownedGames } = useFetchOwnedGamesQuery(undefined, { skip: !token });
    const { data: game } = useFetchGameQuery({ id: gameId });

    const { addLicense, isAddingGame, error, success } = useAddLicenseWithRetry();

    const handleBuyClicked = async () => {
        if (!token) {
            push('/auth/login');
            return;
        }

        addLicense(gameId);
    };

    const showDetails = !!game;
    const ownedGame = ownedGames?.find((game) => game.id === gameId);

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
                                <IonImg
                                    alt=""
                                    src={game.image_src || undefined}
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
                            disabled={!!ownedGame || error}
                            onClick={handleBuyClicked}
                        >
                            {ownedGame ? 'In library' : 'Purchase'}
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
