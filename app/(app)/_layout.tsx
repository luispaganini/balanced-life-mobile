import { Redirect, Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import useTokenStore from '@/store/TokenStore';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { accessToken, refreshToken } = useTokenStore();
  if (!accessToken || !refreshToken) {
    return <Redirect href={"/login-one"}/>
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
          headerShown: false,
          headerTitle: 'Home',
          headerTitleAlign: 'center'
        }}
      />
    </Tabs>
  );
}
