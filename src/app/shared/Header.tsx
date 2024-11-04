import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonButton, IonTitle } from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import logout from '../auth/utils/logout';

type Props = {
    title: string;
    showLogin?: boolean;
};

export default function Header({ title, showLogin }: Props) {
    const token = useSelector((state: RootState) => state.auth.token);

    const isAuthenticated = !!token;

    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton></IonMenuButton>
                </IonButtons>
                {isAuthenticated && showLogin && (
                    <IonButton
                        onClick={() => logout()}
                        slot="end"
                    >
                        Logout
                    </IonButton>
                )}
                {!isAuthenticated && showLogin && (
                    <IonButton
                        routerLink="/auth/login"
                        slot="end"
                    >
                        Login
                    </IonButton>
                )}
                <IonTitle>{title}</IonTitle>
            </IonToolbar>
        </IonHeader>
    );
}
