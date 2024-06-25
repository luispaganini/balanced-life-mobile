import { AbstractChartConfig } from "react-native-chart-kit/dist/AbstractChart";

export const chartConfig: AbstractChartConfig = {
    color: (opacity = 1) => `rgba(0,9,48, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
};