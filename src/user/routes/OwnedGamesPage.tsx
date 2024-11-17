import { IonPage, IonContent } from '@ionic/react';
import OwnedGamesList from '../OwnedGamesList';
import Menu from '../../shared/Menu';
import Header from '../../shared/Header';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function OwnedGamesPage() {
    const token = useSelector((state: RootState) => state.auth.token);

    return (
        <>
            <Menu />
            <IonPage id="main-content">
                <Header
                    showLogin
                    title="Library"
                />
                <IonContent fullscreen>
                    <OwnedGamesList key={token} />
                </IonContent>
            </IonPage>
        </>
    );
}
