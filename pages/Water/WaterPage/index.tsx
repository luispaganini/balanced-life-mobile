import { Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PieChart } from 'react-native-gifted-charts'
import { AddWaterContainer, ContainerPage, EditIcon, GoalContainer, PercentContainer, PieContainer, QuickAddContainer, QuickAddBtn, QuickAddBtnText } from './styles';
import { ThemedText } from '@/components/ThemedText';
import { useTranslation } from 'react-i18next';
import InputWithTagComponent from '@/components/application/Inputs/InputWithTagComponent';
import ButtonComponent from '@/components/application/Forms/ButtonComponent';
import { Colors } from '@/constants/Colors';
import useWaterStore from '@/store/WaterStore';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import WaterEditModal from '@/components/application/Modals/WaterEditModal';
import { formatDate } from '@/utils/functionsApp';

export default function WaterPage() {
    const { t } = useTranslation();
    const colorTheme = useColorScheme();
    const waterStore = useWaterStore();
    const [textAddWater, setTextAddWater] = useState('')
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (formatDate(new Date(waterStore.waterDay)) !== formatDate(new Date())) {
            waterStore.setCurrentWater(0);
            waterStore.setWaterDay(new Date());
        }
        
        if (waterStore.goalWater == 0) 
            waterStore.setConsumedWaterPercent(100)
        else if ((waterStore.currentWater - waterStore.goalWater) <= 0) 
            waterStore.setConsumedWaterPercent(0);
    }, [])

    useEffect(() => {
        if (waterStore.currentWater && waterStore.goalWater) {
            const percentage = (waterStore.currentWater / waterStore.goalWater) * 100;
            waterStore.setConsumedWaterPercent(percentage > 100 ? 100 : percentage);
        }
    }, [waterStore.currentWater, waterStore.goalWater]);

    const pieData = [
        { value: waterStore.consumedWaterPercent, color: Colors.color.blue },
        { value: (100 - waterStore.consumedWaterPercent), color: colorTheme === 'dark' ? '#1F2937' : '#e5e7eb' },
    ];

    const addWater = () => {
        if (textAddWater) {
            waterStore.setCurrentWater(waterStore.currentWater + parseInt(textAddWater));
            setTextAddWater('');
        }
    }

    const handleQuickAdd = (amount: number) => {
        waterStore.setCurrentWater(waterStore.currentWater + amount);
    }

    return (
        <ContainerPage>
            <WaterEditModal visible={modalVisible} setVisible={setModalVisible} onPress={waterStore.setGoalWater} />
            <ScrollView>
                <GoalContainer>
                    <ThemedText type='subtitle'>{t('Goal')}: {waterStore.goalWater}ml</ThemedText>
                    <EditIcon onPress={() => setModalVisible(true)}>
                        <MaterialIcons name="edit" size={30} color={colorTheme == 'light' ? Colors.light.text : Colors.dark.text} />
                    </EditIcon>
                </GoalContainer>
                <PieContainer>
                    <PieChart
                        donut
                        innerRadius={80}
                        data={pieData}
                        centerLabelComponent={() => (
                            <ThemedText style={{ fontSize: 26, fontWeight: 'bold' }}>
                                {waterStore.consumedWaterPercent ? waterStore.consumedWaterPercent.toFixed(1) : 0}%
                            </ThemedText>
                        )}
                    />
                </PieContainer>
                <PercentContainer>
                    <ThemedText type='subtitle'>{waterStore.currentWater <= waterStore.goalWater ? t('Missing') + ': ' + (waterStore.goalWater - waterStore.currentWater) + 'ml' : t('Completed')}</ThemedText>
                </PercentContainer>

                <AddWaterContainer>
                    <InputWithTagComponent colorTag='red' onChangeText={setTextAddWater} placeholder={t('Amount of water')} value={textAddWater} tagText='ml' />
                    
                    <QuickAddContainer>
                        <QuickAddBtn onPress={() => handleQuickAdd(150)}>
                            <QuickAddBtnText>+150ml</QuickAddBtnText>
                        </QuickAddBtn>
                        <QuickAddBtn onPress={() => handleQuickAdd(250)}>
                            <QuickAddBtnText>+250ml</QuickAddBtnText>
                        </QuickAddBtn>
                        <QuickAddBtn onPress={() => handleQuickAdd(500)}>
                            <QuickAddBtnText>+500ml</QuickAddBtnText>
                        </QuickAddBtn>
                    </QuickAddContainer>

                    <ButtonComponent onPress={addWater} title={t('Add water')} color={Colors.color.blue} />
                </AddWaterContainer>
            </ScrollView>
        </ContainerPage>
    );
};