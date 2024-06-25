import { View, Text, Dimensions, ScrollView, TextInput } from 'react-native'
import React from 'react'
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
import ButtonComponent from '@/components/application/Forms/ButtonComponent'

export default function SnackDetailsPage() {
    const { id } = useLocalSearchParams()
    const screenWidth = Dimensions.get("window").width;
    const theme = useColorScheme();
    const { t } = useTranslation()
    const [pieChartData, setPieChartData] = React.useState(getDataPieChart([
        { nameKey: t("Carbohydrates"), population: 150, color: Colors.color.orange },
        { nameKey: t("Protein"), population: 200, color: Colors.color.red },
        { nameKey: t("Fat"), population: 80, color: Colors.color.green },
        { nameKey: t("Others"), population: 500, color: Colors.color.blue },
    ], theme))

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
                <TitleText type='title'>{500} Kcal</TitleText>
                <InfoContainer>
                    <View>
                        <SubTitleText type='subtitle'>{t("Dinner")}:</SubTitleText>
                        <SnackInfoContainer>
                            <ItemSnackComponent
                                id={1}
                                quantity={100}
                                unitMeasurement="g"
                                name="Arroz"
                                onPressEdit={() => { }}
                                onPressDelete={() => { }}
                            />
                            <ItemSnackComponent
                                id={2}
                                quantity={100}
                                unitMeasurement="g"
                                name="Feijão"
                                onPressEdit={() => { }}
                                onPressDelete={() => { }}
                            />
                            <ItemSnackComponent
                                id={3}
                                quantity={100}
                                unitMeasurement="g"
                                name="Carne"
                                onPressEdit={() => { }}
                                onPressDelete={() => { }}
                                />

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