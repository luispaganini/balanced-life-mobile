import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'
import RNDateTimePicker from '@react-native-community/datetimepicker'

import { useColorScheme } from '@/hooks/useColorScheme'
import useWaterStore from '@/store/WaterStore'
import WaterEditModal from '@/components/application/Modals/WaterEditModal'
import { formatDate } from '@/utils/functionsApp'
import { scheduleWaterReminders } from '@/utils/notifications'

import { ContainerPage, HeaderContainer, HeaderTitle, ContentContainer } from './styles'

// Extracted Sub-Components
import WaterGoalCard from './components/WaterGoalCard'
import WaterQuickAdd from './components/WaterQuickAdd'
import WaterCustomInput from './components/WaterCustomInput'
import WaterReminders from './components/WaterReminders'

export default function WaterPage() {
    const { t } = useTranslation();
    const colorTheme = useColorScheme();
    const insets = useSafeAreaInsets();
    const waterStore = useWaterStore();

    const [textAddWater, setTextAddWater] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState<'start' | 'end' | null>(null);

    // Initial check: if it is a new day, reset water intake
    useEffect(() => {
        const storedDay = waterStore.waterDay ? new Date(waterStore.waterDay) : new Date();
        if (formatDate(storedDay) !== formatDate(new Date())) {
            waterStore.setCurrentWater(0);
            waterStore.setWaterDay(new Date());
        }
    }, []);

    // Watch water intake progress percentage
    useEffect(() => {
        if (waterStore.goalWater > 0) {
            const percentage = (waterStore.currentWater / waterStore.goalWater) * 100;
            waterStore.setConsumedWaterPercent(percentage > 100 ? 100 : percentage);
        } else {
            waterStore.setConsumedWaterPercent(0);
        }
    }, [waterStore.currentWater, waterStore.goalWater]);

    // Automatically reschedule reminders when settings are modified
    useEffect(() => {
        scheduleWaterReminders(
            waterStore.notificationsEnabled,
            waterStore.notificationInterval,
            waterStore.notificationStartTime,
            waterStore.notificationEndTime
        ).catch(err => {
            console.error('Error scheduling water reminders:', err);
        });
    }, [
        waterStore.notificationsEnabled,
        waterStore.notificationInterval,
        waterStore.notificationStartTime,
        waterStore.notificationEndTime
    ]);

    const handleAddCustomWater = () => {
        if (textAddWater) {
            waterStore.setCurrentWater(waterStore.currentWater + parseInt(textAddWater));
            setTextAddWater('');
        }
    }

    const handleRemoveCustomWater = () => {
        if (textAddWater) {
            const amount = parseInt(textAddWater);
            const remaining = waterStore.currentWater - amount;
            waterStore.setCurrentWater(remaining < 0 ? 0 : remaining);
            setTextAddWater('');
        }
    }

    const handleResetWater = () => {
        Alert.alert(
            t('Confirm'),
            t('Reset water description'),
            [
                { text: t('Cancel'), style: 'cancel' },
                { 
                    text: t('Yes'), 
                    style: 'destructive',
                    onPress: () => waterStore.setCurrentWater(0) 
                }
            ]
        );
    }

    const handleQuickAdd = (amount: number) => {
        waterStore.setCurrentWater(waterStore.currentWater + amount);
    }

    const parseTimeToDate = (timeStr: string) => {
        const [h, m] = timeStr.split(':').map(Number);
        const d = new Date();
        d.setHours(h, m, 0, 0);
        return d;
    };

    const formatTimeToStr = (date: Date) => {
        const h = String(date.getHours()).padStart(2, '0');
        const m = String(date.getMinutes()).padStart(2, '0');
        return `${h}:${m}`;
    };

    return (
        <ContainerPage theme={colorTheme} style={{ paddingTop: insets.top }}>
            {/* Custom Header */}
            <HeaderContainer theme={colorTheme}>
                <HeaderTitle theme={colorTheme}>{t('Water')}</HeaderTitle>
            </HeaderContainer>

            <ContentContainer showsVerticalScrollIndicator={false}>
                {/* Progress Visualizer Card */}
                <WaterGoalCard
                    goalWater={waterStore.goalWater}
                    currentWater={waterStore.currentWater}
                    consumedWaterPercent={waterStore.consumedWaterPercent}
                    colorTheme={colorTheme}
                    onEditPress={() => setModalVisible(true)}
                    onResetPress={handleResetWater}
                />

                {/* Quick Add Section */}
                <WaterQuickAdd
                    colorTheme={colorTheme}
                    onQuickAdd={handleQuickAdd}
                />

                {/* Custom Add Amount Section */}
                <WaterCustomInput
                    colorTheme={colorTheme}
                    textAddWater={textAddWater}
                    setTextAddWater={setTextAddWater}
                    onAddPress={handleAddCustomWater}
                    onRemovePress={handleRemoveCustomWater}
                />

                {/* Reminders / Notifications Settings Section */}
                <WaterReminders
                    colorTheme={colorTheme}
                    notificationsEnabled={waterStore.notificationsEnabled}
                    onNotificationsToggle={waterStore.setNotificationsEnabled}
                    notificationInterval={waterStore.notificationInterval}
                    onIntervalChange={waterStore.setNotificationInterval}
                    notificationStartTime={waterStore.notificationStartTime}
                    notificationEndTime={waterStore.notificationEndTime}
                    onTimePickerTrigger={(type) => setShowTimePicker(type)}
                />
            </ContentContainer>

            {/* DateTimePicker Overlay */}
            {showTimePicker && (
                <RNDateTimePicker
                    mode="time"
                    is24Hour={true}
                    value={showTimePicker === 'start' 
                        ? parseTimeToDate(waterStore.notificationStartTime) 
                        : parseTimeToDate(waterStore.notificationEndTime)
                    }
                    themeVariant={colorTheme === 'light' ? 'light' : 'dark'}
                    onChange={(event, selectedDate) => {
                        setShowTimePicker(null);
                        if (event.type === 'set' && selectedDate) {
                            const timeStr = formatTimeToStr(selectedDate);
                            if (showTimePicker === 'start') {
                                waterStore.setNotificationStartTime(timeStr);
                            } else {
                                waterStore.setNotificationEndTime(timeStr);
                            }
                        }
                    }}
                />
            )}

            {/* WaterEditModal */}
            <WaterEditModal 
                visible={modalVisible} 
                setVisible={setModalVisible} 
                onPress={waterStore.setGoalWater} 
            />
        </ContainerPage>
    );
}