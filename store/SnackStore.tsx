import ISnackInterface from '@/interfaces/Snack/ISnackInterface';
import { create } from 'zustand'

type SnackState = {
    loading: boolean;
    data: ISnackInterface | null;
    date: Date;
    setDate: (date: Date) => void;
    setData: (data: ISnackInterface) => void;
    setLoading: (loading: boolean) => void;
}

export const useSnackStore = create<SnackState>((set) => ({
    loading: true,
    data: null,
    date: new Date(),
    setDate: (date: Date) => set({ date }),
    setData: (data: ISnackInterface) => set({ data }),
    setLoading: (loading: boolean) => set({ loading }),
}))
  