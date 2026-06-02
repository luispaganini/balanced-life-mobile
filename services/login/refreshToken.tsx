import axios from "axios";
import useTokenStore from '@/store/TokenStore'
import appConfig from '@/app.json';
import ITokenInterface from "@/interfaces/Login/ITokenInterface";


export const refreshAccessToken = async (refreshToken: string, token: string): Promise<ITokenInterface> => {
    const apiBaseUrl = appConfig.application.uris.api.endsWith('/')
        ? appConfig.application.uris.api.slice(0, -1)
        : appConfig.application.uris.api;
    const response = await axios.post(`${apiBaseUrl}/login/refresh`, { refreshToken, accessToken: token });

    return response.data;
};

export const setupTokenRefresh = async () => {
    const { clearTokens } = useTokenStore.getState();
    try {
        const { accessToken, setAccessToken, refreshToken, setRefreshToken } = useTokenStore.getState();

        if (!refreshToken || !accessToken) return;

        const tokens = await refreshAccessToken(refreshToken, accessToken);
        if (!tokens.success) throw new Error('Erro ao renovar o token');

        setAccessToken(tokens.accessToken);
        setRefreshToken(tokens.refreshToken);
    } catch (error) {
        console.error('Erro ao renovar o token:', error);
        clearTokens();
    }
};