import { View, Text } from 'react-native'
import React from 'react'
import { CardChildren, CardContainer, CardContent, CardDescription, CardTitle } from './styles'
import { useColorScheme } from '@/hooks/useColorScheme'

type CardInfoBodyProps = {
    title: string
    description: string
}

export default function CardInfoBody(props: CardInfoBodyProps) {
    const colorScheme = useColorScheme()
    return (
        <CardContainer themed={colorScheme}>
            <CardContent>
                <CardChildren>
                    <CardTitle>{props.title}</CardTitle>
                </CardChildren>
                <CardDescription>{props.description}</CardDescription>
            </CardContent>
        </CardContainer>
    )
}