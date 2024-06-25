import { useTranslation } from "react-i18next";
import { Colors } from "../Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ColorSchemeName } from "react-native";

type DataPieChart = {
    name: string;
    population: number;
    color: string;
    legendFontColor: string;
    legendFontSize: number;
}

type DataPieChartInput = {
    nameKey: string;
    population: number;
    color: string;
}

export const getDataPieChart = (data: DataPieChartInput[], theme: ColorSchemeName): Array<DataPieChart> => {
    const dataPieChart = data.map(item => ({
        name: item.nameKey,
        population: item.population,
        color: item.color,
        legendFontColor: theme == 'light' ? Colors.light.text : Colors.dark.text,
        legendFontSize: 13
    }));

    return dataPieChart;
}