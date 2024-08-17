import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { CheckCard, DataCard, InfoCard, PageContainer } from './styles'
import { Icon } from 'react-native-paper'
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTranslation } from 'react-i18next';
import INutritionistListInterface from '@/interfaces/User/INutritionistListInterface';

type CardNutritionistProps = {
    nutri: INutritionistListInterface
    onPress: (item: INutritionistListInterface) => void;
}

export default function CardNutritionist(props: CardNutritionistProps) {
    const colorScheme = useColorScheme();
    const widthPage = Dimensions.get('window').width;
    const { t } = useTranslation();
    return (
        <PageContainer theme={colorScheme} onPress={() => props.onPress(props.nutri)}>
            <Icon size={widthPage / 4} source="account-circle-outline" color={Colors.color.black} />
            <DataCard>
                <InfoCard>
                    <Text>{t('Name')}: </Text>
                    <Text>{props.nutri.nutritionist.name}</Text>
                </InfoCard>
                {props.nutri.link.isCurrentNutritionist &&
                    <CheckCard>
                        <Text>{t('My Nutritionist')}</Text>
                        <Icon source="check" size={20} color={Colors.color.green} />
                    </CheckCard>
                }

            </DataCard>
        </PageContainer>
    )
}