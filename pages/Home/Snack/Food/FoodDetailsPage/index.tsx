import { View, Text, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { NutritionalInformationContainer, NutritionalInformationDataContainer, PageContainer, TitleText } from './styles'
import { ThemedText } from '@/components/ThemedText'
import { useTranslation } from 'react-i18next'
import AddFoodComponent from '@/components/application/Forms/AddFoodComponent'
import { getFoodById } from '@/services/snack/food'
import IFoodInterface from '@/interfaces/Snack/Food/IFoodInterface'
import { InfoAboutFoodContainer, ScrollViewContainer } from '@/components/application/Forms/AddFoodComponent/styles'
import IFoodNutritionInfo from '@/interfaces/Snack/Food/IFoodNutritionInfo'
import { calculateNutritionalValues } from '@/utils/functionsFood'

export default function FoodDetailsPage() {
    const { idMeal, idTypeSnack, idFood } = useLocalSearchParams()
    const { t } = useTranslation()
    const [food, setFood] = useState<IFoodInterface>()
    const [quantity, setQuantity] = useState('100')
    const [adjustedNutritionalInfo, setAdjustedNutritionalInfo] = useState<IFoodNutritionInfo[]>([])

    useEffect(() => {
        loadData()
    }, [])

    useEffect(() => {
        if (food) {
            const adjustedInfo = calculateNutritionalValues(food.foodNutritionInfo, parseFloat(quantity.length > 0 ? quantity : '0'))
            setAdjustedNutritionalInfo(adjustedInfo)
        }
    }, [quantity, food])

    const loadData = async () => {
        try {
            const food = await getFoodById(parseInt(idFood as string))
            setFood(food)
        } catch (error) {
            console.error(error)
        }
    }

    const addSnack = () => {
        console.log('Add snack')
    }
    

    return (
        <PageContainer>
            {food && (
                <PageContainer>
                    <ScrollViewContainer>
                        <TitleText type='title'>{food.name}</TitleText>

                        <NutritionalInformationContainer>
                            <InfoAboutFoodContainer>
                                {food.brand && <ThemedText type='defaultSemiBold'>{t('Brand')}: <ThemedText>{food.brand}</ThemedText></ThemedText>}
                                <ThemedText type='defaultSemiBold'>{t('Reference Table')}: {food.referenceTable}</ThemedText>
                            </InfoAboutFoodContainer>
                            <ThemedText type='subtitle'>{t('Nutritional Information')}:</ThemedText>
                            <NutritionalInformationDataContainer>
                                {adjustedNutritionalInfo.map((item, index) => (
                                    <ThemedText key={index}>• {t(item.nutritionalComposition.item)}: {item.quantity.toFixed(2)} {item.unitMeasurement.name}</ThemedText>
                                ))}
                            </NutritionalInformationDataContainer>
                        </NutritionalInformationContainer>
                    </ScrollViewContainer>
                    <AddFoodComponent onPress={() => {}} quantity={quantity} setQuantity={setQuantity}/>
                </PageContainer>
            )}
        </PageContainer>
    )
}
