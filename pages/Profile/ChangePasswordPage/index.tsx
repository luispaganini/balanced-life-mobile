import { View, Text, Keyboard, ScrollView, Alert, SafeAreaView } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next';
import useUserStore from '@/store/UserStore';
import { Controller, useForm } from 'react-hook-form';
import IUserInterface from '@/interfaces/User/IUserInterface';
import { ButtonsContainer, ImageContainer, ImageItem, PageContainer, TitleItem } from './styles';
import InputFormComponent from '@/components/application/Inputs/InputFormComponent';
import ButtonComponent from '@/components/application/Forms/ButtonComponent';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { patchUser } from '@/services/user/user';
import LoadingPageComponent from '@/components/application/Lists/LoadingPageComponent';

type FormData = {
    password: string;
    confirmPassword: string
}

export default function ChangePasswordPage() {
    const [loading, setLoading] = React.useState(false)
    const { t } = useTranslation();
    const { user, setUser } = useUserStore() as { user: IUserInterface, setUser: (user: IUserInterface) => void };

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm({
        defaultValues: {
            password: '',
            confirmPassword: ''
        },
    })
    const password = watch('password');
    const onSubmit = async (data: FormData) => {
        setLoading(true)
        Keyboard.dismiss()
        try {
            const response = await patchUser({
                password: data.password,
                id: undefined,
                name: undefined,
                birth: undefined,
                email: undefined,
                urlImage: undefined,
                gender: undefined,
                cpf: undefined,
                street: undefined,
                number: undefined,
                zipCode: undefined,
                location: undefined,
                userRole: undefined,
                phoneNumber: undefined,
                instagram: undefined,
                facebook: undefined,
                whatsapp: undefined,
                expirationLicence: undefined,
                isCompleteProfile: undefined,
                district: undefined
            }, user.id as number)

            if ('id' in response) {
                setUser(response)
                Alert.alert(t('Success'), t('Password updated successfully'))
            } else
                Alert.alert(t('Error'), response.message)

            router.back()
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <PageContainer>
            {loading ?
                <LoadingPageComponent />
                : (
                    <ScrollView>
                        <ImageContainer>
                            <ImageItem source={require('@/assets/images/logo.png')} />
                        </ImageContainer>
                        <TitleItem>{t('Update Password')}</TitleItem>
                        <Controller
                            control={control}
                            rules={{
                                required: t("Password is required"),
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                    message: t("Password must contain at least 8 characters, including a letter and a number"),
                                },
                            }
                            }
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
                                    value === password || t("Passwords do not match"),
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                    message: t("Password must contain at least 8 characters, including a letter and a number"),
                                },
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
                        <ButtonsContainer>
                            <ButtonComponent onPress={handleSubmit(onSubmit)} title="Update Password" color={Colors.color.green} loading={loading} />
                            <ButtonComponent onPress={() => router.back()} title="Back" color={Colors.color.blue} />
                        </ButtonsContainer>
                    </ScrollView>
                )}
        </PageContainer>
    )
}