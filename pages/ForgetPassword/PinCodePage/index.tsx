import { View, Text, TextStyle, Keyboard, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { OtpInput } from 'react-native-otp-entry'
import { useColorScheme } from '@/hooks/useColorScheme'
import { Colors } from '@/constants/Colors'
import { ButtonContainer, ContainerPage, ImageContainer, ImageItem, InputContainer, SendCodeButton, TitleItem } from './styles'
import ButtonComponent from '@/components/application/Forms/ButtonComponent'
import { useTranslation } from 'react-i18next'
import { resetPasswordGenerateCode, verifyPasswordCode } from '@/services/user/user'
import useUserStore from '@/store/UserStore'
import IUserInterface from '@/interfaces/User/IUserInterface'
import { router } from 'expo-router'
import { ThemedText } from '@/components/ThemedText'
import useTokenStore from '@/store/TokenStore'


export default function PinCodePage() {
    const [code, setCode] = React.useState('')
    const colorScheme = useColorScheme()
    const { t } = useTranslation()
    const { user } = useUserStore() as { user: IUserInterface }
    const { setAccessToken, setRefreshToken } = useTokenStore()
    const [counter, setCounter] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (counter > 0)
            timer = setTimeout(() => setCounter(counter - 1), 1000);

        return () => clearTimeout(timer);
    }, [counter]);


    const sendCode = async () => {
        try {
            const response = await resetPasswordGenerateCode(user.id as number)
            if (response.status == 200){
                Alert.alert(t('Success'), t('Code sent to your email'))
                setCounter(60);
            } else
                Alert.alert(t('Error'), t(response.data.message))

        } catch (error) {
            Alert.alert(t('Error'), t('Error sending code'))
            console.log(error)
        }
    }

    const onSubmitCode = async () => {
        if (code.length == 6) {
            setLoading(true)
            try {
                const response = await verifyPasswordCode(code)
                if (response.status !== 200) 
                    Alert.alert(t('Error'), t(response.data.message))
                else {
                    setAccessToken(response.data.accessToken)
                    setRefreshToken(response.data.refreshToken)
                    router.dismiss()
                    router.replace('(forget)/new-password')
                }

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        } else {
            Alert.alert(t('Error'), t('The code need to have 6 digits'))
        }
    }
    return (
        <ContainerPage>
            <View>
                <ImageContainer>
                    <ImageItem source={require('@/assets/images/logo.png')} />
                </ImageContainer>
                <TitleItem>{t('Recover my password')}</TitleItem>
            </View>
            <InputContainer>
                <OtpInput
                    numberOfDigits={6}
                    onTextChange={(text) => { setCode(text) }}
                    focusColor={colorScheme == `dark` ? Colors.color.cyan : Colors.color.black}
                    focusStickBlinkingDuration={500}
                    onFilled={(text) => {
                        setCode(text);
                        Keyboard.dismiss();
                    }}
                    theme={{
                        pinCodeContainerStyle: { borderColor: Colors[colorScheme ?? 'light'].border },
                        pinCodeTextStyle: { color: Colors[colorScheme ?? 'light'].text },
                    }}
                />
                <SendCodeButton onPress={sendCode} disabled={counter > 0}>
                    <ThemedText type='defaultSemiBold'>{counter > 0 ? counter : t('Send Code')}</ThemedText>
                </SendCodeButton>
            </InputContainer>
            <ButtonContainer>
                <ButtonComponent title={t("Verify Code")} onPress={onSubmitCode} color={Colors.color.green} loading={loading} />
                <ButtonComponent title={t("Back")} onPress={() => router.back()} color={Colors.color.blue} loading={false} />
            </ButtonContainer>
        </ContainerPage>
    )
}