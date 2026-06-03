import React from 'react'
import { View, ColorSchemeName } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg'
import { useTranslation } from 'react-i18next'
import { Colors } from '@/constants/Colors'
import { ThemedText } from '@/components/ThemedText'
import {
    GoalCard,
    GoalHeaderRow,
    GoalTitle,
    EditIcon,
    ProgressContainer,
    StatsText
} from '../styles'

type WaterGoalCardProps = {
    goalWater: number;
    currentWater: number;
    consumedWaterPercent: number;
    colorTheme: ColorSchemeName;
    onEditPress: () => void;
    onResetPress: () => void;
}

export default function WaterGoalCard({
    goalWater,
    currentWater,
    consumedWaterPercent,
    colorTheme,
    onEditPress,
    onResetPress
}: WaterGoalCardProps) {
    const { t } = useTranslation();
    const isLight = colorTheme === 'light';

    return (
        <GoalCard theme={colorTheme}>
            <GoalHeaderRow>
                <GoalTitle theme={colorTheme}>
                    {t('Goal')}: {goalWater}ml
                </GoalTitle>
                <EditIcon onPress={onEditPress}>
                    <Ionicons 
                        name="create-outline" 
                        size={20} 
                        color={isLight ? Colors.light.text : Colors.dark.text} 
                    />
                </EditIcon>
                <View style={{ width: 12 }} />
                <EditIcon onPress={onResetPress}>
                    <Ionicons 
                        name="trash-outline" 
                        size={20} 
                        color={Colors.color.lightRed} 
                    />
                </EditIcon>
            </GoalHeaderRow>

            <ProgressContainer>
                <Svg width={200} height={200} viewBox="0 0 200 200">
                    <Defs>
                        <LinearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <Stop offset="0%" stopColor="#00A3FF" />
                            <Stop offset="100%" stopColor="#00E5FF" />
                        </LinearGradient>
                    </Defs>
                    <Circle
                        cx="100"
                        cy="100"
                        r="85"
                        stroke={isLight ? '#E5E7EB' : '#1F2937'}
                        strokeWidth="12"
                        fill="transparent"
                    />
                    <Circle
                        cx="100"
                        cy="100"
                        r="85"
                        stroke="url(#waterGrad)"
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray="534"
                        strokeDashoffset={534 - (534 * Math.min(consumedWaterPercent || 0, 100)) / 100}
                        strokeLinecap="round"
                        transform="rotate(-90 100 100)"
                    />
                </Svg>
                <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name="water" size={32} color="#00A3FF" style={{ marginBottom: 2 }} />
                    <ThemedText style={{ fontSize: 28, fontWeight: 'bold' }}>
                        {consumedWaterPercent ? consumedWaterPercent.toFixed(0) : 0}%
                    </ThemedText>
                    <ThemedText style={{ fontSize: 13, color: isLight ? '#4B5563' : '#9CA3AF', marginTop: 2, fontWeight: '600' }}>
                        {currentWater} / {goalWater}ml
                    </ThemedText>
                </View>
            </ProgressContainer>

            <StatsText theme={colorTheme}>
                {currentWater < goalWater 
                    ? `${t('Missing')}: ${goalWater - currentWater}ml` 
                    : t('Completed')
                }
            </StatsText>
        </GoalCard>
    );
}
