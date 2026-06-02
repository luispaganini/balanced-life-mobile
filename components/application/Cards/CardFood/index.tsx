import React from 'react'
import { CardFoodContainer, TableInfo } from './styles'
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';

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
            <ThemedText style={{ flexWrap: 'wrap', flexShrink: 1, fontWeight: '500', paddingRight: 10 }}>
                {props.name}
            </ThemedText>
            <TableInfo>
                <ThemedText style={{ fontSize: 12, fontWeight: '600', opacity: 0.8 }}>
                    {props.table}
                </ThemedText>
            </TableInfo>
        </CardFoodContainer>
    )
}