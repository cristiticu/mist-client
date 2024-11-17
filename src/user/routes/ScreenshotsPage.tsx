import { IonPage, IonContent } from '@ionic/react';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import Header from '../../shared/Header';
import Menu from '../../shared/Menu';
import { RouteComponentProps } from 'react-router-dom';
import ScreenshotsGrid from '../ScreenshotsGrid';
import { jwtDecode } from 'jwt-decode';
import { User } from '../types';

type Props = RouteComponentProps<{
    gameId: string;
}>;

export default function ScreenshotsPage({ match }: Props) {
    const token = useSelector((state: RootState) => state.auth.token);

    const isLoggedIn = !!token;
    return (
        <>
            <Menu />
            <IonPage id="main-content">
                <Header
                    showLogin
                    title="Screenshots"
                />
                <IonContent fullscreen>
                    {isLoggedIn && (
                        <ScreenshotsGrid
                            userId={jwtDecode<User>(token).id}
                            gameId={match.params.gameId}
                        />
                    )}
                </IonContent>
            </IonPage>
        </>
    );
}
