import { View, Text } from 'react-native'
import React from 'react'
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { Stack } from 'expo-router';

export default function _layout() {
    const colorScheme = useColorScheme();
  
    return (
      <Stack
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="login-one"
        />
      </Stack>
    );
}