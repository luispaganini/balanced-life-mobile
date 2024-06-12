import React from 'react'
import { SafeAreaViewComponent } from '@/styles/pages'
import { Keyboard, View } from 'react-native'
import { ButtonComponent, ContainerPage, ImageContainer, ImageItem, TextComponent, Title } from './styles'
import { Controller, useForm } from 'react-hook-form'
import InputFormComponent from '@/components/application/Forms/InputFormComponent'
import CreateAccountInfoComponent from '@/components/application/Info/CreateAccountInfoComponent'
import { useTranslation } from 'react-i18next'
import { router } from 'expo-router'

export default function LoginOne() {
    const { t } = useTranslation();
    const onSubmit = (data: {cpf: string}) => {
        Keyboard.dismiss()
        router.navigate("login-two")
    }

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            cpf: "",
        },
    })
    return (
        <SafeAreaViewComponent>
            <ContainerPage>
                <ImageContainer>
                    <ImageItem source={require('@/assets/images/logo.png')} />
                </ImageContainer>

                <View>
                    <Controller
                        control={control}
                        rules={{
                            required: t("CPF is required"),
                            validate: {
                                cpf: (value) => {
                                    if (value.length < 14) 
                                        return t("CPF is required")
                            }},
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <InputFormComponent
                                placeholder="CPF"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                errors={errors.cpf}
                                editable={true}
                                keyboardType="numeric"
                                mask={true}
                                typeMask={"cpf"}
                            />
                        )}
                        name="cpf"
                    />

                    <ButtonComponent onPress={handleSubmit(onSubmit)}>
                        <TextComponent>{t("Login")}</TextComponent>
                    </ButtonComponent>
                </View>
                <CreateAccountInfoComponent />
            </ContainerPage>
        </SafeAreaViewComponent>
    )
}