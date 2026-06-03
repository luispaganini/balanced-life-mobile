import React from 'react'
import { CardChildren, CardContainer, CardContent, CardDescription, CardTitle, IconWrapper } from './styles'
import { useColorScheme } from '@/hooks/useColorScheme'
import { Ionicons } from '@expo/vector-icons'

type CardInfoBodyProps = {
    title: string
    description: string
    iconName?: keyof typeof Ionicons.glyphMap
    iconColor?: string
}

export default function CardInfoBody(props: CardInfoBodyProps) {
    const colorScheme = useColorScheme()
    return (
        <CardContainer themed={colorScheme}>
            <CardContent>
                <CardChildren themed={colorScheme}>
                    {props.iconName && (
                        <IconWrapper>
                            <Ionicons name={props.iconName} size={22} color={props.iconColor} />
                        </IconWrapper>
                    )}
                    <CardTitle themed={colorScheme}>{props.title}</CardTitle>
                </CardChildren>
                <CardDescription themed={colorScheme}>{props.description}</CardDescription>
            </CardContent>
        </CardContainer>
    )
}