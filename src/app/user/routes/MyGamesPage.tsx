import { IonPage, IonContent } from '@ionic/react';
import MyGamesList from '../MyGamesList';
import Menu from '../../shared/Menu';
import Header from '../../shared/Header';

export default function MyGamesPage() {
    return (
        <>
            <Menu />
            <IonPage id="main-content">
                <Header
                    showLogin
                    title="Library"
                />
                <IonContent fullscreen>
                    <MyGamesList />
                </IonContent>
            </IonPage>
        </>
    );
}
