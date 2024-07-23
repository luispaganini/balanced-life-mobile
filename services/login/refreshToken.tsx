import axios from "axios";
import useTokenStore from '@/store/TokenStore'
import appConfig from '@/app.json';
import ITokenInterface from "@/interfaces/Login/ITokenInterface";


export const refreshAccessToken = async (refreshToken: string, token: string): Promise<ITokenInterface> => {
    const response = await axios.post(`${appConfig.application.uris.api}/login/refresh`, { refreshToken, accessToken: token });

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