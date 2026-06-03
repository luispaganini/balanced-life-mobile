import { Redirect, Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import useTokenStore from '@/store/TokenStore';
import { useTranslation } from 'react-i18next';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const { accessToken, refreshToken } = useTokenStore();
  if (!accessToken || !refreshToken) {
    return <Redirect href={"/login-one"} />
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme === 'dark' ? 'dark' : 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: t('Diário'),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'restaurant' : 'restaurant-outline'} color={color} />
          ),
          headerShown: false,
          headerTitle: t('Diário'),
          headerTitleAlign: 'center'
        }}
      />
      <Tabs.Screen
        name="(water)"
        options={{
          title: t('Água'),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'water' : 'water-outline'} color={color} />
          ),
          headerShown: false,
          headerTitle: t('Água'),
          headerTitleAlign: 'center'
        }}
      />
      <Tabs.Screen
        name="body"
        options={{
          title: t('Corpo'),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'body' : 'body-outline'} color={color} />
          ),
          headerShown: false,
          headerTitle: t('Corpo'),
          headerTitleAlign: 'center'
        }}
      />
      <Tabs.Screen
        name="nutritionist"
        options={{
          title: t('Nutricionista'),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'nutrition' : 'nutrition-outline'} color={color} />
          ),
          headerShown: false,
          headerTitle: t('Nutricionista'),
          headerTitleAlign: 'center'
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: t('Perfil'),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
          ),
          headerShown: false,
          headerTitle: t('Perfil'),
          headerTitleAlign: 'center'
        }}
      />
    </Tabs>
  );
}
