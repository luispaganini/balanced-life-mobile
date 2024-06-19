import { IBodyDataInterface } from "@/interfaces/IBodyDataInterface"
import api from "../api"

export async function addBodyData(data: IBodyDataInterface): Promise<IBodyDataInterface> {
    const response = await api.post('/body', data)
    if (response.status !== 201)
        throw new Error(response.data.message)

    return response.data
}

export async function getLastFourBodyData(idUser: number): Promise<IBodyDataInterface[]> {
    const response = await api.get(`/body/last/${idUser}`)
    if (response.status !== 200)
        throw new Error(response.data.message)

    return response.data
}