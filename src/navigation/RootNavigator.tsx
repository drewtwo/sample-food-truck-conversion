/**
 * Root Navigator
 * Handles conditional rendering between Auth and App navigators based on authentication state
 */

import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from './types';
import { AuthNavigator } from './AuthNavigator';
import { AppNavigator } from './AppNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Root Navigator Component
 * Conditionally renders Auth or App navigator based on authentication state
 */
export const RootNavigator: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Check authentication state from auth context or async storage
    // This is a placeholder - replace with actual auth state check
    const bootstrapAsync = async () => {
      try {
        // Simulate checking if user is signed in
        // In a real app, this would check AsyncStorage, auth tokens, etc.
        setIsSignedIn(false);
      } catch (e) {
        // Restoring token failed
        setIsSignedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  if (isLoading) {
    // TODO: Replace with actual splash screen component
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: true,
        }}
      >
        {isSignedIn ? (
          <Stack.Screen
            name="App"
            component={AppNavigator}
            options={{
              animationTypeForReplace: 'pop',
            }}
          />
        ) : (
          <Stack.Screen
            name="Auth"
            component={AuthNavigator}
            options={{
              animationTypeForReplace: 'pop',
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
