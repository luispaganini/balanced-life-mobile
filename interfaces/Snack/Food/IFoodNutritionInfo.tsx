export default interface IFoodNutritionInfo {
    id: number | undefined
    unitMeasurement: UnitMeasurement
    quantity: number
    nutritionalComposition: NutritionalComposition
}

export interface UnitMeasurement {
  id: number
  name: string
}

export interface NutritionalComposition {
  id: number
  item: string
}