import axios from 'axios';
import appConfig from '../app.json';
import useTokenStore from '@/store/TokenStore';
import { setupTokenRefresh } from './login/refreshToken';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import * as Network from 'expo-network';

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL || appConfig.application.uris.api,
});

api.interceptors.request.use((config) => {
    const { accessToken } = useTokenStore.getState();

    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});

api.interceptors.response.use(response => response, async (error) => {
    const originalRequest = error.config;
    const isAuthRequest = originalRequest.url?.includes('/login');
    if (error.response && error.response.status === 401 && !isAuthRequest && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            await setupTokenRefresh();
            const { accessToken } = useTokenStore.getState();
            if (!accessToken) {
                return Promise.reject(error);
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
            return api(originalRequest);
        } catch (refreshError) {
            return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error);
});

api.interceptors.request.use(
    async (config) => {
        const networkState = await Network.getNetworkStateAsync();
        if (!networkState.isConnected) {
            Alert.alert(
                'Sem Conexão',
                'Você está sem conexão com a internet. Por favor, verifique sua conexão.'
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