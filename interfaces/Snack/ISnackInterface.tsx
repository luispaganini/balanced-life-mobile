import IMealInterface from "./IMealInterface";

export default interface ISnackInterface {
    date: string | Date;
    nameUser?: string;
    carbohydrates: number;
    calories: number;
    fat: number;
    colesterol: number;
    protein: number;
    others: number;
    totalCalories: number;
    meals: IMealInterface[];
}