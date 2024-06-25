import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { useTranslation } from 'react-i18next';
import { NoDataContainer, RefreshButton, RefreshButtonText } from './styles';
import { useColorScheme } from '@/hooks/useColorScheme';
import { View } from 'react-native';

type NoDataComponentProps = {
    onPress: () => void;
}

export default function NoDataComponent(props: NoDataComponentProps) {
    const { t } = useTranslation();

    return (
        <NoDataContainer>
            <ThemedText>{t('No data found')}</ThemedText>
            <RefreshButton onPress={props.onPress}>
                <View>
                    <RefreshButtonText>{t('Refresh')}</RefreshButtonText>
                </View>
            </RefreshButton>
        </NoDataContainer>
    )
}