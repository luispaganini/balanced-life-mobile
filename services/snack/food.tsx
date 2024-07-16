import { IFoodListInterface } from "@/interfaces/Snack/Food/IFoodListInterface";
import api from "../api";
import IFoodInterface from "@/interfaces/Snack/Food/IFoodInterface";

export async function findFoodBySearch(search: string, page: number): Promise<Array<IFoodInterface>> {
    const response = await api.get(`/food/search/${search}/${page}`);

    if (response.status != 200)
        throw new Error(response.data.message);
    
    return response.data;
}

export async function getFoodById(id: number): Promise<IFoodInterface> {
    const response = await api.get(`/food/${id}`);

    if (response.status != 200)
        throw new Error(response.data.message);
    
    return response.data;
}