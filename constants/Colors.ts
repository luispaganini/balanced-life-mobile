/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Theme, DarkTheme as NavigationDarkTheme } from 'expo-router/react-navigation';

const tintColorLight = '#00B38C';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#1F2937',
    background: '#F3F4F6',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    border: '#E5E7EB',
    card: '#ffffff'
  },
  dark: {
    text: '#F9FAFB',
    background: '#111827',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    border: '#374151',
    card: "#1F2937",
  },
  color: {
    white: '#fff',
    black: '#11181C',
    green: '#00B38C',
    lightGreen: "#03F346",
    cyan: '#00B38C',
    red: '#FF0000',
    lightRed: '#D75959',
    blue: '#00A3FF',
    purple: "#A077B9",
    lightPurple: "#BFB5FD",
    lightBlue: "#98D0F0",
    darkBlue: "#111827",
    orange: "#FF8A00",
    grey: '#9BA1A6',
  },
};


export const DarkTheme: Theme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    primary: '#00B38C',
    background: Colors.dark.background,
    card: Colors.dark.background,
    text: Colors.dark.text,
    border: Colors.dark.border,
    notification: 'rgb(255, 69, 58)',
  },
};