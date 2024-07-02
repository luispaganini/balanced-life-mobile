import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PieChart } from 'react-native-gifted-charts'
import { AddWaterContainer, ContainerPage, EditIcon, GoalContainer, PercentContainer, PieContainer } from './styles';
import { ThemedText } from '@/components/ThemedText';
import { useTranslation } from 'react-i18next';
import InputWithTagComponent from '@/components/application/Inputs/InputWithTagComponent';
import ButtonComponent from '@/components/application/Forms/ButtonComponent';
import { Colors } from '@/constants/Colors';
import useWaterStore from '@/store/WaterStore';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import WaterEditModal from '@/components/application/Modals/WaterEditModal';
import { PaperProvider } from 'react-native-paper';

export default function WaterPage() {
    const { t } = useTranslation();
    const colorTheme = useColorScheme();
    const waterStore = useWaterStore();
    const [textAddWater, setTextAddWater] = useState('')
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (formatDate(waterStore.waterDay) !== formatDate(new Date())) {
            waterStore.setCurrentWater(0);
            waterStore.setWaterDay(new Date());
        }
    }, [])

    useEffect(() => {
        const percentage = (waterStore.currentWater / waterStore.goalWater) * 100;
        waterStore.setConsumedWaterPercent(percentage > 100 ? 100 : percentage);
    }, [waterStore.currentWater]);

    const pieData = [
        { value: waterStore.consumedWaterPercent, color: Colors.color.blue },
        { value: (100 - waterStore.consumedWaterPercent), color: 'lightgray' },
    ];

    const addWater = () => {
        if (textAddWater) {
            waterStore.setCurrentWater(waterStore.currentWater + parseInt(textAddWater));
            setTextAddWater('');
        }
    }
    return (
        <PaperProvider>

            <ContainerPage>
                <WaterEditModal visible={modalVisible} setVisible={setModalVisible} onPress={() => { }} />
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
                            centerLabelComponent={() => <Text style={{ fontSize: 30 }}>{waterStore.consumedWaterPercent}%</Text>}
                        />
                    </PieContainer>
                    <PercentContainer>
                        <ThemedText type='subtitle'>{waterStore.currentWater <= waterStore.goalWater ? t('Missing') + ': ' + (waterStore.goalWater - waterStore.currentWater) + 'ml' : t('Completed')}</ThemedText>
                    </PercentContainer>

                    <AddWaterContainer>
                        <InputWithTagComponent colorTag='red' onChangeText={setTextAddWater} placeholder={t('Amount of water')} value={textAddWater} tagText='ml' />
                        <ButtonComponent onPress={addWater} title={t('Add water')} color={Colors.color.blue} />
                    </AddWaterContainer>
                </ScrollView>
            </ContainerPage>
        </PaperProvider>
    );
};

function formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
}