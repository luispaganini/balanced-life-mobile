import ISnackInterface from "@/interfaces/Snack/ISnackInterface";
import api from "../api";
import { ISnackDetailsInterface, Snack } from "@/interfaces/Snack/ISnackDetailsInterface";
import ISnackFullInterface from "@/interfaces/Snack/ISnackFullInterface";
import StatusMeal from "@/enums/StatusMeal";

export async function getSnackAsync(date: Date): Promise<ISnackInterface> {
    const response = await api.get('/meals', { params: { date: date } });

    if (response.status != 200)
        throw new Error(response.data.message);
    
    return response.data;
}

export async function getSnackDetailsAsync(idMeal: number, idTypeSnack: number): Promise<ISnackDetailsInterface> {
    const response = await api.get(`/meal/${idMeal}`);

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

export async function sendSnack(status: StatusMeal, observation: string, idMeal: number) {
    const response = await api.put(`/meal/status/${idMeal}`, { 
        status,
        observation 
    });

    if (response.status != 200)
        throw new Error();
}

export async function resetSnacksAsync(date: Date): Promise<ISnackInterface> {
    const response = await api.delete('/meals/reset', { params: { date: date } });

    if (response.status != 200)
        throw new Error(response.data?.message || "Failed to reset snacks");
    
    return response.data;
}

export async function createMealAsync(meal: {
    typeSnack: { name: string, timeSnack: string },
    appointment: Date,
    idUser: number,
    status: number,
    observation: string,
    snacks?: any[]
}): Promise<any> {
    const response = await api.post('/meal', meal);

    if (response.status !== 200 && response.status !== 201)
        throw new Error(response.data?.message || "Failed to create meal");

    return response.data;
}