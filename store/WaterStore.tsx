import {create} from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type WaterStore = {
    goalWater: number;
    setGoalWater: (totalWater: number) => void;
    currentWater: number;
    setCurrentWater: (currentWater: number) => void;
    consumedWaterPercent: number;
    setConsumedWaterPercent: (consumedWater: number) => void;
    waterDay: Date;
    setWaterDay: (date: Date) => void;
    
    // Notification reminder settings
    notificationsEnabled: boolean;
    setNotificationsEnabled: (enabled: boolean) => void;
    notificationInterval: number; // in minutes
    setNotificationInterval: (minutes: number) => void;
    notificationStartTime: string; // "HH:MM" format
    setNotificationStartTime: (time: string) => void;
    notificationEndTime: string; // "HH:MM" format
    setNotificationEndTime: (time: string) => void;
};

const useWaterStore = create<WaterStore>()(persist(
    (set) => ({
        goalWater: 0,
        setGoalWater: (goalWater) => set({ goalWater }),
        currentWater: 0,
        setCurrentWater: (currentWater) => set({ currentWater }),
        consumedWaterPercent: 0,
        setConsumedWaterPercent: (consumedWaterPercent) => set({ consumedWaterPercent }),
        waterDay: new Date(),
        setWaterDay: (waterDay) => set({ waterDay }),
        
        // Notification settings defaults
        notificationsEnabled: false,
        setNotificationsEnabled: (notificationsEnabled) => set({ notificationsEnabled }),
        notificationInterval: 120, // default 2 hours
        setNotificationInterval: (notificationInterval) => set({ notificationInterval }),
        notificationStartTime: '08:00',
        setNotificationStartTime: (notificationStartTime) => set({ notificationStartTime }),
        notificationEndTime: '20:00',
        setNotificationEndTime: (notificationEndTime) => set({ notificationEndTime }),
    }),
    {
        name: 'water-store', // nome para a chave no async storage
        storage: createJSONStorage(() => AsyncStorage), 
    }
));

export default useWaterStore;
