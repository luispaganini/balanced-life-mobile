import { View, Text, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { KeyboardAvoidingViewStyled, NutritionalInformationContainer, NutritionalInformationDataContainer, TitleText, ScrollViewContainer, InfoAboutFoodContainer } from './styles'
import { ThemedText } from '@/components/ThemedText'
import { useTranslation } from 'react-i18next'
import AddFoodComponent from '@/components/application/Forms/AddFoodComponent'
import { getFoodById } from '@/services/snack/food'
import IFoodInterface from '@/interfaces/Snack/Food/IFoodInterface'
import IFoodNutritionInfo from '@/interfaces/Snack/Food/IFoodNutritionInfo'
import { calculateNutritionalValues } from '@/utils/functionsFood'
import { setSnack, updateSnack } from '@/services/snack/snack'
import { useSnackStore } from '@/store/SnackStore'

export default function FoodDetailsPage() {
    const { idMeal, idTypeSnack, idFood, idSnack, idUnitMeasurement, quantitySnack } = useLocalSearchParams()
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
            const foodData = await getFoodById(parseInt(idFood as string))
            setFood(foodData)
        } catch (error) {
            console.error(error)
        }
    }

    const addSnack = async () => {
        try {
            const newSnack = await setSnack({
                appointment: snackStore.date,
                idFood: parseInt(idFood as string),
                idMeal: parseInt(idMeal as string),
                idTypeSnack: parseInt(idTypeSnack as string),
                quantity: parseFloat(quantity),
                idUnitMeasurement: 10004
            })
            snackStore.addSnackToDetails(newSnack)
            router.dismissAll()
            router.push(`/snack/${idMeal}/${idTypeSnack}`)
        } catch (error) {
            console.error(error)
        }
    }

    const update = async () => {
        try {
            const updatedSnack = await updateSnack({
                appointment: snackStore.date,
                idFood: parseInt(idFood as string),
                idMeal: parseInt(idMeal as string),
                idTypeSnack: parseInt(idTypeSnack as string),
                quantity: parseFloat(quantity),
                idUnitMeasurement: parseInt(idUnitMeasurement as string) ?? 0
            }, parseInt(idSnack as string))
            snackStore.updateSnackInDetails(updatedSnack)
            router.dismissAll()
            router.replace(`/snack/${idMeal}/${idTypeSnack}`)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <KeyboardAvoidingViewStyled
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            {food ? (
                <>
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
                    <AddFoodComponent 
                        onPress={idSnack ? update : addSnack} 
                        quantity={quantity} 
                        setQuantity={setQuantity}
                        isUpdate={!!idSnack}
                    />
                </>
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Loading...</Text>
                </View>
            )}
        </KeyboardAvoidingViewStyled>
    )
}