import React, { useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { SafeAreaViewComponent } from '@/styles/pages'
import { Button, Image, View } from 'react-native'
import { ButtonComponent, ContainerPage, ImageContainer, TextComponent, Title } from './styles'
import { Controller, useForm } from 'react-hook-form'
import InputFormComponent from '@/components/application/Forms/InputFormComponent'
import CreateAccountInfoComponent from '@/components/application/Info/CreateAccountInfoComponent'

export default function LoginOne() {
    const onSubmit = (data: any) => console.log(data)
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
            <ContainerPage style={{ flex: 1, justifyContent: 'space-between' }}>
                <ImageContainer>
                    <Image source={require('@/assets/images/logo.png')} style={{ width: 200, height: 200 }} />
                </ImageContainer>


                <View>
                    <Title type='title'>Login</Title>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <InputFormComponent
                                placeholder="CPF"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                errors={errors.cpf}
                            />
                        )}
                        name="cpf"
                    />

                    <ButtonComponent onPress={handleSubmit(onSubmit)}>
                        <TextComponent>Entrar</TextComponent>
                    </ButtonComponent>
                </View>
                <CreateAccountInfoComponent />
            </ContainerPage>
        </SafeAreaViewComponent>
    )
}