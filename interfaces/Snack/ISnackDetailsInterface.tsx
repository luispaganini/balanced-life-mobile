export interface ISnackDetailsInterface {
    id: number
    carbohydrates: number,
	calories: number,
	colesterol: number,
	fat: number,
	protein: number,
	others: number,
	totalCalories: number,
    idUser: number
    appointment: string
    observation: string
    status: number
    typeSnack: TypeSnack
    snacks: Snack[]
}

export interface TypeSnack {
    id: number
    name: string
}

export interface Snack {
    id: number
    typeSnack: TypeSnack
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
    foodNutritionInfo: any[]
}
