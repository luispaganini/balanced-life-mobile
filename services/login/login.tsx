import ITokenInterface from '@/interfaces/Login/ITokenInterface'
import api from '../api'
import IUserInterface from '@/interfaces/User/IUserInterface'
import useTokenStore from '@/store/TokenStore'

export async function loginVerifyCPF(cpf: string): Promise<IUserInterface> {
    const response = await api.post('/login/verify', { cpf })
    if (response.status !== 200 && response.status !== 204)
        throw new Error(response.data.message)

    return response.data

}

export async function login(cpf: string, password: string): Promise<ITokenInterface> {
    const response = await api.post('/login', { cpf, password })

    if (response.status !== 200)
        throw new Error(response.data.message)

    return response.data
}

export async function createAccount(user: IUserInterface): Promise<IUserInterface> {
    const response = await api.post('/user', user)
    if (response.status !== 201)
        return response.data.message

    return response.data
}

export const refreshAccessToken = async (refreshToken: string, token: string): Promise<ITokenInterface> => {
    const response = await api.post(`login/refresh`, { refreshToken, accessToken: token });

    return response.data;
};

export const setupTokenRefresh = () => {
    const { clearTokens } = useTokenStore.getState();
    setInterval(async () => {
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
    }, 1000 * 60 * 15);
};