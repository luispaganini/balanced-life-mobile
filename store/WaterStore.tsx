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
    }),
    {
        name: 'water-store', // nome para a chave no async storage
        storage: createJSONStorage(() => AsyncStorage), 
    }
));

export default useWaterStore;
