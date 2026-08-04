import React, { useState, useCallback } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { RootNavigator } from './navigation/RootNavigator';
import { LoadingScreen } from './screens/LoadingScreen';

SplashScreen.preventAutoHideAsync().catch(() => undefined);

function AppContent() {
  const { effectiveTheme } = useTheme();
  const [booting, setBooting] = useState(true);

  const handleLoadFinish = useCallback(() => {
    SplashScreen.hideAsync().catch(() => undefined);
    setBooting(false);
  }, []);

  if (booting) {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <LoadingScreen onFinish={handleLoadFinish} />
      </>
    );
  }

  return (
    <>
      <StatusBar barStyle={effectiveTheme === 'dark' ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
