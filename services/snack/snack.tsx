import ISnackInterface from "@/interfaces/Snack/ISnackInterface";
import api from "../api";
import { ISnackDetailsInterface } from "@/interfaces/Snack/ISnackDetailsInterface";

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