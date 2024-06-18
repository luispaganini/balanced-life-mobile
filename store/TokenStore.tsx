import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ITokenInterface from '@/interfaces/ITokenInterface';

interface TokenStore extends ITokenInterface {
  setAccessToken: (accessToken: string | null) => void;
  setRefreshToken: (refreshToken: string | null) => void;
  clearTokens: () => void;
}

const useTokenStore = create<TokenStore>()(persist(
  (set) => ({
    accessToken: null,
    refreshToken: null,
    setAccessToken: (accessToken) => set({ accessToken }),
    setRefreshToken: (refreshToken) => set({ refreshToken }),
    clearTokens: () => set({ accessToken: null, refreshToken: null }),
  }),
  {
    name: 'token-storage',
    storage: createJSONStorage(() => AsyncStorage), 
  }
)
);

export default useTokenStore;
