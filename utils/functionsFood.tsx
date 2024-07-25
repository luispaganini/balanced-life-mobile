import IFoodNutritionInfo from "@/interfaces/Snack/Food/IFoodNutritionInfo";
import { getNutritionalComposition, getUnitMeasurements } from "@/services/snack/food";

export function calculateNutritionalValues(nutritionInfo: IFoodNutritionInfo[], quantity: number): IFoodNutritionInfo[] {
    const factor = quantity / 100;
    return nutritionInfo.map(info => ({
        ...info,
        quantity: info.quantity * factor
    }));
};

export const getUnitMeasurementsFunction = async () => {
    return await getUnitMeasurements();
}

export const getNutritionalCompositionFunction = async () => {
    return await getNutritionalComposition();
}

export async function getReferenceValuesFood() {
    const unitMeasurements = await getUnitMeasurements();
    const nutritionalCompositions = await getNutritionalComposition();

    const referenceArray = [
        { name: "Energia", unit: "kcal" },
        { name: "Umidade", unit: "g" },
        { name: "Carboidrato total", unit: "g" },
        { name: "Carboidrato disponível", unit: "g" },
        { name: "Proteína", unit: "g" },
        { name: "Lipídios", unit: "g" },
        { name: "Fibra alimentar", unit: "g" },
        { name: "Álcool", unit: "g" },
        { name: "Cinzas", unit: "g" },
        { name: "Colesterol", unit: "mg" },
        { name: "Ácidos graxos saturados", unit: "g" },
        { name: "Ácidos graxos monoinsaturados", unit: "g" },
        { name: "Ácidos graxos poliinsaturados", unit: "g" },
        { name: "Ácidos graxos trans", unit: "g" },
        { name: "Cálcio", unit: "mg" },
        { name: "Ferro", unit: "mg" },
        { name: "Sódio", unit: "mg" },
        { name: "Magnésio", unit: "mg" },
        { name: "Fósforo", unit: "mg" },
        { name: "Potássio", unit: "mg" },
        { name: "Manganês", unit: "mg" },
        { name: "Zinco", unit: "mg" },
        { name: "Cobre", unit: "mg" },
        { name: "Selênio", unit: "µg" },
        { name: "Vitamina A (RE)", unit: "µg" },
        { name: "Vitamina A (RAE)", unit: "µg" },
        { name: "Vitamina D", unit: "µg" },
        { name: "Alfa-tocoferol (Vitamina E)", unit: "mg" },
        { name: "Tiamina", unit: "mg" },
        { name: "Riboflavina", unit: "mg" },
        { name: "Niacina", unit: "mg" },
        { name: "Vitamina B6", unit: "mg" },
        { name: "Vitamina B12", unit: "µg" },
        { name: "Vitamina C", unit: "mg" },
        { name: "Equivalente de folato", unit: "µg" },
        { name: "Sal de adição", unit: "g" },
        { name: "Açúcar de adição", unit: "g" }
    ];

    const updatedArray = nutritionalCompositions.map(item => {
        const referenceItem = referenceArray.find(ref => ref.name === item.item);
        const unitMeasurement = referenceItem ? unitMeasurements.find(unit => unit.name === referenceItem.unit) : null;
        return {
            ...item,
            unitMeasurement: unitMeasurement
        };
    });

    console.log(updatedArray)

    return updatedArray;
}


