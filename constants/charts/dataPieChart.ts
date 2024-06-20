import { useTranslation } from "react-i18next";
import { Colors } from "../Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

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

export const getDataPieChart = (data: DataPieChartInput[]): Array<DataPieChart> => {
    const { t } = useTranslation();
    const theme = useColorScheme();

    const dataPieChart = data.map(item => ({
        name: t(item.nameKey),
        population: item.population,
        color: item.color,
        legendFontColor: theme == 'light' ? Colors.light.text : Colors.dark.text,
        legendFontSize: 15
    }));

    return dataPieChart;
}