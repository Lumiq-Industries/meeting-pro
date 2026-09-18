import React, { useState, useCallback } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { RootNavigator } from './navigation/RootNavigator';
import { LoadingScreen } from './screens/LoadingScreen';
import { SignInScreen } from './screens/SignInScreen';

SplashScreen.preventAutoHideAsync().catch(() => undefined);

function AppContent() {
  const { effectiveTheme } = useTheme();
  const { session, initializing } = useAuth();
  const [booting, setBooting] = useState(true);

  const handleLoadFinish = useCallback(() => {
    SplashScreen.hideAsync().catch(() => undefined);
    setBooting(false);
  }, []);

  // Keep the loading screen up until both the intro animation has finished and
  // the persisted session has been read, so a signed-in user never sees a flash
  // of the sign-in screen.
  if (booting || initializing) {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <LoadingScreen onFinish={handleLoadFinish} />
      </>
    );
  }

  const barStyle = effectiveTheme === 'dark' ? 'light-content' : 'dark-content';

  // No session: sign-in only. Nothing behind it is reachable, which matches the
  // database — the anon role can read no table at all.
  if (!session) {
    return (
      <>
        <StatusBar barStyle={barStyle} />
        <SignInScreen />
      </>
    );
  }

  return (
    <>
      <StatusBar barStyle={barStyle} />
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
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
