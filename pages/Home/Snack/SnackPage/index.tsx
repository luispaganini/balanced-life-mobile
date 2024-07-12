import React, { useEffect } from 'react'
import { PageContainer, SnackContainer, TitleText } from './styles'
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
import LoadingPageComponent from '@/components/application/Lists/LoadingPageComponent';

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
                { nameKey: t("Colesterol"), population: snack.colesterol, color: Colors.color.green },
            ], theme))
        } catch (error) {
            console.error(error);
        } finally {
            snackStore.setLoading(false);
        }
    }

    return (
        <PageContainer>
            {snackStore.loading ? <LoadingPageComponent /> : (
                <SnackContainer>
                    {snackStore.data ? (
                        <SnackContainer>
                            {pieChartData.length > 0 &&
                                <PieChart
                                    data={pieChartData}
                                    width={screenWidth}
                                    height={150}
                                    chartConfig={chartConfig}
                                    accessor={"population"}
                                    backgroundColor={"transparent"}
                                    paddingLeft={"0"}
                                />
                            }
                            <TitleText type='title'>{snackStore.data.totalCalories} Kcal</TitleText>
                            <DatePickerComponent onChange={snackStore.setDate} value={snackStore.date} />
                            <FlatList
                                data={snackStore.data?.snacks || []}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) =>
                                    <CardSnack idMeal={item.idMeal} idTypeSnack={item.id} title={item.title} description={item.totalCalories.toString()} />}
                                ListEmptyComponent={() => <NoDataComponent onPress={loadData} />}
                                onRefresh={loadData}
                                refreshing={snackStore.loading}
                            />
                        </SnackContainer>
                    ) : (
                        <NoDataComponent onPress={loadData} />
                    )}
                </SnackContainer>
            )}

        </PageContainer >
    )
}