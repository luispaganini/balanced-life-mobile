import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { CheckCard, DataCard, InfoCard, PageContainer } from './styles'
import { Icon } from 'react-native-paper'
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router } from 'expo-router';

type CardNutritionistProps = {
    name: string;
}

export default function CardNutritionist(props: CardNutritionistProps) {
    const colorScheme = useColorScheme();
    const widthPage = Dimensions.get('window').width;
    return (
        <PageContainer theme={colorScheme} onPress={() => router.navigate('nutritionist/1')}>
            <Icon size={widthPage / 4} source="account-circle-outline" color={Colors.color.black} />
            <DataCard>
                <InfoCard>
                    <Text>Nome: </Text>
                    <Text>{props.name}</Text>
                </InfoCard>
                <CheckCard>
                    <Text>Meu nutricionista</Text>
                    <Icon source="check" size={20} color={Colors.color.green} />
                </CheckCard>

            </DataCard>
        </PageContainer>
    )
}