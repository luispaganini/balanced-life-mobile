import { View, Text, ScrollView, Keyboard, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaViewComponent } from '@/styles/pages'
import { ButtonsContainer, ContainerPage, ErrorText, TextInputValue } from './styles'
import { Controller, useForm } from 'react-hook-form'
import InputFormComponent from '@/components/application/Inputs/InputFormComponent'
import { Colors } from '@/constants/Colors'
import ButtonComponent from '@/components/application/Forms/ButtonComponent'
import { router } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { getReferenceValuesFood } from '@/utils/functionsFood'
import InputWithTagComponent from '@/components/application/Inputs/InputWithTagComponent'
import IFoodInterface from '@/interfaces/Snack/Food/IFoodInterface'
import { createFood } from '@/services/snack/food'
import { FormData, INutritionalComposition } from '@/interfaces/Snack/Food/INutritionalComposition'
import LoadingPageComponent from '@/components/application/Lists/LoadingPageComponent'

export default function AddFoodPage() {
    const [loading, setLoading] = useState(true)
    const [referenceValues, setReferenceValues] = useState<INutritionalComposition[]>([])
    const { t } = useTranslation()
    const { control, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
        defaultValues: {
            name: "",
            quantity: "",
        },
    })

    useEffect(() => {
        async function fetchReferenceValues() {
            const values: any = await getReferenceValuesFood()
            setReferenceValues(values)
            setLoading(false)
        }

        fetchReferenceValues()
    }, [])

    const convertTo100g = (quantity: number, totalQuantity: number): number => (quantity / totalQuantity) * 100
    
    const onSubmit = async (data: FormData) => {
        setLoading(true)
        const totalQuantity = parseFloat(data.quantity)
        Keyboard.dismiss()
        try {
            const foodData: IFoodInterface = {
                id: undefined,
                name: data.name,
                idFoodGroup: undefined,
                referenceTable: "usuário",
                brand: "",
                foodNutritionInfo: referenceValues.map(item => {
                    const quantity = parseFloat(data[`composition_${item.id}`])
                    const adjustedQuantity = convertTo100g(quantity, totalQuantity)

                    return {
                        id: undefined,
                        unitMeasurement: {
                            id: item.unitMeasurement.id,
                            name: item.unitMeasurement.name,
                        },
                        quantity: adjustedQuantity,
                        nutritionalComposition: {
                            id: item.id,
                            item: item.item,
                        }
                    }
                })
            }
            const response = await createFood(foodData)
            if (response) {
                Alert.alert(t("Add food"), t("Food created successfully"))
                router.back()
            }
        } catch (error) {
            console.log(error)
            Alert.alert(t("Add food"), t("An error occurred, verify if all fields are filled and if not exists a food with the same name"))
        } finally {
            setLoading(false)
        }
    }

    return (
        <SafeAreaViewComponent>
            {loading ? (
                <LoadingPageComponent />
            ) : (

            <ContainerPage>
                <ScrollView>
                    <Controller
                        control={control}
                        rules={{ required: t("Name is required") }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <InputFormComponent
                                placeholder={t("Name")}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                errors={errors.name}
                                editable={true}
                                title={true}
                            />
                        )}
                        name="name"
                    />
                    <Controller
                        control={control}
                        rules={{ required: t("Quantity") + ' ' + t("is required") }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View>
                                <TextInputValue>{t("Quantity")}:</TextInputValue>
                                <InputWithTagComponent
                                    placeholder={t("Quantity")}
                                    onChangeText={onChange}
                                    value={value}
                                    editable={true}
                                    colorTag='red'
                                    tagText={'g'}
                                />
                                {errors.quantity && <ErrorText>{errors.quantity.message}</ErrorText>}
                            </View>
                        )}
                        name="quantity"
                    />


                    {referenceValues.map((item) => (
                        <Controller
                            key={item.id}
                            control={control}
                            rules={{ required: `${item.item} ${t('is required')}` }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View>
                                    <TextInputValue>{t(item.item)}:</TextInputValue>
                                    <InputWithTagComponent
                                        placeholder={t(item.item)}
                                        onChangeText={onChange}
                                        value={value}
                                        editable={true}
                                        colorTag='red'
                                        tagText={item.unitMeasurement.name}
                                    />
                                    {errors[`composition_${item.id}`] && <ErrorText>{errors[`composition_${item.id}`]?.message}</ErrorText>}
                                </View>
                            )}
                            name={`composition_${item.id}`}
                        />
                    ))}
                    <ButtonsContainer>
                        <ButtonComponent onPress={handleSubmit(onSubmit)} title={t("Add food")} color={Colors.color.green} loading={loading} />
                    </ButtonsContainer>
                </ScrollView>
            </ContainerPage>
            )}
        </SafeAreaViewComponent>
    )
}
