import ISnackListInterface from "./ISnackListInterface";

export default interface ISnackInterface {
    date: Date;
    carbohydrates: number;
    calories: number;
    colesterol: number;
    protein: number;
    others: number;
    totalCalories: number;
    snacks: ISnackListInterface[];
}