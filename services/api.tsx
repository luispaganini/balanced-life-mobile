import axios from 'axios';
import appConfig from '../app.json';
import useTokenStore from '@/store/TokenStore';
import { setupTokenRefresh } from './login/refreshToken';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import * as Network from 'expo-network';

const api = axios.create({
    baseURL: appConfig.application.uris.api,
});

api.interceptors.request.use((config) => {
    const { accessToken } = useTokenStore.getState();

    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});

api.interceptors.response.use(response => response, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        await setupTokenRefresh();
        const { accessToken } = useTokenStore.getState();
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return api(originalRequest);
    }
    return Promise.reject(error);
});

api.interceptors.request.use(
    async (config) => {
        const networkState = await Network.getNetworkStateAsync();
        const { clearTokens } = useTokenStore.getState();
        if (!networkState.isConnected) {
            Alert.alert(
                'Sem Conexão',
                'Você está sem conexão com a internet. Você será redirecionado para a página de login.',
                [
                    {
                        text: 'OK',
                        onPress: () => clearTokens(),
                    },
                ]
            );

            throw new axios.Cancel('Sem conexão com a internet');
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default api;