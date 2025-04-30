export default interface IMealInterface {
    carbohydrates: number
    calories: number
    colesterol: number
    fat: number
    protein: number
    others: number
    totalCalories: number
    id: number
    idUser: number
    appointment: string
    idDiet: number
    observation: string
    status: number
    typeSnack: TypeSnackInterface
    snacks: Snack[]
  }
  
  export interface Snack {
    id: number
    typeSnack: any
    quantity: number
    unitMeasurement: UnitMeasurement
    food: Food
  }
  
  export interface UnitMeasurement {
    id: number
    name: string
  }
  
  export interface Food {
    id: number
    name: string
    idFoodGroup: number
    referenceTable: string
    brand: string
    foodNutritionInfo: FoodNutritionInfo[]
  }
  
  export interface FoodNutritionInfo {
    id: number
    unitMeasurement: UnitMeasurement
    quantity: number
    nutritionalComposition: NutritionalComposition
  }
  
  export interface NutritionalComposition {
    id: number
    item: string
  }

  export interface TypeSnackInterface {
    id?: number
    name: string
    timeSnack: string
  }