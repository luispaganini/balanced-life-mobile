import { View, Text } from 'react-native'
import React from 'react'
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { Stack } from 'expo-router';

export default function _layout() {
    const colorScheme = useColorScheme();
  
    return (
      <Stack
        initialRouteName='login-one'
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="login-one" options={{ headerShown: false }} />
        <Stack.Screen name="login-two" options={{ headerShown: false }} />
        <Stack.Screen name="(create)/create-one" options={{ headerShown: false }} />
        <Stack.Screen name="(forget)/pin-code" options={{ headerShown: false }} />
      </Stack>
    );
}