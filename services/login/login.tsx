import api from '../api'
import IUserInterface from '@/interfaces/IUserInterface'

export async function loginVerifyCPF(cpf: string): Promise<IUserInterface> {
    try {
        const response = await api.post('/login/verify', { cpf })
        if (response.status !== 200)
            throw new Error('Error on login')

        return response.data
    
    } catch (error) {
        console.log(error)
        throw error
    }
}