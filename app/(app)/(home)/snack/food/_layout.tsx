import { Redirect, Stack, Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import useTokenStore from '@/store/TokenStore';
import { useTranslation } from 'react-i18next';

export default function FoodLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const { accessToken, refreshToken } = useTokenStore();
  if (!accessToken || !refreshToken) {
    return <Redirect href={"/login-one"} />
  }

  return (
    <Stack
      screenOptions={{
        headerTitleAlign: 'center',
        headerShown: false
      }}
    >
      <Stack.Screen name='[idMeal]/[idTypeSnack]/search-food' options={{ title: t("Food")}} />
      <Stack.Screen name='[idMeal]/[idTypeSnack]/[idFood]' options={{ title: t("Food")}} />
      <Stack.Screen name='add' options={{ title: t("Add Food")}} />
    </Stack>
  );
}
