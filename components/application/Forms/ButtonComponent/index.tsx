import React from 'react'
import { ButtonComponentContainer, TextComponent } from './styles'
import { useTranslation } from 'react-i18next'

type ButtonComponentProps = {
    onPress: () => void
    title: string
    color: string
}

export default function ButtonComponent(props: ButtonComponentProps) {
    const { t } = useTranslation();
    return (
        <ButtonComponentContainer onPress={props.onPress} color={props.color}>
            <TextComponent>{t(props.title)}</TextComponent>
        </ButtonComponentContainer>
    )
}