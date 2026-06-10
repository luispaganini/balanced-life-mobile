import { View, Keyboard, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { OtpInput } from 'react-native-otp-entry'
import { useColorScheme } from '@/hooks/useColorScheme'
import { Colors } from '@/constants/Colors'
import { StatusBar } from 'expo-status-bar'
import {
    ButtonContainer,
    ContainerPage,
    ImageContainer,
    ImageItem,
    InputContainer,
    SendCodeButton,
    SendCodeButtonText,
    TitleItem,
    DescriptionText,
    FormWrapper
} from './styles'
import ButtonComponent from '@/components/application/Forms/ButtonComponent'
import InputFormComponent from '@/components/application/Inputs/InputFormComponent'
import { useTranslation } from 'react-i18next'
import { generateResetCodeByLogin } from '@/services/login/login'
import { verifyPasswordCode } from '@/services/user/user'
import { router } from 'expo-router'
import useTokenStore from '@/store/TokenStore'
import { SafeAreaViewComponent } from '@/styles/pages'

export default function PinCodePage() {
    const colorScheme = useColorScheme()
    const { t } = useTranslation()
    const { setAccessToken, setRefreshToken } = useTokenStore()

    const [step, setStep] = useState<'email' | 'otp'>('email')
    const [emailOrCpf, setEmailOrCpf] = useState('')
    const [code, setCode] = useState('')
    const [counter, setCounter] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (counter > 0)
            timer = setTimeout(() => setCounter(counter - 1), 1000);

        return () => clearTimeout(timer);
    }, [counter]);

    const handleVerifyUser = async () => {
        if (!emailOrCpf.trim()) {
            Alert.alert(t('Error'), t('E-mail is required'));
            return;
        }
        Keyboard.dismiss()
        setLoading(true);
        try {
            const sendRes = await generateResetCodeByLogin(emailOrCpf);
            if (sendRes.status === 200) {
                Alert.alert(t('Success'), t('Code sent to your email'));
                setCounter(60);
                setStep('otp');
            } else {
                Alert.alert(t('Error'), t('User not found'));
            }
        } catch (error) {
            console.log(error);
            Alert.alert(t('Error'), t('Failed to verify user account'));
        } finally {
            setLoading(false);
        }
    }

    const sendCodeAgain = async () => {
        if (!emailOrCpf.trim()) return;
        setLoading(true);
        try {
            const response = await generateResetCodeByLogin(emailOrCpf)
            if (response.status === 200) {
                Alert.alert(t('Success'), t('Code sent to your email'))
                setCounter(60);
            } else {
                Alert.alert(t('Error'), t('Failed to send code'))
            }
        } catch (error) {
            Alert.alert(t('Error'), t('Error sending code'))
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    const onSubmitCode = async () => {
        if (code.length === 6) {
            setLoading(true)
            try {
                const response = await verifyPasswordCode(code)
                if (response.status !== 200) {
                    Alert.alert(t('Error'), t('Invalid or expired code'))
                } else {
                    setAccessToken(response.data.accessToken)
                    setRefreshToken(response.data.refreshToken)

                    // Replace to password reset page passing recovering user ID
                    router.replace({
                        pathname: '/new-password',
                        params: { userId: response.data.userId.toString() }
                    })
                }
            } catch (error) {
                Alert.alert(t('Error'), t('Invalid or expired code'))
                console.log(error)
            } finally {
                setLoading(false)
            }
        } else {
            Alert.alert(t('Error'), t('The code needs to have 6 digits'))
        }
    }

    return (
        <SafeAreaViewComponent style={{ backgroundColor: colorScheme === 'light' ? Colors.light.background : Colors.dark.background }}>
            <StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />
            <ContainerPage theme={colorScheme}>
                <View>
                    <ImageContainer>
                        <ImageItem source={require('@/assets/images/logo.png')} />
                    </ImageContainer>
                    <TitleItem theme={colorScheme}>{t('Recover my password')}</TitleItem>
                    <DescriptionText>
                        {step === 'email'
                            ? t('Insira seu e-mail ou CPF cadastrado para receber o código de recuperação.')
                            : t('Digite o código de 6 dígitos enviado para seu e-mail cadastrado.')
                        }
                    </DescriptionText>
                </View>

                <FormWrapper>
                    {step === 'email' ? (
                        <View style={{ width: '100%' }}>
                            <InputFormComponent
                                testID="forgot-email-cpf-input"
                                placeholder={t("E-mail")}
                                onBlur={() => { }}
                                onChangeText={(text) => setEmailOrCpf(text)}
                                value={emailOrCpf}
                                errors={undefined}
                                editable={true}
                                keyboardType="default"
                                title={true}
                            />
                        </View>
                    ) : (
                        <InputContainer>
                            <OtpInput
                                numberOfDigits={6}
                                onTextChange={(text) => setCode(text)}
                                focusColor={colorScheme === 'dark' ? Colors.color.cyan : Colors.color.black}
                                focusStickBlinkingDuration={500}
                                onFilled={(text) => {
                                    setCode(text);
                                    Keyboard.dismiss();
                                }}
                                theme={{
                                    pinCodeContainerStyle: {
                                        borderColor: Colors[colorScheme === 'dark' ? 'dark' : 'light'].border,
                                        backgroundColor: Colors[colorScheme === 'dark' ? 'dark' : 'light'].card
                                    },
                                    pinCodeTextStyle: { color: Colors[colorScheme === 'dark' ? 'dark' : 'light'].text },
                                }}
                            />
                            <SendCodeButton onPress={sendCodeAgain} disabled={counter > 0}>
                                <SendCodeButtonText>
                                    {counter > 0
                                        ? `${t('Reenviar em')} ${counter}s`
                                        : t('Send Code Again')
                                    }
                                </SendCodeButtonText>
                            </SendCodeButton>
                        </InputContainer>
                    )}
                </FormWrapper>

                <ButtonContainer>
                    {step === 'email' ? (
                        <ButtonComponent
                            testID="verify-account-button"
                            title={t("Verify Account")}
                            onPress={handleVerifyUser}
                            color={Colors.color.green}
                            loading={loading}
                        />
                    ) : (
                        <ButtonComponent
                            title={t("Verify Code")}
                            onPress={onSubmitCode}
                            color={Colors.color.green}
                            loading={loading}
                        />
                    )}
                    <ButtonComponent
                        testID="forgot-back-button"
                        title={t("Back")}
                        onPress={() => {
                            if (step === 'otp') {
                                setStep('email');
                            } else {
                                router.back();
                            }
                        }}
                        color={Colors.color.blue}
                        loading={false}
                    />
                </ButtonContainer>
            </ContainerPage>
        </SafeAreaViewComponent>
    )
}