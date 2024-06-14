import React from 'react'
import { SafeAreaViewComponent } from '@/styles/pages'
import { ActivityIndicator, Alert, Keyboard, View } from 'react-native'
import { ButtonComponent, ContainerPage, ImageContainer, ImageItem, TextComponent } from './styles'
import { Controller, useForm } from 'react-hook-form'
import InputFormComponent from '@/components/application/Forms/InputFormComponent'
import CreateAccountInfoComponent from '@/components/application/Info/CreateAccountInfoComponent'
import { useTranslation } from 'react-i18next'
import { router } from 'expo-router'
import useUserStore from '@/store/UserStore'
import { login } from '@/services/login/login'
import useTokenStore from '@/store/TokenStore'

export default function LoginTwo() {
    const { t } = useTranslation();
    const { user } = useUserStore();
    const { setRefreshToken, setAccessToken } = useTokenStore();
    const [loading, setLoading] = React.useState(false)
    const onSubmit = async (data: { cpf: string, password: string }) => {
        setLoading(true)
        Keyboard.dismiss()
        try {
            const response = await login(data.cpf, data.password);

            if (response) {
                setAccessToken(response.token)
                setRefreshToken(response.refreshToken)
                router.navigate("home")
            } else {
                Alert.alert("Login", t("Invalid CPF or password"))
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            cpf: user?.cpf || "",
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
                                editable={user?.cpf ? false : true}
                                keyboardType="numeric"
                                mask={true}
                                typeMask={"cpf"}
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

                    <ButtonComponent onPress={handleSubmit(onSubmit)}>
                        {loading ?
                            <ActivityIndicator size="small" color="#fff" />
                            :
                            <TextComponent>{t("Login")}</TextComponent>
                        }
                    </ButtonComponent>
                </View>
                <CreateAccountInfoComponent />
            </ContainerPage>
        </SafeAreaViewComponent>
    )
}