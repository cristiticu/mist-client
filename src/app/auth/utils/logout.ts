import { Preferences } from '@capacitor/preferences';
import { store } from '../../store';
import { logout as logoutAction } from '../slice';
import { userApi } from '../../user/service';
import { authApi } from '../service';

export default function logout() {
    Preferences.remove({ key: 'user' });
    store.dispatch(userApi.util.resetApiState());
    store.dispatch(authApi.util.resetApiState());
    store.dispatch(logoutAction());
}
