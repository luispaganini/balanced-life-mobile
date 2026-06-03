import React from 'react'
import { Switch, ColorSchemeName } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Colors } from '@/constants/Colors'
import {
    SectionTitle,
    SettingsCard,
    SettingsRow,
    SettingsLabelContainer,
    SettingsTitle,
    SettingsDescription,
    Divider,
    PillRow,
    IntervalPill,
    IntervalPillText,
    TimePickersRow,
    TimePickerButton,
    TimePickerLabel,
    TimePickerValue
} from '../styles'

type WaterRemindersProps = {
    colorTheme: ColorSchemeName;
    notificationsEnabled: boolean;
    onNotificationsToggle: (val: boolean) => void;
    notificationInterval: number;
    onIntervalChange: (val: number) => void;
    notificationStartTime: string;
    notificationEndTime: string;
    onTimePickerTrigger: (type: 'start' | 'end') => void;
}

export default function WaterReminders({
    colorTheme,
    notificationsEnabled,
    onNotificationsToggle,
    notificationInterval,
    onIntervalChange,
    notificationStartTime,
    notificationEndTime,
    onTimePickerTrigger
}: WaterRemindersProps) {
    const { t } = useTranslation();

    const intervals = [
        { label: '30m', value: 30 },
        { label: '1h', value: 60 },
        { label: '1.5h', value: 90 },
        { label: '2h', value: 120 },
        { label: '3h', value: 180 },
    ];

    return (
        <>
            <SectionTitle theme={colorTheme}>{t('Water Reminders')}</SectionTitle>
            <SettingsCard theme={colorTheme}>
                {/* Toggle notification active */}
                <SettingsRow>
                    <SettingsLabelContainer>
                        <SettingsTitle theme={colorTheme}>{t('Enable Reminders')}</SettingsTitle>
                        <SettingsDescription theme={colorTheme}>{t('Reminders Description')}</SettingsDescription>
                    </SettingsLabelContainer>
                    <Switch
                        value={notificationsEnabled}
                        onValueChange={onNotificationsToggle}
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={notificationsEnabled ? Colors.color.blue : '#f4f3f4'}
                    />
                </SettingsRow>

                {notificationsEnabled && (
                    <>
                        <Divider theme={colorTheme} />

                        {/* Interval Frequency selector */}
                        <SettingsRow style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <SettingsTitle theme={colorTheme}>{t('Interval')}</SettingsTitle>
                            <PillRow>
                                {intervals.map((item) => {
                                    const active = notificationInterval === item.value;
                                    return (
                                        <IntervalPill
                                            key={item.value}
                                            active={active}
                                            theme={colorTheme}
                                            onPress={() => onIntervalChange(item.value)}
                                        >
                                            <IntervalPillText active={active} theme={colorTheme}>
                                                {item.label}
                                            </IntervalPillText>
                                        </IntervalPill>
                                    );
                                })}
                            </PillRow>
                        </SettingsRow>

                        <Divider theme={colorTheme} />

                        {/* Start and End hours selection */}
                        <SettingsTitle theme={colorTheme}>{t('Horário Ativo')}</SettingsTitle>
                        <TimePickersRow>
                            <TimePickerButton 
                                theme={colorTheme} 
                                onPress={() => onTimePickerTrigger('start')}
                            >
                                <TimePickerLabel theme={colorTheme}>{t('Start Time')}</TimePickerLabel>
                                <TimePickerValue theme={colorTheme}>
                                    {notificationStartTime}
                                </TimePickerValue>
                            </TimePickerButton>

                            <TimePickerButton 
                                theme={colorTheme} 
                                onPress={() => onTimePickerTrigger('end')}
                            >
                                <TimePickerLabel theme={colorTheme}>{t('End Time')}</TimePickerLabel>
                                <TimePickerValue theme={colorTheme}>
                                    {notificationEndTime}
                                </TimePickerValue>
                            </TimePickerButton>
                        </TimePickersRow>
                    </>
                )}
            </SettingsCard>
        </>
    );
}
