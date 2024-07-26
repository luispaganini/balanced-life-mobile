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
import { UnitMeasurement } from '@/interfaces/Snack/Food/IFoodNutritionInfo'
import InputWithTagComponent from '@/components/application/Inputs/InputWithTagComponent'
import { ThemedText } from '@/components/ThemedText'

interface NutritionalComposition {
    id: number
    item: string
    unitMeasurement: UnitMeasurement
}

interface FormData {
    name: string
    [key: string]: string
}

export default function AddFoodPage() {
    const [loading, setLoading] = useState(false)
    const [referenceValues, setReferenceValues] = useState<NutritionalComposition[]>([])
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
        }

        fetchReferenceValues()
    }, [])

    const convertTo100g = (quantity: number, totalQuantity: number): number => (quantity / totalQuantity) * 100
    
    const onSubmit = async (data: FormData) => {
        setLoading(true)
        const totalQuantity = parseFloat(data.quantity)
        Keyboard.dismiss()
        try {
            const foodData = {
                name: data.name,
                idFoodGroup: undefined,
                referenceTable: "usuário",
                brand: "",
                foodNutritionInfo: referenceValues.map(item => {
                    const quantity = parseFloat(data[`composition_${item.id}`])
                    const adjustedQuantity = convertTo100g(quantity, totalQuantity)

                    return {
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
            console.log(foodData)
            // Enviar foodData para a API
            // const response = await createFood(foodData)
            // if (response) {
            //     router.navigate("/some-route")
            // }
        } catch (error) {
            console.log(error)
            Alert.alert(t("Create Food"), t("An error occurred"))
        } finally {
            setLoading(false)
        }
    }

    return (
        <SafeAreaViewComponent>
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
        </SafeAreaViewComponent>
    )
}
