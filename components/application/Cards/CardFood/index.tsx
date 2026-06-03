import React from 'react'
import { CardFoodContainer, FoodIconContainer, FoodTextColumn, FoodNameText, FoodDescText } from './styles'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors';

type CardFoodProps = {
    id: number;
    name: string;
    table: string;
    onPress: (idFood: number) => void;
}

export default function CardFood(props: CardFoodProps) {
    return (
        <CardFoodContainer onPress={() => props.onPress(props.id)}>
            <FoodIconContainer>
                <Ionicons name="restaurant-outline" size={20} color={Colors.color.green} />
            </FoodIconContainer>
            
            <FoodTextColumn>
                <FoodNameText numberOfLines={1}>{props.name}</FoodNameText>
                <FoodDescText>{props.table}</FoodDescText>
            </FoodTextColumn>

            <Ionicons name="chevron-forward" size={16} color={Colors.color.grey} style={{ marginLeft: 5 }} />
        </CardFoodContainer>
    )
}