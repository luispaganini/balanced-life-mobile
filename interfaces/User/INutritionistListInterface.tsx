import IUserInterface from "./IUserInterface"

export default interface INutritionistListInterface {
    link: Link
    nutritionist: IUserInterface
}

export interface Link {
    id: number
    idNutritionist: number
    idPatient: number
    isCurrentNutritionist: boolean
    linkStatus: number
}