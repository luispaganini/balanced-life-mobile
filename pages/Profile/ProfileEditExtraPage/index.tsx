import { View, Text, Keyboard, ScrollView, Alert } from 'react-native'
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
import CalendarPickerComponent from '@/components/application/Forms/CalendarPickerComponent';
import { formatDate } from '@/utils/functionsApp';
import GenderRadioComponent from '@/components/application/Forms/GenderRadioComponent';
import { patchUser } from '@/services/user/user';
import LoadingPageComponent from '@/components/application/Lists/LoadingPageComponent';

type FormData = {
    email: string;
    phoneNumber: string;
    birthDate: string;
    gender: string;
}

export default function ProfileEditExtraPage() {
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
            email: user.email ? user.email : '',
            phoneNumber: user.phoneNumber ? user.phoneNumber : '',
            birthDate: user?.birth ? formatDate(user.birth) : "",
            gender: user?.gender ? user.gender : "",
        },
    })
    const onSubmit = async (data: FormData) => {
        setLoading(true)
        Keyboard.dismiss()
        try {
            const response = await patchUser({
                email: data.email,
                birth: new Date(data.birthDate),
                phoneNumber: data.phoneNumber,
                gender: data.gender,
                id: undefined,
                name: undefined,
                password: undefined,
                urlImage: undefined,
                cpf: undefined,
                street: undefined,
                number: undefined,
                zipCode: undefined,
                location: undefined,
                userRole: undefined,
                instagram: undefined,
                facebook: undefined,
                whatsapp: undefined,
                expirationLicence: undefined,
                isCompleteProfile: undefined,
                district: undefined
            }, user.id as number)

            if ('id' in response) {
                setUser(response)
                Alert.alert(t('Success'), t('Profile updated successfully'))
            } else 
                Alert.alert(t('Error'), response.message)

            router.back()
        } catch (error) {
            console.error(error)
            Alert.alert(t('Error'), t('Error updating profile'))
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
                    <TitleItem>{t('Update Profile')}</TitleItem>
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
                                keyboardType='email-address'
                            />
                        )}
                        name="email"
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
                    <Controller
                        control={control}
                        rules={{
                            required: t("Gender is required"),
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <GenderRadioComponent onChange={onChange} value={value} errors={errors.gender} title={true} />
                        )}
                        name="gender"
                    />
                    <ButtonsContainer>
                        <ButtonComponent onPress={handleSubmit(onSubmit)} title="Update Profile" color={Colors.color.green} loading={loading} />
                        <ButtonComponent onPress={() => router.back()} title="Back" color={Colors.color.blue} />
                    </ButtonsContainer>
                </ScrollView>
            )}
        </PageContainer>
    )
}