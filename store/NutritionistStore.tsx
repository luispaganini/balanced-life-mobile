import INutritionistListInterface from "@/interfaces/User/INutritionistListInterface";
import { create } from "zustand";

type NutritionistsState = {
    nutritionistSelected: INutritionistListInterface
    setNutritionistSelected: (nutritionist: INutritionistListInterface) => void

}

export const useNutritionistStore = create<NutritionistsState>((set) => ({
    nutritionistSelected: {} as INutritionistListInterface,
    setNutritionistSelected: (nutritionist) => set({ nutritionistSelected: nutritionist }),
}))
