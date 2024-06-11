import IUserInterface from '@/interfaces/IUserInterface';
import { create } from 'zustand';


type UserStore = {
    user: IUserInterface | null;
    setUser: (user: IUserInterface | null) => void;
};

const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));

export default useUserStore;