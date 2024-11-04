import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { Preferences } from '@capacitor/preferences';
import { login } from './app/auth/slice';

const container = document.getElementById('root');

const root = createRoot(container!);

Preferences.get({ key: 'user' }).then((data) => {
    if (data.value) {
        store.dispatch(login(data.value));
    }
});

root.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>
);
