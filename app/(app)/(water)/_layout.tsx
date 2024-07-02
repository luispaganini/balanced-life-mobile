import { Redirect, Stack, Tabs } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';
import useTokenStore from '@/store/TokenStore';
import { useTranslation } from 'react-i18next';

export default function TabWaterLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const { accessToken, refreshToken } = useTokenStore();
  if (!accessToken || !refreshToken) {
    return <Redirect href={"/login-one"}/>
  }

  return (
    <Stack screenOptions={{headerShown: false, headerTitleAlign: 'center'}}>
      <Stack.Screen
        name="index"
        options={{
          title: t('Water'),
          headerShown: true,
          headerTitle: t('Water')
        }}
      />
    </Stack>
  );
}
