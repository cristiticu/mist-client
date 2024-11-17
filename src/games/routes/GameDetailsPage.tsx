import { IonPage, IonContent } from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';
import GameDetails from '../GameDetails';
import Menu from '../../shared/Menu';
import Header from '../../shared/Header';

type Props = RouteComponentProps<{
    id: string;
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
                    <GameDetails id={match.params.id} />
                </IonContent>
            </IonPage>
        </>
    );
}
