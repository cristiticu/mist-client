import './Games.css';
import { createAnimation, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonImg, IonRow } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import { useFetchGamesQuery } from './service';

export default function StoreGames() {
    const [currentOffset, setCurrentOffset] = useState<number>(0);
    const { data: games } = useFetchGamesQuery({ offset: currentOffset, limit: 5 });

    const gameCardElement = useRef(null);

    const handlePageClicked = (direction: 'next' | 'previous') => {
        if (direction === 'next') {
            setCurrentOffset(currentOffset + 5);
        } else {
            setCurrentOffset(currentOffset - 5);
        }
    };

    useEffect(() => {
        const playAnimation = async () => {
            if (gameCardElement.current) {
                const gameCardAnimation = createAnimation()
                    .addElement(gameCardElement.current)
                    .duration(1000)
                    .fromTo('transform', 'translateX(100px)', 'translateX(0px)')
                    .fromTo('opacity', '0.2', '1');

                await gameCardAnimation.play();
            }
        };

        playAnimation();
    }, []);

    return (
        <IonCard className="games-list-card">
            <IonCardHeader>
                <IonCardTitle>Available games</IonCardTitle>
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
                                    <IonCard routerLink={`/games/${game.id}`}>
                                        <IonImg
                                            alt=""
                                            src={game.image_src || undefined}
                                        />
                                        <IonCardHeader>
                                            <IonCardTitle>{game.title}</IonCardTitle>
                                        </IonCardHeader>
                                    </IonCard>
                                </IonCol>
                            ))}
                        </IonRow>
                    </IonGrid>
                )}
                <IonButton
                    disabled={currentOffset <= 0}
                    onClick={() => handlePageClicked('previous')}
                >
                    Previous
                </IonButton>
                <IonButton
                    disabled={games && games.length < 5}
                    onClick={() => handlePageClicked('next')}
                >
                    Next
                </IonButton>
            </IonCardContent>
        </IonCard>
    );
}
