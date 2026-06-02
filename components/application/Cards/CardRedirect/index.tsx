import { View } from 'react-native'
import React from 'react'
import { CardRedirectContainer, IconCircle, TextContainer } from './styles'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useColorScheme } from '@/hooks/useColorScheme'

type CardRedirectProps = {
    title: string
    iconName: keyof typeof Ionicons.glyphMap
    route: any
    color: string
    onPress?: () => void
}

export default function CardRedirect(props: CardRedirectProps) {
    const theme = useColorScheme();

    return (
        <View>
            <CardRedirectContainer 
                theme={theme} 
                onPress={props.onPress ? props.onPress : () => router.navigate(props.route)}
            >
                <IconCircle bgColor={props.color}>
                    <Ionicons name={props.iconName} size={26} color={props.color} />
                </IconCircle>
                <TextContainer theme={theme} numberOfLines={1} ellipsizeMode='tail'>
                    {props.title}
                </TextContainer>
            </CardRedirectContainer>
        </View>
    )
}