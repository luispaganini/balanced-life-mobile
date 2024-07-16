import IFoodNutritionInfo from "@/interfaces/Snack/Food/IFoodNutritionInfo";

export function calculateNutritionalValues(nutritionInfo: IFoodNutritionInfo[], quantity: number): IFoodNutritionInfo[] {
    const factor = quantity / 100;
    return nutritionInfo.map(info => ({
        ...info,
        quantity: info.quantity * factor
    }));
};