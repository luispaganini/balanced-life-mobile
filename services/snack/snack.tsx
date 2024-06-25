import ISnackInterface from "@/interfaces/Snack/ISnackInterface";
import api from "../api";

export async function getSnackAsync(date: Date): Promise<ISnackInterface> {
    // const response = await api.get('/snack');

    // if (response.data.status) 
    //     throw new Error(response.data.message);

    // return response.data;

    return {
        calories: 100,
        carbohydrates: 100,
        protein: 100,
        fat: 100,
        date: new Date(),
        totalCalories: 2895,
        id: 1,
        others: 100,
        snacks: [
            {
                id: 1,
                title: "Snack 1",
                description: "Description 1",
            },
            {
                id: 2,
                title: "Snack 2",
                description: "Description 2",
            },
            {
                id: 3,
                title: "Snack 3",
                description: "Description 3",
            },
            {
                id: 4,
                title: "Snack 4",
                description: "Description 4",
            },
            {
                id: 5,
                title: "Snack 5",
                description: "Description 5",
            },
            {
                id: 6,
                title: "Snack 6",
                description: "Description 6",
            },
        ]
    }
}