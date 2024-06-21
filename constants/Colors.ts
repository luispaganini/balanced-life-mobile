/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Theme } from "@react-navigation/native";

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    border: '#00B38C',
  },
  dark: {
    text: '#ECEDEE',
    // background: '#151718',
    background: '#000930',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    border: '#ECECEC',
  },
  color: {
    white: '#fff',
    black: '#11181C',
    green: '#39BD6E',
    lightGreen: "#03F346",
    cyan: '#00B38C',
    red: '#FF0000',
    blue: '#00A3FF',
    purple: "#A077B9",
    lightPurple: "#BFB5FD",
    lightBlue: "#98D0F0",
    darkBlue: "#000930",
    orange: "#FF8A00"
  },
};


export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: 'rgb(10, 132, 255)',
    background: Colors.dark.background,
    card: Colors.dark.background,
    text: Colors.dark.text,
    border: Colors.dark.border,
    notification: 'rgb(255, 69, 58)',
  },
};