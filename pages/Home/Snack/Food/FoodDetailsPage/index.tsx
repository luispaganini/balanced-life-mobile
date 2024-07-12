import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { NutritionalInformationContainer, PageContainer, TitleText } from './styles'
import { ThemedText } from '@/components/ThemedText'
import { useTranslation } from 'react-i18next'

export default function FoodDetailsPage() {
    const { idMeal, idTypeSnack, idFood } = useLocalSearchParams()
    const { t } = useTranslation()
    return (
        <PageContainer>
            <TitleText type='title'>Banana</TitleText>

            <NutritionalInformationContainer>
                <ThemedText type='subtitle'>{t('Nutritional Information')}:</ThemedText>
                <Text>Calories: 100</Text>
                <Text>Proteins: 1g</Text>
                <Text>Fats: 0g</Text>
                <Text>Carbohydrates: 27g</Text>
                <Text>Fiber: 3g</Text>
                <Text>Sugar: 14g</Text>
            </NutritionalInformationContainer>
        </PageContainer>
    )
}