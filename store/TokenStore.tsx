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
    token: null,
    refreshToken: null,
    setAccessToken: (token) => set({ token }),
    setRefreshToken: (refreshToken) => set({ refreshToken }),
    clearTokens: () => set({ token: null, refreshToken: null }),
  }),
  {
    name: 'token-storage',
    storage: createJSONStorage(() => AsyncStorage), 
  }
)
);

export default useTokenStore;
