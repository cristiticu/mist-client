import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
import { Preferences } from '@capacitor/preferences';
import { login } from './auth/slice';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

// Call the element loader before the render call
defineCustomElements(window);

await Preferences.get({ key: 'user' }).then((data) => {
    if (data.value) {
        store.dispatch(login(data.value));
    }
});

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>
);
