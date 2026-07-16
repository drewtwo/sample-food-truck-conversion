/**
 * Example: Using Authentication State
 * 
 * This example demonstrates how to use the authentication state
 * from the AppContext in a component.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useAppContext } from '../useAppContext';

export const AuthExample: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { auth } = state;

  const handleLogin = () => {
    // Start login process
    dispatch({ type: 'AUTH_LOGIN_START' });

    // Simulate API call
    setTimeout(() => {
      dispatch({
        type: 'AUTH_LOGIN_SUCCESS',
        payload: {
          id: '123',
          email: 'user@example.com',
          name: 'John Doe',
          role: 'operator',
          createdAt: new Date().toISOString(),
        },
      });
    }, 1000);
  };

  const handleLogout = () => {
    dispatch({ type: 'AUTH_LOGOUT' });
  };

  if (auth.loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (auth.error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Error: {auth.error}</Text>
      </View>
    );
  }

  if (!auth.isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Not Authenticated</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {auth.user?.name}!</Text>
      <Text style={styles.subtitle}>{auth.user?.email}</Text>
      <Text style={styles.subtitle}>Role: {auth.user?.role}</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  button: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});
