/**
 * Home Screen
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../constants';
import { Button } from '../components/Button';

interface HomeScreenProps {
  onNavigate?: (screen: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Food Truck Finder</Text>
        <Text style={styles.subtitle}>Find delicious food near you</Text>
      </View>

      <View style={styles.content}>
        <Button
          title="Browse Food Trucks"
          onPress={() => onNavigate?.('browse')}
          style={styles.button}
        />
        <Button
          title="View My Orders"
          onPress={() => onNavigate?.('orders')}
          variant="secondary"
          style={styles.button}
        />
        <Button
          title="My Favorites"
          onPress={() => onNavigate?.('favorites')}
          variant="secondary"
          style={styles.button}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: SPACING.xl,
    paddingTop: SPACING.xxl,
    alignItems: 'center',
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.white,
    opacity: 0.9,
  },
  content: {
    padding: SPACING.lg,
  },
  button: {
    marginBottom: SPACING.md,
  },
});
