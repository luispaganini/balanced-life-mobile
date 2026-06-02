import { View, Dimensions } from 'react-native'
import React from 'react'
import { CheckCard, DataCard, InfoCard, PageContainer } from './styles'
import { Icon } from 'react-native-paper'
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTranslation } from 'react-i18next';
import INutritionistListInterface from '@/interfaces/User/INutritionistListInterface';
import { ThemedText } from '@/components/ThemedText';

type CardNutritionistProps = {
    nutri: INutritionistListInterface
    onPress: (item: INutritionistListInterface) => void;
}

export default function CardNutritionist(props: CardNutritionistProps) {
    const colorScheme = useColorScheme();
    const widthPage = Dimensions.get('window').width;
    const { t } = useTranslation();
    
    const iconColor = colorScheme === 'light' ? Colors.light.text : Colors.dark.text;

    return (
        <PageContainer theme={colorScheme} onPress={() => props.onPress(props.nutri)}>
            <Icon size={widthPage / 4} source="account-circle-outline" color={iconColor} />
            <DataCard>
                <InfoCard>
                    <ThemedText style={{ fontWeight: 'bold' }}>{t('Name')}: </ThemedText>
                    <ThemedText>{props.nutri.nutritionist.name}</ThemedText>
                </InfoCard>
                {props.nutri.link.isCurrentNutritionist &&
                    <CheckCard>
                        <ThemedText style={{ color: '#00B38C', fontWeight: 'bold', marginRight: 5 }}>{t('My Nutritionist')}</ThemedText>
                        <Icon source="check" size={20} color="#00B38C" />
                    </CheckCard>
                }

            </DataCard>
        </PageContainer>
    )
}