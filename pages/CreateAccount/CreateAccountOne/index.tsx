import { View, Text, Keyboard, ScrollView, Button } from 'react-native'
import React from 'react'
import { SafeAreaViewComponent } from '@/styles/pages'
import { router } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { ButtonsContainer, ContainerPage, ImageContainer, ImageItem, TitleItem } from './styles'
import { useTranslation } from 'react-i18next'
import InputFormComponent from '@/components/application/Forms/InputFormComponent'
import useUserStore from '@/store/UserStore'
import ButtonComponent from '@/components/application/Forms/ButtonComponent'
import { Colors } from '@/constants/Colors'
import CalendarPickerComponent from '@/components/application/Forms/CalendarPickerComponent'

export default function CreateAccountOne() {
    const { t } = useTranslation();
    const { user, setUser } = useUserStore();
    const onSubmit = (data: { email: string, cpf: string, password: string, phoneNumber: string, birthDate: string }) => {
        setUser({
            email: data.email,
            cpf: data.cpf,
            password: data.password,
            phoneNumber: data.phoneNumber,
            birth: data.birthDate,
            district: "",
            expirationLicence: null,
            facebook: "",
            id: null,
            idCity: null,
            idUserLevel: null,
            instagram: "",
            isCompleteProfile: false,
            name: "",
            number: null,
            sex: "",
            street: "",
            urlImage: "",
            whatsapp: "",
            zipCode: ""
        })

        Keyboard.dismiss()
        router.navigate("/")
    }


    const {
        control,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm({
        defaultValues: {
            email: user?.email ? user.email : "",
            cpf: user?.cpf ? user.cpf : "",
            password: "",
            confirmPassword: "",
            phoneNumber: user?.phoneNumber ? user.phoneNumber : "",
            birthDate: user?.birth ? user.birth : "",
        },
    })
    const password = watch('password');
    return (
        <SafeAreaViewComponent>
            <ContainerPage>
                <ScrollView>
                <ImageContainer>
                    <ImageItem source={require('@/assets/images/logo.png')} />
                </ImageContainer>
                <TitleItem>{t('Create Account')}</TitleItem>
                    <Controller
                        control={control}
                        rules={{
                            required: t("E-mail is required"),
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: t("Invalid e-mail address"),
                            },
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <InputFormComponent
                                placeholder={t("E-mail")}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                errors={errors.email}
                                editable={true}
                                title={true}
                            />
                        )}
                        name="email"
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: t("CPF is required"),
                            validate: {
                                cpf: (value) => {
                                    if (value.length < 14)
                                        return t("CPF is required")
                                }
                            },
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
                                title={true}
                            />
                        )}
                        name="cpf"
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: t("Password is required"),
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <InputFormComponent
                                placeholder={t("Password")}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                errors={errors.password}
                                editable={true}
                                password={true}
                                title={true}
                            />
                        )}
                        name="password"
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: t("Password is required"),
                            validate: (value) =>
                                value === password || t("Passwords do not match")
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <InputFormComponent
                                placeholder={t("Confirm Password")}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                errors={errors.confirmPassword}
                                editable={true}
                                password={true}
                                title={true}
                            />
                        )}
                        name="confirmPassword"
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: t("Cellphone is required"),
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <InputFormComponent
                                placeholder={t("Cellphone")}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                errors={errors.phoneNumber}
                                editable={true}
                                title={true}
                                mask={true}
                                keyboardType='numeric'
                                typeMask='cel-phone'
                            />
                        )}
                        name="phoneNumber"
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: t("Birth Date is required"),
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <CalendarPickerComponent 
                                value={value} 
                                errors={errors.birthDate} 
                                onChange={onChange} 
                                maximumDate={new Date}
                                title={true}
                                placeholder={t("Birthdate")}
                            />
                        )}
                        name="birthDate"
                    />
                    <ButtonsContainer>
                        <ButtonComponent onPress={handleSubmit(onSubmit)} title="Create Account" color={Colors.color.green} />
                        <ButtonComponent onPress={() => router.navigate("/login/login-one")} title="Back" color={Colors.color.blue} />
                    </ButtonsContainer>
                </ScrollView>
            </ContainerPage>
        </SafeAreaViewComponent>
    )
}