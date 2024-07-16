import IFoodNutritionInfo from "./IFoodNutritionInfo";

export default interface IFoodInterface {
    id: number,
    name: string,
    idFoodGroup: number,
    referenceTable: string,
    brand: string,
    foodNutritionInfo: IFoodNutritionInfo[]
}