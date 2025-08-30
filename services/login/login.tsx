import api from '../api'
import IUserInterface from '@/interfaces/User/IUserInterface'

export async function loginVerifyCPF(cpf: string): Promise<IUserInterface> {
    const response = await api.post('/login/verify', { cpf })
    if (response.status !== 200 && response.status !== 204)
        throw new Error(response.data.message)

    return response.data

}

export async function login(cpf: string, password: string) {
    const response = await api.post('/login', { cpf, password })

    return response
}

export async function createAccount(user: IUserInterface) {
    const response = await api.post('/user', user)
    return response
}