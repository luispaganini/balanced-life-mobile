import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { AskForCreateAccount, ContainerPage, RedirectLink } from './styles'
import { router } from 'expo-router'

export default function CreateAccountInfoComponent() {
    return (
        <ContainerPage>
            <AskForCreateAccount>Ainda não tem uma conta?</AskForCreateAccount>
            <TouchableOpacity onPress={() => router.navigate('(create)/create-one')}>
                <RedirectLink>Criar uma conta</RedirectLink>
            </TouchableOpacity>
        </ContainerPage>
    )
}