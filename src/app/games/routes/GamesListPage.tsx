import { IonContent, IonPage } from '@ionic/react';
import Menu from '../../shared/Menu';
import Header from '../../shared/Header';
import StoreGames from '../StoreGames';

export default function GamesListPage() {
    return (
        <>
            <Menu />
            <IonPage id="main-content">
                <Header
                    showLogin
                    title="Store"
                />
                <IonContent fullscreen>
                    <StoreGames />
                </IonContent>
            </IonPage>
        </>
    );
}
