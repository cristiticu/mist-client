import { IonPage, IonContent } from '@ionic/react';
import MyGamesList from '../MyGamesList';
import Menu from '../../shared/Menu';
import Header from '../../shared/Header';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function MyGamesPage() {
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
                    <MyGamesList key={token} />
                </IonContent>
            </IonPage>
        </>
    );
}
