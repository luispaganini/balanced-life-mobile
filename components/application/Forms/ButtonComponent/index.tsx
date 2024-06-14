import React from 'react'
import { ButtonComponentContainer, TextComponent } from './styles'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator } from 'react-native'

type ButtonComponentProps = {
    onPress: () => void
    title: string
    color: string
    loading?: boolean
}

export default function ButtonComponent(props: ButtonComponentProps) {
    const { t } = useTranslation();
    return (
        <ButtonComponentContainer onPress={props.onPress} color={props.color}>
            {props.loading ?
                <ActivityIndicator size="small" color="#fff" />
                :
                <TextComponent>{t(props.title)}</TextComponent>}
        </ButtonComponentContainer>
    )
}