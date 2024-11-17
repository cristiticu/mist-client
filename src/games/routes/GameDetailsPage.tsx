import { IonPage, IonContent } from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';
import GameDetails from '../GameDetails';
import Menu from '../../shared/Menu';
import Header from '../../shared/Header';

type Props = RouteComponentProps<{
    gameId: string;
}>;

export default function GameDetailsPage({ match }: Props) {
    return (
        <>
            <Menu />
            <IonPage id="main-content">
                <Header
                    showLogin
                    title="Details"
                />
                <IonContent fullscreen>
                    <GameDetails gameId={match.params.gameId} />
                </IonContent>
            </IonPage>
        </>
    );
}
