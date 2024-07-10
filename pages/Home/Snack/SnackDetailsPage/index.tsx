import { View, Text, Dimensions, ScrollView, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { ThemedText } from '@/components/ThemedText'
import { AddItemContainer, ButtonText, IconAdd, InfoContainer, NotesContainer, NotesInputContainer, PageContainer, SnackInfoContainer, SubTitleText, TitleText } from './styles'
import { getDataPieChart } from '@/constants/charts/dataPieChart'
import { useColorScheme } from '@/hooks/useColorScheme'
import { useTranslation } from 'react-i18next'
import { chartConfig } from '@/constants/charts/chartConfig'
import { PieChart } from 'react-native-chart-kit'
import { Colors } from '@/constants/Colors'
import ItemSnackComponent from '@/components/application/Lists/ItemSnackComponent'
import { ButtonComponentContainer } from '@/components/application/Forms/ButtonComponent/styles'
import { getSnackDetailsAsync } from '@/services/snack/snack'
import { ISnackDetailsInterface } from '@/interfaces/Snack/ISnackDetailsInterface'

export default function SnackDetailsPage() {
    const { idMeal, idTypeSnack } = useLocalSearchParams()
    const screenWidth = Dimensions.get("window").width;
    const theme = useColorScheme();
    const [snacks, setSnacks] = React.useState<ISnackDetailsInterface>()
    const { t } = useTranslation()
    const [pieChartData, setPieChartData] = React.useState(getDataPieChart([], theme))

    useEffect(() => {
        loadData();
    }, [])

    const loadData = async () => {
        // snackStore.setLoading(true);
        try {
            const snacksDetails = await getSnackDetailsAsync(parseInt(idMeal as string), parseInt(idTypeSnack as string));
            setSnacks(snacksDetails);
            setPieChartData(getDataPieChart([
                { nameKey: t("Carbohydrates"), population: snacksDetails.carbohydrates, color: Colors.color.orange },
                { nameKey: t("Protein"), population: snacksDetails.protein, color: Colors.color.red },
                { nameKey: t("Colesterol"), population: snacksDetails.colesterol, color: Colors.color.green },
                { nameKey: t("Fat"), population: snacksDetails.fat, color: Colors.color.blue },
            ], theme))
        } catch (error) {
            console.error(error);
        } finally {
            // snackStore.setLoading(false);
        }
    }

    return (
        <PageContainer>
            <ScrollView>
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
                <TitleText type='title'>{snacks?.calories} Kcal</TitleText>
                <InfoContainer>
                    <View>
                        <SubTitleText type='subtitle'>{t("Dinner")}:</SubTitleText>
                        <SnackInfoContainer>
                            {snacks?.snacks?.map((item, index) => (
                                <ItemSnackComponent
                                    id={item.id}
                                    quantity={item.quantity}
                                    unitMeasurement={item.unitMeasurement.name}
                                    name={item.food.name}
                                    onPressEdit={() => { }}
                                    onPressDelete={() => { }}
                                    key={index}
                                />
                            ))}

                        </SnackInfoContainer>
                    </View>
                </InfoContainer>
                <ButtonComponentContainer color={Colors.color.blue}>
                    <AddItemContainer>
                        <IconAdd name="add-circle-outline" size={26} color={Colors.color.white} />
                        <ButtonText>{t('Add new item')}</ButtonText>
                    </AddItemContainer>
                </ButtonComponentContainer>

                <NotesContainer>
                    <ThemedText>{t('Notes')}:</ThemedText>
                    <NotesInputContainer theme={theme} multiline={true} />
                </NotesContainer>

                <ButtonComponentContainer color={Colors.color.green}>
                    <ButtonText>{t('Completed Snack')}</ButtonText>
                </ButtonComponentContainer>
                <ButtonComponentContainer color={Colors.color.red}>
                    <ButtonText>{t('Snack not finished')}</ButtonText>
                </ButtonComponentContainer>
            </ScrollView>
        </PageContainer>
    )
}