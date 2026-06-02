import React, { useEffect } from 'react'
import { SafeAreaViewComponent } from '@/styles/pages'
import { ActivityIndicator, Alert, Keyboard, View } from 'react-native'
import { 
    ButtonComponent, 
    ContainerPage, 
    ForgotPassword, 
    ImageContainer, 
    ImageItem, 
    TextComponent, 
    Title,
    DividerContainer,
    DividerLine,
    DividerText,
    GoogleButton,
    GoogleButtonText
} from './styles'
import { Controller, useForm } from 'react-hook-form'
import InputFormComponent from '@/components/application/Inputs/InputFormComponent'
import CreateAccountInfoComponent from '@/components/application/Info/CreateAccountInfoComponent'
import { useTranslation } from 'react-i18next'
import { router } from 'expo-router'
import { login, loginVerifyCPF } from '@/services/login/login'
import useUserStore from '@/store/UserStore'
import useTokenStore from '@/store/TokenStore'
import { ThemedText } from '@/components/ThemedText'
import { Colors } from '@/constants/Colors'
import { AntDesign } from '@expo/vector-icons'

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
                
                // Fetch and set user profile info
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
            if (error.response?.status === 401) {
                Alert.alert("Login", t("Invalid CPF or password"))
            } else {
                Alert.alert("Login", t("Error on login"))
            }
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        Alert.alert(
            t('Google Sign-In'),
            t('Deseja entrar com a sua conta Google associada ao consultório?'),
            [
                {
                    text: t('Simular'),
                    onPress: async () => {
                        setLoading(true);
                        try {
                            // Using local test CPF credentials configured in backend
                            const response = await login("794.301.470-72", "admin123");
                            if (response.status === 200) {
                                setAccessToken(response.data.accessToken)
                                setRefreshToken(response.data.refreshToken)
                                const userResponse = await loginVerifyCPF("794.301.470-72")
                                if (userResponse) setUser(userResponse)
                                router.navigate("/")
                            }
                        } catch (err) {
                            Alert.alert(t('Error'), t('Failed to authenticate with simulated Google account'));
                        } finally {
                            setLoading(false);
                        }
                    }
                },
                {
                    text: t('Cancelar'),
                    style: 'cancel'
                }
            ]
        );
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
        <SafeAreaViewComponent>
            <ContainerPage>
                <ImageContainer>
                    <ImageItem source={require('@/assets/images/logo.png')} />
                </ImageContainer>

                <View>
                    <Controller
                        control={control}
                        rules={{
                            required: t("E-mail or CPF is required"),
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <InputFormComponent
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
                        <ThemedText type='defaultSemiBold'>{t('I forgot my password')}</ThemedText>
                    </ForgotPassword>

                    <ButtonComponent onPress={handleSubmit(onSubmit)}>
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

                    <GoogleButton onPress={handleGoogleLogin}>
                        <AntDesign name="google" size={20} color="#DB4437" />
                        <GoogleButtonText>{t('Entrar com o Google')}</GoogleButtonText>
                    </GoogleButton>
                </View>
                <CreateAccountInfoComponent />
            </ContainerPage>
        </SafeAreaViewComponent>
    )
}