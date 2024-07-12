import { View, Text, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { NutritionalInformationContainer, NutritionalInformationDataContainer, PageContainer, TitleText } from './styles'
import { ThemedText } from '@/components/ThemedText'
import { useTranslation } from 'react-i18next'
import AddFoodComponent from '@/components/application/Forms/AddFoodComponent'

export default function FoodDetailsPage() {
    const { idMeal, idTypeSnack, idFood } = useLocalSearchParams()
    const { t } = useTranslation()

    const nutritionalInformation = [
        {
            name: 'Calories',
            value: 55
        },
        {
            name: 'Protein',
            value: 1.3
        },
        {
            name: 'Carbohydrates',
            value: 14.3
        },
        {
            name: 'Fat',
            value: 0.3
        },
        {
            name: 'Fiber',
            value: 1.6
        },
        {
            name: 'Sugars',
            value: 12.2
        },
        {
            name: 'Saturated Fat',
            value: 0.1
        },
        {
            name: 'Monounsaturated Fat',
            value: 0.0
        },
        {
            name: 'Polyunsaturated Fat',
            value: 0.1
        }
    ]
    return (
        <PageContainer>
                <TitleText type='title'>Banana</TitleText>

                <NutritionalInformationContainer>
                    <ThemedText type='subtitle'>{t('Nutritional Information')}:</ThemedText>
                    <NutritionalInformationDataContainer>
                        <FlatList
                            data={nutritionalInformation}
                            renderItem={({ item }) => <ThemedText>• {t(item.name)}: {item.value}</ThemedText>}
                            keyExtractor={item => item.name}
                        />
                    </NutritionalInformationDataContainer>
                </NutritionalInformationContainer>
            <AddFoodComponent />
        </PageContainer>
    )
}