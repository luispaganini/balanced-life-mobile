import { Redirect, Stack, Tabs } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';
import useTokenStore from '@/store/TokenStore';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { accessToken, refreshToken } = useTokenStore();
  if (!accessToken || !refreshToken) {
    return <Redirect href={"/login-one"}/>
  }

  return (
    <Stack screenOptions={{headerShown: false, headerTitleAlign: 'center'}}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: true,
          headerTitle: 'Home'
        }}
      />
    </Stack>
  );
}
