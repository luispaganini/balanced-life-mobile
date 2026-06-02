import ITokenInterface from '@/interfaces/Login/ITokenInterface'
import api from '../api'
import IUserInterface from '@/interfaces/User/IUserInterface'

export async function loginVerifyCPF(identifier: string): Promise<IUserInterface> {
    const payload = identifier.includes('@') ? { email: identifier } : { cpf: identifier.replace(/[^\d]/g, '') };
    const response = await api.post('/login/verify', payload)
    if (response.status !== 200 && response.status !== 204)
        throw new Error(response.data.message)

    return response.data
}

export async function login(cpf: string, password: string) {
    const response = await api.post('/login', { cpf, password })

    return response
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