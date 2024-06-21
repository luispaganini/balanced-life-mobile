import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import i18n from '@/translation/i18n';
import { useColorScheme } from '@/hooks/useColorScheme';
import { I18nextProvider } from 'react-i18next';
import { Colors, DarkTheme } from '@/constants/Colors';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <I18nextProvider i18n={i18n}>
        <Stack
          initialRouteName='(login)'
          screenOptions={{
            headerShown: false,
          }}
        >
            <Stack.Screen name="(app)" options={{ headerShown: false }} />
            <Stack.Screen name="(login)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </I18nextProvider>
    </ThemeProvider>
  );
}
