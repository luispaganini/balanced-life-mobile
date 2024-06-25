import IUserInterface from '@/interfaces/User/IUserInterface';
import {create} from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserStore = {
    user: IUserInterface | null;
    setUser: (user: IUserInterface | null) => void;
};

const useUserStore = create<UserStore>()(persist(
    (set) => ({
        user: null,
        setUser: (user) => set({ user }),
    }),
    {
        name: 'user-store', // nome para a chave no async storage
        storage: createJSONStorage(() => AsyncStorage), 
    }
));

export default useUserStore;
