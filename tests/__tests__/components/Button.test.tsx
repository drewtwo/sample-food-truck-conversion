/**
 * Button Component Tests
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../../src/components/Button';

describe('Button Component', () => {
  it('renders correctly with title', () => {
    const { getByText } = render(
      <Button title="Test Button" onPress={jest.fn()} />
    );
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Test Button" onPress={onPress} />
    );
    fireEvent.press(getByText('Test Button'));
    expect(onPress).toHaveBeenCalled();
  });

  it('disables button when disabled prop is true', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Test Button" onPress={onPress} disabled={true} />
    );
    fireEvent.press(getByText('Test Button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('shows loading text when loading is true', () => {
    const { getByText } = render(
      <Button title="Test Button" onPress={jest.fn()} loading={true} />
    );
    expect(getByText('Loading...')).toBeTruthy();
  });

  it('renders with different variants', () => {
    const { getByText: getByText1 } = render(
      <Button title="Primary" onPress={jest.fn()} variant="primary" />
    );
    const { getByText: getByText2 } = render(
      <Button title="Secondary" onPress={jest.fn()} variant="secondary" />
    );
    const { getByText: getByText3 } = render(
      <Button title="Danger" onPress={jest.fn()} variant="danger" />
    );

    expect(getByText1('Primary')).toBeTruthy();
    expect(getByText2('Secondary')).toBeTruthy();
    expect(getByText3('Danger')).toBeTruthy();
  });
});
