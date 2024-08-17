import IUserInterface from "@/interfaces/User/IUserInterface"
import api from "../api"
import IErrorInterface from "@/interfaces/App/IErrorInterface"
import ILinkPatientInterface from "@/interfaces/User/ILinkPatientInterface"

export async function patchUser(user: IUserInterface, idUser: number): Promise<IUserInterface | IErrorInterface> {
    const response = await api.patch(`/user/${idUser}`, user)
    if (response.status !== 200)
        return response.data

    return response.data
}

export async function resetPasswordGenerateCode(idUser: number) {
    const response = await api.post(`/password/reset-code/generate`, {
        idUser
    })
    
    return response
}

export async function verifyPasswordCode(verificationCode: string) {
    const response = await api.post(`/password/reset-code/verify`, {
        verificationCode
    })

    return response
}

export async function getNutritionistList() {
    const response = await api.get(`/user/nutritionists`)

    return response
}

export async function updateNutritionistLink(patientLink: ILinkPatientInterface) {
    const response = await api.put(`/user/patient`, patientLink)

    return response
}

export async function getNutritionistByLink() {
    const response = await api.get(`/user/nutritionist`)

    return response
}