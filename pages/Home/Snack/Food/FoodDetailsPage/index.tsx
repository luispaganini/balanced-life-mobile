import { View, Text, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { NutritionalInformationContainer, NutritionalInformationDataContainer, PageContainer, TitleText } from './styles'
import { ThemedText } from '@/components/ThemedText'
import { useTranslation } from 'react-i18next'
import AddFoodComponent from '@/components/application/Forms/AddFoodComponent'
import { getFoodById } from '@/services/snack/food'
import IFoodInterface from '@/interfaces/Snack/Food/IFoodInterface'
import { InfoAboutFoodContainer, ScrollViewContainer } from '@/components/application/Forms/AddFoodComponent/styles'
import IFoodNutritionInfo from '@/interfaces/Snack/Food/IFoodNutritionInfo'
import { calculateNutritionalValues } from '@/utils/functionsFood'
import { setSnack, updateSnack } from '@/services/snack/snack'
import { useSnackStore } from '@/store/SnackStore'

export default function FoodDetailsPage() {
    const { idMeal, idTypeSnack, idFood } = useLocalSearchParams()

    //If the method is update
    const { idSnack, idUnitMeasurement, quantitySnack } = useLocalSearchParams()

    const { t } = useTranslation()
    const [food, setFood] = useState<IFoodInterface>()
    const [quantity, setQuantity] = useState(quantitySnack ? quantitySnack as string : '100')
    const [adjustedNutritionalInfo, setAdjustedNutritionalInfo] = useState<IFoodNutritionInfo[]>([])
    const snackStore = useSnackStore()

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

    const addSnack = async () => {
        try {
            const snack = await setSnack({
                appointment: snackStore.date,
                idFood: parseInt(idFood as string),
                idMeal: parseInt(idMeal as string),
                idTypeSnack: parseInt(idTypeSnack as string),
                quantity: parseFloat(quantity),
                idUnitMeasurement: 10004
            })

            snackStore.addSnackToDetails(snack)
            router.dismissAll()
            router.push(`/snack/${idMeal}/${idTypeSnack}`)
        } catch (error) {
            console.error(error)
        }
    }

    const update = async () => {
        try {
            const snack = await updateSnack({
                appointment: snackStore.date,
                idFood: parseInt(idFood as string),
                idMeal: parseInt(idMeal as string),
                idTypeSnack: parseInt(idTypeSnack as string),
                quantity: parseFloat(quantity),
                idUnitMeasurement: parseInt(idUnitMeasurement as string) ?? 0
            }, parseInt(idSnack as string))

            snackStore.updateSnackInDetails(snack)
            router.back()
        } catch (error) {
            console.error(error)
        }
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
                    <AddFoodComponent onPress={() => {idSnack ? update() : addSnack()}} quantity={quantity} setQuantity={setQuantity}/>
                </PageContainer>
            )}
        </PageContainer>
    )
}
