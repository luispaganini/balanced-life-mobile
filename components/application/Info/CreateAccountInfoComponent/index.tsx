import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { AskForCreateAccount, ContainerPage, RedirectLink } from './styles'
import { router } from 'expo-router'
import { useTranslation } from 'react-i18next'

export default function CreateAccountInfoComponent() {
    const { t } = useTranslation();
    return (
        <ContainerPage>
            <AskForCreateAccount>{t('Not have an account yet?')}</AskForCreateAccount>
            <TouchableOpacity onPress={() => router.navigate('(create)/create-one')}>
                <RedirectLink>{t('Create an account')}</RedirectLink>
            </TouchableOpacity>
        </ContainerPage>
    )
}