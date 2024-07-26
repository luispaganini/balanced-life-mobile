import IFoodNutritionInfo from "./IFoodNutritionInfo";

export default interface IFoodInterface {
    id: number | undefined,
    name: string,
    idFoodGroup: number | undefined,
    referenceTable: string,
    brand: string,
    foodNutritionInfo: IFoodNutritionInfo[]
}