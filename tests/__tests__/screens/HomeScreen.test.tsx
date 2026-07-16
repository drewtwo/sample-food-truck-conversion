/**
 * HomeScreen Tests
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { HomeScreen } from '../../src/screens/HomeScreen';

describe('HomeScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(<HomeScreen />);

    expect(getByText('Food Truck Finder')).toBeTruthy();
    expect(getByText('Find delicious food near you')).toBeTruthy();
  });

  it('renders all navigation buttons', () => {
    const { getByText } = render(<HomeScreen />);

    expect(getByText('Browse Food Trucks')).toBeTruthy();
    expect(getByText('View My Orders')).toBeTruthy();
    expect(getByText('My Favorites')).toBeTruthy();
  });

  it('calls onNavigate with correct screen name', () => {
    const onNavigate = jest.fn();
    const { getByText } = render(<HomeScreen onNavigate={onNavigate} />);

    fireEvent.press(getByText('Browse Food Trucks'));
    expect(onNavigate).toHaveBeenCalledWith('browse');

    fireEvent.press(getByText('View My Orders'));
    expect(onNavigate).toHaveBeenCalledWith('orders');

    fireEvent.press(getByText('My Favorites'));
    expect(onNavigate).toHaveBeenCalledWith('favorites');
  });
});
