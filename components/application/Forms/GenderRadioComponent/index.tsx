import { View, Text } from 'react-native'
import React from 'react'
import { RadioButton } from 'react-native-paper'
import { ThemedText } from '@/components/ThemedText'
import { FieldError } from 'react-hook-form'
import { ErrorText, PageContainer, RadioContainer, TitleInput } from './styles'
import { useTranslation } from 'react-i18next'

type GenderRadioComponentProps = {
    onChange: (newValue: string) => void
    value: string
    errors?: FieldError | undefined
    title?: boolean
}

export default function GenderRadioComponent(props: GenderRadioComponentProps) {
    const { t } = useTranslation()
    return (
        <PageContainer>
            {props.title && <TitleInput>{t("Gender")}</TitleInput>}
            <RadioButton.Group onValueChange={newValue => props.onChange(newValue)} value={props.value} >
                <RadioContainer>
                    <RadioButton value="Masculino" />
                    <ThemedText>{t("Male")}</ThemedText>
                </RadioContainer>
                <RadioContainer>
                    <RadioButton value="Feminino" />
                    <ThemedText>{t("Female")}</ThemedText>
                </RadioContainer>
            </RadioButton.Group>
            {props.errors && <ErrorText>{t(props.errors.message ?? "This is required")}</ErrorText>}

        </PageContainer>
    )
}