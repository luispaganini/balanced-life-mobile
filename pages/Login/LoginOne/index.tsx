import React from 'react'
import { SafeAreaViewComponent } from '@/styles/pages'
import { ActivityIndicator, Alert, Keyboard, View } from 'react-native'
import { ButtonComponent, ContainerPage, ImageContainer, ImageItem, TextComponent, Title } from './styles'
import { Controller, set, useForm } from 'react-hook-form'
import InputFormComponent from '@/components/application/Inputs/InputFormComponent'
import CreateAccountInfoComponent from '@/components/application/Info/CreateAccountInfoComponent'
import { useTranslation } from 'react-i18next'
import { router } from 'expo-router'
import { loginVerifyCPF } from '@/services/login/login'
import useUserStore from '@/store/UserStore'

export default function LoginOne() {
    const { t } = useTranslation();
    const { setUser } = useUserStore();
    const [loading, setLoading] = React.useState(false)
    const onSubmit = async (data: {cpf: string}) => {
        Keyboard.dismiss()
        setLoading(true);
        try {
            const response = await loginVerifyCPF(data.cpf)
    
            if (response && response.isCompleteProfile) {
                setUser(response)
                router.navigate("login-two")
            } else
                router.navigate("(create)/create-one")
        } catch (error) {
            console.log(error)
            Alert.alert("Login", t("Invalid CPF"))
        } finally {
            setLoading(false)
            return;
        }
    }

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            cpf: "",
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
                            }},
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
                            />
                        )}
                        name="cpf"
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