import { IonPage, IonContent } from '@ionic/react';
import Menu from '../../shared/Menu';
import LoginBox from '../LoginBox';
import Header from '../../shared/Header';

export default function LoginPage() {
    return (
        <>
            <Menu />
            <IonPage id="main-content">
                <Header title="Login" />
                <IonContent fullscreen>
                    <LoginBox />
                </IonContent>
            </IonPage>
        </>
    );
}
