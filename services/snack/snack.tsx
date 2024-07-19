import ISnackInterface from "@/interfaces/Snack/ISnackInterface";
import api from "../api";
import { ISnackDetailsInterface, Snack } from "@/interfaces/Snack/ISnackDetailsInterface";
import ISnackFullInterface from "@/interfaces/Snack/ISnackFullInterface";

export async function getSnackAsync(date: Date): Promise<ISnackInterface> {
    const response = await api.get('/snacks/', { params: { date: date } });

    if (response.status != 200)
        throw new Error(response.data.message);
    
    return response.data;
}

export async function getSnackDetailsAsync(idMeal: number, idTypeSnack: number): Promise<ISnackDetailsInterface> {
    const response = await api.get(`/meal/${idMeal}/type-snack/${idTypeSnack}`);

    if (response.status != 200)
        throw new Error(response.data.message);
    
    return response.data;
}

export async function setSnack(snack: ISnackFullInterface): Promise<Snack> {
    const response = await api.post('/snack', snack);

    if (response.status != 201)
        throw new Error(response.data.message);

    return response.data;
}

export async function updateSnack(snack: ISnackFullInterface, id: number): Promise<Snack> {
    const response = await api.put(`/snack/${id}`, snack);

    if (response.status != 200)
        throw new Error(response.data.message);

    return response.data;
}

export async function deleteSnack(id: number) {
    const response = await api.delete(`/snack/${id}`);

    if (response.status != 200)
        throw new Error(response.data.message);
}