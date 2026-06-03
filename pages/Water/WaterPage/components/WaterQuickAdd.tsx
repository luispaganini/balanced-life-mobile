import React from 'react'
import { ColorSchemeName } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import {
    SectionTitle,
    QuickAddRow,
    QuickAddCapsule,
    QuickAddText
} from '../styles'

type WaterQuickAddProps = {
    colorTheme: ColorSchemeName;
    onQuickAdd: (amount: number) => void;
}

export default function WaterQuickAdd({ colorTheme, onQuickAdd }: WaterQuickAddProps) {
    const { t } = useTranslation();

    return (
        <>
            <SectionTitle theme={colorTheme}>{t('Adicionar Rápido')}</SectionTitle>
            <QuickAddRow>
                <QuickAddCapsule theme={colorTheme} onPress={() => onQuickAdd(150)}>
                    <Ionicons name="cafe-outline" size={16} color="#00A3FF" />
                    <QuickAddText theme={colorTheme}>+150ml</QuickAddText>
                </QuickAddCapsule>
                <QuickAddCapsule theme={colorTheme} onPress={() => onQuickAdd(250)}>
                    <Ionicons name="wine-outline" size={16} color="#00A3FF" />
                    <QuickAddText theme={colorTheme}>+250ml</QuickAddText>
                </QuickAddCapsule>
                <QuickAddCapsule theme={colorTheme} onPress={() => onQuickAdd(500)}>
                    <Ionicons name="water-outline" size={16} color="#00A3FF" />
                    <QuickAddText theme={colorTheme}>+500ml</QuickAddText>
                </QuickAddCapsule>
            </QuickAddRow>
        </>
    );
}
