import { View, ScrollView, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams, Stack } from 'expo-router'
import { 
    PageContainer, 
    HeaderContainer, 
    HeaderButton, 
    HeaderTitle, 
    ScrollContainer, 
    FoodInfoCard, 
    FoodTitleText, 
    FoodMetaText, 
    InputCard, 
    InputLabel, 
    InputRow, 
    PortionInput, 
    UnitTagContainer, 
    UnitTagText, 
    SectionTitle, 
    MacrosRow, 
    MacroCard, 
    MacroLabelRow, 
    MacroDot, 
    MacroLabel, 
    MacroValueText, 
    MacroProgressLine, 
    MacroProgressFill, 
    NutrientTableCard, 
    NutrientRow, 
    NutrientName, 
    NutrientValue, 
    ActionButton, 
    ActionButtonText,
    BottomFixedPanel
} from './styles'
import { Colors } from '@/constants/Colors'
import { useTranslation } from 'react-i18next'
import { getFoodById } from '@/services/snack/food'
import IFoodInterface from '@/interfaces/Snack/Food/IFoodInterface'
import IFoodNutritionInfo from '@/interfaces/Snack/Food/IFoodNutritionInfo'
import { calculateNutritionalValues } from '@/utils/functionsFood'
import { setSnack, updateSnack } from '@/services/snack/snack'
import { useSnackStore } from '@/store/SnackStore'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

export default function FoodDetailsPage() {
    const { idMeal, idTypeSnack, idFood } = useLocalSearchParams()
    const { idSnack, idUnitMeasurement, quantitySnack } = useLocalSearchParams()

    const { t } = useTranslation()
    const insets = useSafeAreaInsets()
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

    const handleAddSnack = async () => {
        try {
            const snack = await setSnack({
                appointment: snackStore.date,
                idFood: parseInt(idFood as string),
                idMeal: parseInt(idMeal as string),
                idTypeSnack: parseInt(idTypeSnack as string),
                quantity: parseFloat(quantity),
                idUnitMeasurement: 10004 // default g
            })

            snackStore.addSnackToDetails(snack)
            router.navigate({
                pathname: "/snack/[idMeal]/[idTypeSnack]",
                params: {
                    idMeal: idMeal as string,
                    idTypeSnack: idTypeSnack as string
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handleUpdateSnack = async () => {
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
            router.navigate({
                pathname: "/snack/[idMeal]/[idTypeSnack]",
                params: {
                    idMeal: idMeal as string,
                    idTypeSnack: idTypeSnack as string
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

    // Extract macros and energy
    const energyItem = adjustedNutritionalInfo.find(
        item => item.nutritionalComposition?.item?.toLowerCase() === "energia"
    )
    const carbItem = adjustedNutritionalInfo.find(
        item => item.nutritionalComposition?.item?.toLowerCase() === "carboidrato total"
    )
    const proteinItem = adjustedNutritionalInfo.find(
        item => item.nutritionalComposition?.item?.toLowerCase() === "proteína"
    )
    const fatItem = adjustedNutritionalInfo.find(
        item => item.nutritionalComposition?.item?.toLowerCase() === "lipídios"
    )

    const calories = energyItem?.quantity ?? 0
    const carbs = carbItem?.quantity ?? 0
    const protein = proteinItem?.quantity ?? 0
    const fat = fatItem?.quantity ?? 0

    const protPercent = Math.min((protein / 50) * 100, 100)
    const carbPercent = Math.min((carbs / 100) * 100, 100)
    const fatPercent = Math.min((fat / 30) * 100, 100)

    // Filter out the main macros to display micro-nutrients below
    const otherNutrients = adjustedNutritionalInfo.filter(
        item => {
            const name = item.nutritionalComposition?.item?.toLowerCase()
            return name !== "energia" && name !== "carboidrato total" && name !== "proteína" && name !== "lipídios"
        }
    )

    if (!food) {
        return (
            <PageContainer style={{ paddingTop: insets.top, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={Colors.color.green} />
            </PageContainer>
        )
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <PageContainer style={{ paddingTop: insets.top }}>
                <Stack.Screen options={{ headerShown: false }} />

                {/* Custom Header */}
                <HeaderContainer>
                    <HeaderButton onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={26} color={Colors.dark.text} />
                    </HeaderButton>
                    <HeaderTitle>{t("Informação Nutricional")}</HeaderTitle>
                    <View style={{ width: 36 }} />
                </HeaderContainer>

                <ScrollContainer showsVerticalScrollIndicator={false}>
                    {/* Food Meta Info */}
                    <FoodInfoCard>
                        <FoodTitleText>{food.name}</FoodTitleText>
                        {food.brand && <FoodMetaText>{t("Brand")}: {food.brand}</FoodMetaText>}
                        <FoodMetaText>{t("Reference Table")}: {food.referenceTable}</FoodMetaText>
                        <FoodMetaText style={{ marginTop: 6, fontWeight: '700', color: Colors.color.green, fontSize: 15 }}>
                            {Math.round(calories)} kcal / {quantity || '0'}g
                        </FoodMetaText>
                    </FoodInfoCard>

                    {/* Macros Row */}
                    <SectionTitle>{t("Macronutrientes")}</SectionTitle>
                    <MacrosRow>
                        <MacroCard>
                            <MacroLabelRow>
                                <MacroDot color={Colors.color.blue} />
                                <MacroLabel>{t("Proteína")}</MacroLabel>
                            </MacroLabelRow>
                            <MacroValueText>{protein.toFixed(1)}g</MacroValueText>
                            <MacroProgressLine>
                                <MacroProgressFill color={Colors.color.blue} width={protPercent} />
                            </MacroProgressLine>
                        </MacroCard>

                        <MacroCard>
                            <MacroLabelRow>
                                <MacroDot color={Colors.color.green} />
                                <MacroLabel>{t("Carb.")}</MacroLabel>
                            </MacroLabelRow>
                            <MacroValueText>{carbs.toFixed(1)}g</MacroValueText>
                            <MacroProgressLine>
                                <MacroProgressFill color={Colors.color.green} width={carbPercent} />
                            </MacroProgressLine>
                        </MacroCard>

                        <MacroCard>
                            <MacroLabelRow>
                                <MacroDot color={Colors.color.orange} />
                                <MacroLabel>{t("Gordura")}</MacroLabel>
                            </MacroLabelRow>
                            <MacroValueText>{fat.toFixed(1)}g</MacroValueText>
                            <MacroProgressLine>
                                <MacroProgressFill color={Colors.color.orange} width={fatPercent} />
                            </MacroProgressLine>
                        </MacroCard>
                    </MacrosRow>

                    {/* Detailed Table */}
                    {otherNutrients.length > 0 && (
                        <>
                            <SectionTitle>{t("Detalhes Nutricionais")}</SectionTitle>
                            <NutrientTableCard>
                                {otherNutrients.map((item, index) => {
                                    const itemName = item.nutritionalComposition?.item;
                                    return (
                                        <NutrientRow 
                                            key={index}
                                            style={{ 
                                                borderBottomWidth: index === otherNutrients.length - 1 ? 0 : 1,
                                                borderBottomColor: Colors.dark.border 
                                            }}
                                        >
                                            <NutrientName>{t(itemName)}</NutrientName>
                                            <NutrientValue>
                                                {item.quantity.toFixed(2)} {item.unitMeasurement?.name}
                                            </NutrientValue>
                                        </NutrientRow>
                                    )
                                })}
                            </NutrientTableCard>
                        </>
                    )}
                </ScrollContainer>

                <BottomFixedPanel style={{ paddingBottom: insets.bottom > 0 ? insets.bottom : 15 }}>
                    {/* Portion Size Input */}
                    <InputCard>
                        <InputLabel>{t("Quantidade Consumida")}</InputLabel>
                        <InputRow>
                            <PortionInput
                                keyboardType="numeric"
                                value={quantity}
                                onChangeText={setQuantity}
                                placeholder="100"
                                placeholderTextColor={Colors.color.grey}
                            />
                            <UnitTagContainer>
                                <UnitTagText>g</UnitTagText>
                            </UnitTagContainer>
                        </InputRow>
                    </InputCard>

                    {/* Save / Add Action Button */}
                    <ActionButton onPress={idSnack ? handleUpdateSnack : handleAddSnack}>
                        <ActionButtonText>
                            {idSnack ? t("Salvar Alterações") : t("Adicionar à Refeição")}
                        </ActionButtonText>
                    </ActionButton>
                </BottomFixedPanel>
            </PageContainer>
        </KeyboardAvoidingView>
    )
}
