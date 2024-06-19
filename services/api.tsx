import axios from 'axios';
import appConfig from '../app.json';
import useTokenStore from '@/store/TokenStore';

const api = axios.create({
    baseURL: appConfig.application.uris.api,
});

api.interceptors.request.use((config) => {
    const { accessToken } = useTokenStore.getState();

    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});

export default api;