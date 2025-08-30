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
    card: '#ffffff'
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
    card: "#F3F6FF",
  },
  color: {
    white: '#fff',
    black: '#11181C',
    green: '#39BD6E',
    lightGreen: "#03F346",
    cyan: '#00B38C',
    red: '#FF0000',
    lightRed: '#D75959',
    blue: '#00A3FF',
    purple: "#A077B9",
    lightPurple: "#BFB5FD",
    lightBlue: "#98D0F0",
    darkBlue: "#000930",
    orange: "#FF8A00",
    grey: '#9BA1A6',
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
  fonts: {
    regular: {
      fontFamily: "",
      fontWeight: "bold"
    },
    medium: {
      fontFamily: "",
      fontWeight: "bold"
    },
    bold: {
      fontFamily: "",
      fontWeight: "bold"
    },
    heavy: {
      fontFamily: "",
      fontWeight: "bold"
    }
  }
};