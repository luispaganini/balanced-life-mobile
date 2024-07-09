import axios from 'axios';
import appConfig from '../app.json';
import useTokenStore from '@/store/TokenStore';
import { setupTokenRefresh } from './login/login';

const api = axios.create({
    baseURL: appConfig.application.uris.api,
});

api.interceptors.request.use((config) => {
    const { accessToken } = useTokenStore.getState();

    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});

// api.interceptors.response.use(response => response, async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         const newAccessToken = await setupTokenRefresh();
//         const { accessToken } = useTokenStore.getState();
//         axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
//         originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
//         return api(originalRequest); 
//     }
//     return Promise.reject(error);
// });

export default api;