import { ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaViewComponent } from '@/styles/pages'
import { router } from 'expo-router'
import { ContainerPage, ImageContainer, ImageItem, TitleItem } from './styles'
import CreateAccountForm from '@/components/application/Forms/CreateAccountForm'
import { t } from 'i18next'
import { useColorScheme } from '@/hooks/useColorScheme'
import { Colors } from '@/constants/Colors'
import { StatusBar } from 'expo-status-bar'

export default function CreateAccountOne() {
    const colorScheme = useColorScheme();
    return (
        <SafeAreaViewComponent style={{ backgroundColor: colorScheme === 'light' ? Colors.light.background : Colors.dark.background }}>
            <StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />
            <ContainerPage theme={colorScheme}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <ImageContainer testID='logo-image'>
                        <ImageItem source={require('@/assets/images/logo.png')} />
                    </ImageContainer>
                    <TitleItem theme={colorScheme}>{t('Create Account')}</TitleItem>
                    <CreateAccountForm testID="create-account-form" navigate={router.navigate} />
                </ScrollView>
            </ContainerPage>
        </SafeAreaViewComponent>
    )
}
