import { View, Text, Keyboard, ScrollView } from 'react-native'
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

type FormData = {
    name: string;

}

export default function ProfileEditPage() {
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
            name: user.name ? user.name : '',
        },
    })
    const onSubmit = async (data: FormData) => {
        setLoading(true)
        Keyboard.dismiss()
    }
    return (
        <PageContainer>
            <ScrollView>
                <ImageContainer>
                    <ImageItem source={require('@/assets/images/logo.png')} />
                </ImageContainer>
                <TitleItem>{t('Update Profile')}</TitleItem>
                <Controller
                    control={control}
                    rules={{
                        required: t("Name is required"),
                    }}
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
                <ButtonsContainer>
                    <ButtonComponent onPress={handleSubmit(onSubmit)} title="Update Profile" color={Colors.color.green} loading={loading} />
                    <ButtonComponent onPress={() => router.back()} title="Back" color={Colors.color.blue} />
                </ButtonsContainer>
            </ScrollView>
        </PageContainer>
    )
}