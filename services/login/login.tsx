import ITokenInterface from '@/interfaces/Login/ITokenInterface'
import api from '../api'
import IUserInterface from '@/interfaces/User/IUserInterface'

export async function loginVerifyCPF(identifier: string, token?: string): Promise<IUserInterface> {
    const payload = identifier.includes('@') ? { email: identifier } : { login: identifier.replace(/[^\d]/g, '') };
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const response = await api.post('/login/verify', payload, { headers })
    if (response.status !== 200 && response.status !== 204)
        throw new Error(response.data.message)

    return response.data
}

export async function login(email: string, password: string) {
    const response = await api.post('/login', { login: email, password })

    return response
}

export async function generateResetCodeByLogin(loginValue: string) {
    const response = await api.post('/password/reset-code/generate-by-login', { login: loginValue })
    return response;
}

export async function createAccount(user: IUserInterface): Promise<IUserInterface> {
    const response = await api.post('/user', user)
    if (response.status !== 201)
        return response.data.message

    return response.data
}

export async function googleLogin(idToken: string, roleId: number = 1) {
    const response = await api.post('/login/google', { idToken, roleId })
    return response;
}