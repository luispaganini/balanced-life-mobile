import ISnackListInterface from "./ISnackListInterface";

export default interface ISnackInterface {
    id: number;
    carbohydrates: number;
    calories: number;
    fat: number;
    protein: number;
    others: number;
    totalCalories: number;
    date: Date;
    snacks: ISnackListInterface[];
}