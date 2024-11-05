import { IonButton, IonCard, IonCardContent, IonInput, IonInputPasswordToggle, IonLoading, useIonRouter } from '@ionic/react';
import { useState } from 'react';
import { useLoginMutation } from './service';

export default function LoginBox() {
    const { push } = useIonRouter();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [login, { isLoading: isAuthenticating }] = useLoginMutation();

    const handleLogin = async () => {
        try {
            await login({ username, password });
            push('/library');
        } catch (error) {
        } finally {
        }
    };

    return (
        <IonCard className="login-card">
            <IonCardContent>
                <IonInput
                    type="text"
                    label="Username"
                    value={username}
                    onIonChange={(event) => setUsername(event.target.value ? event.target.value.toString() : '')}
                />
                <IonInput
                    type="password"
                    label="Password"
                    value={password}
                    onIonChange={(event) => setPassword(event.target.value ? event.target.value.toString() : '')}
                >
                    <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                </IonInput>
                <IonButton onClick={handleLogin}>Login</IonButton>
                <IonLoading isOpen={isAuthenticating} />
            </IonCardContent>
        </IonCard>
    );
}
