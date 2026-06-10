import axios from "axios";
import useTokenStore from '@/store/TokenStore'
import appConfig from '@/app.json';
import ITokenInterface from "@/interfaces/Login/ITokenInterface";


export const refreshAccessToken = async (refreshToken: string, token: string): Promise<ITokenInterface> => {
    const rawUrl = process.env.EXPO_PUBLIC_API_URL || appConfig.application.uris.api;
    const apiBaseUrl = rawUrl.endsWith('/')
        ? rawUrl.slice(0, -1)
        : rawUrl;
    const response = await axios.post(`${apiBaseUrl}/login/refresh`, { refreshToken, accessToken: token });

    return response.data;
};

export const setupTokenRefresh = async () => {
    const { clearTokens } = useTokenStore.getState();
    try {
        const { accessToken, setAccessToken, refreshToken, setRefreshToken } = useTokenStore.getState();

        if (!refreshToken || !accessToken) return;

        const tokens = await refreshAccessToken(refreshToken, accessToken);
        if (!tokens.success) {
            clearTokens();
            return;
        }

        setAccessToken(tokens.accessToken);
        setRefreshToken(tokens.refreshToken);
    } catch (error: any) {
        console.error('Erro ao renovar o token:', error);
        if (error.response) {
            const status = error.response.status;
            if (status === 400 || status === 401) {
                clearTokens();
            }
        }
        throw error;
    }
};