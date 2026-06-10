import React from 'react'
import { SafeAreaViewComponent } from '@/styles/pages'
import { ActivityIndicator, Alert, Keyboard, View } from 'react-native'
import {
    ButtonComponent,
    ContainerPage,
    ForgotPassword,
    ForgotPasswordText,
    ImageContainer,
    ImageItem,
    TextComponent,
    DividerContainer,
    DividerLine,
    DividerText,
    GoogleButton,
    GoogleButtonText,
    FormWrapper
} from './styles'
import { Controller, useForm } from 'react-hook-form'
import InputFormComponent from '@/components/application/Inputs/InputFormComponent'
import CreateAccountInfoComponent from '@/components/application/Info/CreateAccountInfoComponent'
import { useTranslation } from 'react-i18next'
import { router } from 'expo-router'
import { login, loginVerifyCPF, googleLogin } from '@/services/login/login'
import useUserStore from '@/store/UserStore'
import useTokenStore from '@/store/TokenStore'
import { AntDesign } from '@expo/vector-icons'
import { signInWithGoogle } from '@/services/auth/googleAuth'
import { getFriendlyErrorMessage } from '../../../utils/errorHelper'

export default function LoginOne() {
    const { t } = useTranslation();
    const { setUser } = useUserStore();
    const { setRefreshToken, setAccessToken } = useTokenStore();
    const [loading, setLoading] = React.useState(false)

    const onSubmit = async (data: { cpf: string, password: string }) => {
        Keyboard.dismiss()
        setLoading(true);
        try {
            const response = await login(data.cpf, data.password);

            if (response.status === 200) {
                setAccessToken(response.data.accessToken)
                setRefreshToken(response.data.refreshToken)

                try {
                    const userResponse = await loginVerifyCPF(data.cpf)
                    if (userResponse) {
                        setUser(userResponse)
                    }
                } catch (userError) {
                    console.log("Failed to fetch user profile", userError)
                }

                router.navigate("/")
            }
        } catch (error: any) {
            console.log(error)
            const friendlyMessage = getFriendlyErrorMessage(error, t("Error on login"));
            Alert.alert("Login", friendlyMessage);
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const googleRes = await signInWithGoogle();
            if (googleRes.success && googleRes.idToken) {
                // Role ID 1 is for Patient/User in mobile client
                const response = await googleLogin(googleRes.idToken, 1);
                if (response.status === 200) {
                    setAccessToken(response.data.accessToken)
                    setRefreshToken(response.data.refreshToken)

                    if (googleRes.email) {
                        try {
                            const userResponse = await loginVerifyCPF(googleRes.email)
                            if (userResponse) {
                                setUser(userResponse)
                            }
                        } catch (userError) {
                            console.log("Failed to fetch user profile for Google email", userError)
                        }
                    }
                    router.navigate("/")
                } else {
                    Alert.alert(t('Google Sign-In'), t('Failed to authenticate with Google'));
                }
            }
        } catch (error: any) {
            console.error('Google Sign-In failed:', error);
            const friendlyMessage = getFriendlyErrorMessage(error, t("Failed to authenticate with Google"));
            Alert.alert(
                t('Google Sign-In'),
                friendlyMessage
            );
        } finally {
            setLoading(false);
        }
    }

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            cpf: "",
            password: "",
        },
    })

    return (
        <SafeAreaViewComponent style={{ backgroundColor: '#111827' }}>
            <ContainerPage>
                <ImageContainer testID="login-logo">
                    <ImageItem source={require('@/assets/images/logo.png')} />
                </ImageContainer>

                <FormWrapper>
                    <Controller
                        control={control}
                        rules={{
                            required: t("E-mail or CPF is required"),
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <InputFormComponent
                                testID="email-cpf-input"
                                placeholder={t("E-mail or CPF")}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                errors={errors.cpf}
                                editable={true}
                                keyboardType="default"
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
                                testID="password-input"
                                placeholder={t("Password")}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                errors={errors.password}
                                editable={true}
                                password={true}
                            />
                        )}
                        name="password"
                    />

                    <ForgotPassword onPress={() => router.navigate("/pin-code")}>
                        <ForgotPasswordText>{t('I forgot my password')}</ForgotPasswordText>
                    </ForgotPassword>

                    <ButtonComponent testID="login-button" onPress={handleSubmit(onSubmit)}>
                        {loading ?
                            <ActivityIndicator size="small" color="#fff" />
                            :
                            <TextComponent>{t("Login")}</TextComponent>
                        }
                    </ButtonComponent>

                    <DividerContainer>
                        <DividerLine />
                        <DividerText>{t('OU')}</DividerText>
                        <DividerLine />
                    </DividerContainer>

                    <GoogleButton testID="google-login-button" onPress={handleGoogleLogin}>
                        <AntDesign name="google" size={20} color="#DB4437" />
                        <GoogleButtonText>{t('Entrar com o Google')}</GoogleButtonText>
                    </GoogleButton>
                </FormWrapper>

                <CreateAccountInfoComponent />
            </ContainerPage>
        </SafeAreaViewComponent>
    )
}