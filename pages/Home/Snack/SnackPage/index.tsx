import React, { useEffect } from 'react'
import { PageContainer, TitleText } from './styles'
import { PieChart } from 'react-native-chart-kit';
import { Dimensions, FlatList, View } from 'react-native';
import { getDataPieChart } from '@/constants/charts/dataPieChart';
import { chartConfig } from '@/constants/charts/chartConfig';
import { Colors } from '@/constants/Colors';
import DatePickerComponent from '@/components/application/Dates/DatePickerComponent';
import CardSnack from '@/components/application/Cards/CardSnack';
import { useSnackStore } from '@/store/SnackStore';
import NoDataComponent from '@/components/application/Lists/NoDataComponent';
import { getSnackAsync } from '@/services/snack/snack';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTranslation } from 'react-i18next';

export default function SnackPage() {
    const screenWidth = Dimensions.get("window").width;
    const theme = useColorScheme();
    const { t } = useTranslation()
    const snackStore = useSnackStore();
    const [pieChartData, setPieChartData] = React.useState(getDataPieChart([], theme))

    useEffect(() => {
        loadData();
    }, [snackStore.date])

    const loadData = async () => {
        snackStore.setLoading(true);
        try {
            const snack = await getSnackAsync(snackStore.date);
            snackStore.setData(snack);
            setPieChartData(getDataPieChart([
                { nameKey: t("Carbohydrates"), population: snack.carbohydrates, color: Colors.color.orange },
                { nameKey: t("Protein"), population: snack.protein, color: Colors.color.red },
                { nameKey: t("Fat"), population: snack.fat, color: Colors.color.green },
                { nameKey: t("Others"), population: snack.others, color: Colors.color.blue },
            ], theme))
        } catch (error) {
            console.error(error);
        } finally {
            snackStore.setLoading(false);
        }
    }

    return (
        <PageContainer>
            {snackStore.data ? (
                <View>
                    {pieChartData.length > 0 &&
                        <PieChart
                            data={pieChartData}
                            width={screenWidth}
                            height={200}
                            chartConfig={chartConfig}
                            accessor={"population"}
                            backgroundColor={"transparent"}
                            paddingLeft={"0"}
                        />
                    }
                    <TitleText type='title'>{snackStore.data.totalCalories} Cal</TitleText>
                    <DatePickerComponent onChange={snackStore.setDate} value={snackStore.date} />
                    <FlatList
                        data={snackStore.data?.snacks || []}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) =>
                            <CardSnack title={item.title} description={item.description} />}
                        ListEmptyComponent={() => <NoDataComponent onPress={loadData} />}
                        onRefresh={loadData}
                        refreshing={snackStore.loading}
                    />
                </View>
            ) : (
                <View>

                </View>
            )}

        </PageContainer >
    )
}