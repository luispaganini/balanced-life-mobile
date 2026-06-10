import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Controller } from 'react-hook-form'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { SafeAreaViewComponent } from '@/styles/pages'
import InputFormComponent from '@/components/application/Inputs/InputFormComponent'
import CreateAccountInfoComponent from '@/components/application/Info/CreateAccountInfoComponent'
import { Colors } from '@/constants/Colors'

import * as S from './styles'
import { useLoginOne } from './hooks/useLoginOne'

export default function LoginOne() {
    const {
        control,
        handleSubmit,
        errors,
        loading,
        colorScheme,
        onSubmit,
        handleGoogleLogin,
        t,
    } = useLoginOne();

    return (
        <SafeAreaViewComponent style={{ backgroundColor: colorScheme === 'light' ? Colors.light.background : Colors.dark.background }}>
            <StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />
            <S.ContainerPage theme={colorScheme}>
                <S.ImageContainer testID="login-logo">
                    <S.ImageItem source={require('@/assets/images/logo.png')} />
                </S.ImageContainer>

                <S.FormWrapper>
                    <Controller
                        control={control}
                        rules={{
                            required: t("E-mail is required"),
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <InputFormComponent
                                testID="email-cpf-input"
                                placeholder={t("E-mail")}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                errors={errors.email}
                                editable={true}
                                keyboardType="default"
                                title={true}
                            />
                        )}
                        name="email"
                    />

                    <Controller
                        control={control}
                        rules={{
                            required: t("Password is required"),
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <InputFormComponent
                                testID="password-input"
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

                    <S.ForgotPassword onPress={() => router.navigate("/pin-code")}>
                        <S.ForgotPasswordText>{t('I forgot my password')}</S.ForgotPasswordText>
                    </S.ForgotPassword>

                    <S.ButtonComponent testID="login-button" onPress={handleSubmit(onSubmit)}>
                        {loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <S.TextComponent>{t("Login")}</S.TextComponent>
                        )}
                    </S.ButtonComponent>

                    <S.DividerContainer>
                        <S.DividerLine theme={colorScheme} />
                        <S.DividerText>{t('OU')}</S.DividerText>
                        <S.DividerLine theme={colorScheme} />
                    </S.DividerContainer>

                    <S.GoogleButton testID="google-login-button" theme={colorScheme} onPress={handleGoogleLogin}>
                        <AntDesign name="google" size={20} color="#DB4437" />
                        <S.GoogleButtonText theme={colorScheme}>{t('Entrar com o Google')}</S.GoogleButtonText>
                    </S.GoogleButton>
                </S.FormWrapper>

                <CreateAccountInfoComponent />
            </S.ContainerPage>
        </SafeAreaViewComponent>
    )
}