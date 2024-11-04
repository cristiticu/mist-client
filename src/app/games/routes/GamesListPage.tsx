import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import GamesList from '../GamesList';
import Menu from '../../shared/Menu';
import Header from '../../shared/Header';

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
                    <GamesList />
                </IonContent>
            </IonPage>
        </>
    );
}
