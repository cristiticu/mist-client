import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';
import '../theme/variables.css';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import GamesListPage from './games/routes/GamesListPage';
import GameDetailsPage from './games/routes/GameDetailsPage';
import PrivateRoute from './auth/PrivateRoute';
import MyGamesPage from './user/routes/MyGamesPage';
import LoginPage from './auth/routes/LoginPage';

setupIonicReact();

export default function App() {
    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route
                        exact
                        path="/"
                        render={() => <Redirect to="/games" />}
                    />
                    <Route
                        exact
                        path="/games"
                        component={GamesListPage}
                    />
                    <Route
                        exact
                        path="/games/:id"
                        component={GameDetailsPage}
                    />
                    <Route
                        exact
                        path="/auth/login"
                        component={LoginPage}
                    />
                    <Route
                        exact
                        path="/library"
                        render={() => (
                            <PrivateRoute>
                                <MyGamesPage />
                            </PrivateRoute>
                        )}
                    />
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
}
