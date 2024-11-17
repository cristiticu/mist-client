import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonButton, IonTitle, IonBadge, IonItem, IonLabel } from '@ionic/react';
import logout from '../auth/utils/logout';
import { useNetwork } from './hooks/useNetwork';
import { useAppSelector } from '../store';

type Props = {
    title: string;
    showLogin?: boolean;
};

export default function Header({ title, showLogin }: Props) {
    const token = useAppSelector((state) => state.auth.token);
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
