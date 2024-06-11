import { View, Text, Image, ImageSourcePropType } from 'react-native'
import React from 'react'
import { CardRedirectContainer, ImageContainer, TextContainer } from './styles'
import { router } from 'expo-router'

type CardRedirectProps = {
    title: string
    img: ImageSourcePropType
    route: string
    color: string
}
export default function CardRedirect(props: CardRedirectProps) {
    return (
        <View>
            <CardRedirectContainer color={props.color} onPress={() => router.navigate(props.route)}>
                <ImageContainer source={props.img} resizeMode='contain'/>
                <TextContainer numberOfLines={1} ellipsizeMode='tail'>{props.title}</TextContainer>
            </CardRedirectContainer>
        </View>
    )
}