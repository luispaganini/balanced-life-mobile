import { View, Text } from 'react-native'
import React from 'react'
import { CardChildren, CardContainer, CardContent, CardDescription, CardTitle } from './styles'
import { useColorScheme } from '@/hooks/useColorScheme'
import { router } from 'expo-router'

type CardSnackProps = {
    idMeal: number
    idTypeSnack: number
    title: string
    description: string
}

export default function CardSnack(props: CardSnackProps) {
    const colorScheme = useColorScheme()

    return (
        <CardContainer themed={colorScheme} onPress={() => router.navigate(`/snack/${props.idMeal}/${props.idTypeSnack}`)}>
            <CardContent>
                <CardChildren>
                    <CardTitle>{props.title}</CardTitle>
                </CardChildren>
                <CardDescription>{props.description} Kcal</CardDescription>
            </CardContent>
        </CardContainer>
    )
}