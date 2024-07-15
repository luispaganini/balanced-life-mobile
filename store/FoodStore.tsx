import { create } from 'zustand'

type FoodState = {
    hasMore: boolean;
    loading: boolean;
    loadingMore: boolean;
    page: number;
    noDataFound: boolean;
    setHasMore: (hasMore: boolean) => void;
    setLoading: (loading: boolean) => void;
    setLoadingMore: (loadingMore: boolean) => void;
    setPage: (page: number) => void;
    setNoDataFound: (noDataFound: boolean) => void;
}

export const useFoodStore = create<FoodState>((set) => ({
    hasMore: false,
    loading: true,
    loadingMore: false,
    page: 2,
    noDataFound: false,
    setHasMore: (hasMore: boolean) => set({ hasMore }),
    setLoading: (loading: boolean) => set({ loading }),
    setLoadingMore: (loadingMore: boolean) => set({ loadingMore }),
    setPage: (page: number) => set({ page }),
    setNoDataFound: (noDataFound: boolean) => set({ noDataFound })
}))