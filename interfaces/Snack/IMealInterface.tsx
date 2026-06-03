import StatusMeal from "@/enums/StatusMeal";

export interface TypeSnack {
    id: number;
    name: string;
    timeSnack?: string;
}

export interface UnitMeasurement {
    id: number;
    name: string;
}

export interface Food {
    id: number;
    name: string;
    idFoodGroup: number;
    referenceTable: string;
    brand: string;
}

export interface Snack {
    id: number;
    typeSnack: TypeSnack;
    quantity: number;
    unitMeasurement: UnitMeasurement;
    food: Food;
}

export default interface IMealInterface {
    id: number;
    idUser: number;
    appointment: string;
    observation: string;
    status: StatusMeal;
    isTemplate?: boolean;
    idDiet?: number | null;
    typeSnack: TypeSnack;
    snacks: Snack[];
    totalCalories: number;
}
