import './Games.css';
import { Fragment } from 'react';
import { IonItem, IonLabel, IonList, IonThumbnail } from '@ionic/react';
import { Game } from './types';

type Props = {
    games: Game[];
};

export default function GamesList({ games }: Props) {
    return (
        <IonList>
            {games.map((game) => (
                <Fragment key={game.id}>
                    <IonItem routerLink={`/games/${game.id}`}>
                        <IonThumbnail
                            className="item-thumbnail"
                            slot="start"
                        >
                            <img
                                alt=""
                                src={game.image_src}
                            />
                        </IonThumbnail>
                    </IonItem>
                    <IonItem routerLink={`/games/${game.id}`}>
                        <IonLabel className="item-title">{game.title}</IonLabel>
                    </IonItem>
                </Fragment>
            ))}
        </IonList>
    );
}
