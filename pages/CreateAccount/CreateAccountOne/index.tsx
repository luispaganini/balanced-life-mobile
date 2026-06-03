import { ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaViewComponent } from '@/styles/pages'
import { router } from 'expo-router'
import { ContainerPage, ImageContainer, ImageItem, TitleItem } from './styles'
import CreateAccountForm from '@/components/application/Forms/CreateAccountForm'
import { t } from 'i18next'

export default function CreateAccountOne() {
    return (
        <SafeAreaViewComponent style={{ backgroundColor: '#111827' }}>
            <ContainerPage>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <ImageContainer testID='logo-image'>
                        <ImageItem source={require('@/assets/images/logo.png')} />
                    </ImageContainer>
                    <TitleItem>{t('Create Account')}</TitleItem>
                    <CreateAccountForm testID="create-account-form" navigate={router.navigate} />
                </ScrollView>
            </ContainerPage>
        </SafeAreaViewComponent>
    )
}
