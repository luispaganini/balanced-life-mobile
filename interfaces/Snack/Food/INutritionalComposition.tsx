import { UnitMeasurement } from "./IFoodNutritionInfo"

export interface INutritionalComposition {
    id: number
    item: string
    unitMeasurement: UnitMeasurement
}

export interface FormData {
    name: string
    [key: string]: string
}