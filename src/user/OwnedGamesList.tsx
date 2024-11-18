import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonButton, IonGrid, IonCol, IonRow, createAnimation } from '@ionic/react';
import { useFetchOwnedGamesQuery } from '../licenses/service';
import { useEffect, useRef } from 'react';

export default function OwnedGamesList() {
    const { data: games } = useFetchOwnedGamesQuery();
    const gameCardElement = useRef(null);

    useEffect(() => {
        const playAnimation = async () => {
            if (gameCardElement.current) {
                const gameCardAnimation = createAnimation()
                    .addElement(gameCardElement.current)
                    .duration(1000)
                    .fromTo('transform', 'translateX(-100px)', 'translateX(0px)')
                    .fromTo('opacity', '0.2', '1');

                await gameCardAnimation.play();
            }
        };

        playAnimation();
    }, []);

    return (
        <IonCard className="games-list-card">
            <IonCardHeader>
                <IonCardTitle>My Library</IonCardTitle>
            </IonCardHeader>
            <IonCardContent ref={gameCardElement}>
                {games && (
                    <IonGrid>
                        <IonRow>
                            {games.map((game) => (
                                <IonCol
                                    size="6"
                                    key={game.id}
                                >
                                    <IonCard
                                        className="game-card"
                                        routerLink={`/games/${game.id}`}
                                    >
                                        <IonImg
                                            alt=""
                                            src={game.image_src || undefined}
                                        />
                                        <IonCardHeader>
                                            <IonCardTitle>{game.title}</IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            <IonButton
                                                size="small"
                                                onClick={(event) => event.stopPropagation()}
                                                routerLink={`/user/screenshots/${game.id}`}
                                            >
                                                View your screenshots
                                            </IonButton>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            ))}
                        </IonRow>
                    </IonGrid>
                )}
            </IonCardContent>
        </IonCard>
    );
}
