import { View, Text, Dimensions, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
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
import { deleteSnack, getSnackDetailsAsync } from '@/services/snack/snack'
import { ISnackDetailsInterface } from '@/interfaces/Snack/ISnackDetailsInterface'
import LoadingPageComponent from '@/components/application/Lists/LoadingPageComponent'
import { useSnackStore } from '@/store/SnackStore'
import StatusMeal from '@/enums/StatusMeal'

export default function SnackDetailsPage() {
    const { idMeal, idTypeSnack } = useLocalSearchParams()
    const screenWidth = Dimensions.get("window").width;
    const theme = useColorScheme();
    const snackStore = useSnackStore()
    const { t } = useTranslation()
    const [pieChartData, setPieChartData] = React.useState(getDataPieChart([], theme))
    const [loading, setLoading] = React.useState(false)

    useEffect(() => {
        loadData();
    }, [])

    const loadData = async () => {
        setLoading(true);
        try {
            const snacksDetails = await getSnackDetailsAsync(parseInt(idMeal as string), parseInt(idTypeSnack as string));
            snackStore.setSnackDetails(snacksDetails);
            setPieChartData(getDataPieChart([
                { nameKey: t("Carbohydrates"), population: snacksDetails.carbohydrates, color: Colors.color.orange },
                { nameKey: t("Protein"), population: snacksDetails.protein, color: Colors.color.red },
                { nameKey: t("Colesterol"), population: snacksDetails.colesterol, color: Colors.color.green },
                { nameKey: t("Fat"), population: snacksDetails.fat, color: Colors.color.blue },
            ], theme))
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const deleteSnackFunction = async (idSnack: number) => {
        try {
            await deleteSnack(idSnack);
            snackStore.deleteSnackFromDetails(idSnack);
            loadData();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <PageContainer>
            {loading ? <LoadingPageComponent /> : (
                <ScrollView>
                    {(pieChartData.length > 0 && (snackStore.snackDetails && snackStore.snackDetails?.calories > 0)) &&
                        <PieChart
                            data={pieChartData}
                            width={screenWidth - 40}
                            height={150}
                            chartConfig={chartConfig}
                            accessor={"population"}
                            backgroundColor={"transparent"}
                            paddingLeft={"0"}
                        />
                    }
                    <TitleText type='title'>{snackStore.snackDetails?.calories} Kcal</TitleText>
                    <InfoContainer>
                        <View>
                            <SubTitleText type='subtitle'>{t("Dinner")}:</SubTitleText>
                            <SnackInfoContainer>
                                {snackStore.snackDetails?.snacks?.map((item, index) => (
                                    <ItemSnackComponent
                                        id={item.id}
                                        quantity={item.quantity}
                                        unitMeasurement={item.unitMeasurement.name}
                                        name={item.food.name}
                                        onPressEdit={() =>
                                            router.push({
                                                pathname: `/snack/food/${idMeal}/${idTypeSnack}/${item.food.id}`,
                                                params: {
                                                    idSnack: item.id,
                                                    quantitySnack: item.quantity.toString(),
                                                    idUnitMeasurement: item.unitMeasurement.id
                                                }
                                            })}
                                        onPressDelete={() => deleteSnackFunction(item.id)}
                                        key={index}
                                    />
                                ))}

                            </SnackInfoContainer>
                        </View>
                    </InfoContainer>
                    <ButtonComponentContainer color={Colors.color.blue} onPress={() => router.navigate(`/snack/food/${idMeal}/${idTypeSnack}/search-food`)}>
                        <AddItemContainer>
                            <IconAdd name="add-circle-outline" size={26} color={Colors.color.white} />
                            <ButtonText>{t('Add new item')}</ButtonText>
                        </AddItemContainer>
                    </ButtonComponentContainer>

                    <NotesContainer>
                        <ThemedText>{t('Notes')}:</ThemedText>
                        <NotesInputContainer theme={theme} multiline={true} editable={snackStore.snackDetails?.status == StatusMeal.NotAwnsered}/>
                    </NotesContainer>

                    {snackStore.snackDetails?.status == StatusMeal.NotAwnsered && (
                    <View>
                        <ButtonComponentContainer color={Colors.color.green}>
                            <ButtonText>{t('Completed Snack')}</ButtonText>
                        </ButtonComponentContainer>
                        <ButtonComponentContainer color={Colors.color.red}>
                            <ButtonText>{t('Snack not finished')}</ButtonText>
                        </ButtonComponentContainer>
                    </View>
                    )}
                </ScrollView>
            )}
        </PageContainer>
    )
}