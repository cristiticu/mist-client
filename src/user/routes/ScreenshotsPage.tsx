import { IonPage, IonContent } from '@ionic/react';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import Header from '../../shared/Header';
import Menu from '../../shared/Menu';
import { RouteComponentProps } from 'react-router-dom';

type Props = RouteComponentProps<{
    gameId: string;
}>;

export default function ScreenshotsPage({ match }: Props) {
    const token = useSelector((state: RootState) => state.auth.token);

    return (
        <>
            <Menu />
            <IonPage id="main-content">
                <Header
                    showLogin
                    title="Screenshots"
                />
                <IonContent fullscreen></IonContent>
            </IonPage>
        </>
    );
}
