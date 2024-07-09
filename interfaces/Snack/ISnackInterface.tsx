import ISnackListInterface from "./ISnackListInterface";

export default interface ISnackInterface {
    carbohydrates: number;
    calories: number;
    colesterol: number;
    protein: number;
    others: number;
    totalCalories: number;
    date: Date;
    snacks: ISnackListInterface[];
}