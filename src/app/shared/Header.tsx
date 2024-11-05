import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonButton, IonTitle, IonBadge, IonItem, IonLabel } from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import logout from '../auth/utils/logout';
import { useNetwork } from './hooks/useNetwork';

type Props = {
    title: string;
    showLogin?: boolean;
};

export default function Header({ title, showLogin }: Props) {
    const token = useSelector((state: RootState) => state.auth.token);
    const networkStatus = useNetwork();

    const isAuthenticated = !!token;

    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton></IonMenuButton>
                </IonButtons>
                <IonTitle>{title}</IonTitle>
                <IonItem slot="end">
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
                    <IonLabel>{networkStatus.connected ? 'Online' : 'Offline '}</IonLabel>
                    <IonBadge color={networkStatus.connected ? 'success' : 'danger'}>{networkStatus.connected ? <>&#10004;</> : 'X'}</IonBadge>
                </IonItem>
            </IonToolbar>
        </IonHeader>
    );
}
