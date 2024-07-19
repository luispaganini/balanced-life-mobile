import { ISnackDetailsInterface, Snack } from '@/interfaces/Snack/ISnackDetailsInterface';
import ISnackInterface from '@/interfaces/Snack/ISnackInterface';
import { create } from 'zustand'

type SnackState = {
    loading: boolean;
    data: ISnackInterface | null;
    date: Date;
    snackDetails: ISnackDetailsInterface | null;
    setDate: (date: Date) => void;
    setData: (data: ISnackInterface) => void;
    setSnackDetails: (snackDetails: ISnackDetailsInterface) => void;
    setLoading: (loading: boolean) => void;
    addSnackToDetails: (snack: Snack) => void;
    updateSnackInDetails: (updatedSnack: Snack) => void;
    deleteSnackFromDetails: (snackId: number) => void;
}

export const useSnackStore = create<SnackState>((set) => ({
    loading: true,
    data: null,
    date: new Date(),
    snackDetails: null,
    setDate: (date: Date) => set({ date }),
    setSnackDetails: (snackDetails: ISnackDetailsInterface) => set({ snackDetails}),
    setData: (data: ISnackInterface) => set({ data }),
    setLoading: (loading: boolean) => set({ loading }),
    addSnackToDetails: (snack: Snack) => {
        set((state) => {
            if (state.snackDetails) {
                return {
                    snackDetails: {
                        ...state.snackDetails,
                        snacks: [...state.snackDetails.snacks, snack],
                    },
                };
            }
            return { snackDetails: state.snackDetails };
        });
    },
    updateSnackInDetails: (updatedSnack: Snack) => {
        set((state) => {
            if (state.snackDetails) {
                const updatedSnacks = state.snackDetails.snacks.map(snack =>
                    snack.id === updatedSnack.id ? updatedSnack : snack
                );
                return {
                    snackDetails: {
                        ...state.snackDetails,
                        snacks: updatedSnacks,
                    },
                };
            }
            return { snackDetails: state.snackDetails };
        });
    },
    deleteSnackFromDetails: (snackId: number) => {
        set((state) => {
            if (state.snackDetails) {
                const updatedSnacks = state.snackDetails.snacks.filter(snack => snack.id !== snackId);
                return {
                    snackDetails: {
                        ...state.snackDetails,
                        snacks: updatedSnacks,
                    },
                };
            }
            return { snackDetails: state.snackDetails };
        });
    },
}))
  