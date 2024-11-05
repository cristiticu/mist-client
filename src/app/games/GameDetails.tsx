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
import { useFetchUserGamesQuery } from '../user/service';
import useAddUserGameWithRetry from '../user/hooks/useAddUserGameWithRetry';

type Props = {
    id: string;
};

export default function GameDetails({ id }: Props) {
    const { push } = useIonRouter();
    const token = useAppSelector((state) => state.auth.token);
    const { data: userGames } = useFetchUserGamesQuery(undefined, { skip: !token });
    const { data: game } = useFetchGameQuery({ id });
    const { addUserGame, isAddingGame, error } = useAddUserGameWithRetry();

    const showDetails = !!game;
    const userHasGame = !!userGames && !!userGames.find((game) => game.id === id);

    const handleBuyClicked = async () => {
        if (!token) {
            push('/auth/login');
            return;
        }

        addUserGame(id);
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
                        <IonButton
                            disabled={userHasGame}
                            onClick={handleBuyClicked}
                        >
                            {userHasGame ? 'In library' : 'Purchase'}
                        </IonButton>
                        <IonLoading isOpen={isAddingGame} />
                        <IonToast
                            isOpen={error}
                            message="An error has occurred! The game was not bought. Retrying.."
                        />
                    </IonCardContent>
                </IonCard>
            )}
        </>
    );
}
