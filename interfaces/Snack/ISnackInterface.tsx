import IMealInterface from "./Meal/IMealInterface";

export default interface ISnackInterface {
    date: Date;
    carbohydrates: number;
    calories: number;
    colesterol: number;
    fat: number;
    protein: number;
    others: number;
    totalCalories: number;
    meals: IMealInterface[];
}