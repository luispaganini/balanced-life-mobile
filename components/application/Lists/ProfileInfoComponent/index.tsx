import React from 'react'
import { DescriptionText, PageContainer, TitleText } from './styles'

type ProfileInfoComponentProps = {
    title: string
    description: string
}

export default function ProfileInfoComponent(props: ProfileInfoComponentProps) {
    return (
        <PageContainer>
            <TitleText>{props.title}:</TitleText>
            <DescriptionText>{props.description}</DescriptionText>
        </PageContainer>
    )
}