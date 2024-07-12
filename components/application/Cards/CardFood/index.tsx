import { Text } from 'react-native'
import React from 'react'
import { CardFoodContainer, CardFoodText, TableInfo } from './styles'
import { useColorScheme } from '@/hooks/useColorScheme';

type CardFoodProps = {
    id: number;
    name: string;
    table: string;
    onPress: (idFood: number) => void;
}

export default function CardFood(props: CardFoodProps) {
    const theme = useColorScheme();
    return (
        <CardFoodContainer theme={theme} onPress={() => props.onPress(props.id)}>
            <CardFoodText>{props.name}</CardFoodText>
            <TableInfo>
                <Text>{props.table}</Text>
            </TableInfo>
        </CardFoodContainer>
    )
}