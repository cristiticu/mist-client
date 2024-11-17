import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonMenuToggle } from '@ionic/react';

export default function Menu() {
    return (
        <IonMenu contentId="main-content">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Main Menu</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonMenuToggle>
                    <IonButton
                        fill="outline"
                        expand="block"
                        color="medium"
                        routerLink="/games"
                    >
                        Store
                    </IonButton>
                    <IonButton
                        fill="outline"
                        expand="block"
                        color="medium"
                        routerLink="/user/library"
                    >
                        Library
                    </IonButton>
                </IonMenuToggle>
            </IonContent>
        </IonMenu>
    );
}
