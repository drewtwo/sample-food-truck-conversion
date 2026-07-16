/**
 * Example: Using Truck State
 * 
 * This example demonstrates how to use the truck state
 * from the AppContext in a component.
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useAppContext } from '../useAppContext';
import { Truck } from '../types';

export const TruckExample: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { truck } = state;

  // Simulate fetching trucks on component mount
  useEffect(() => {
    const fetchTrucks = async () => {
      dispatch({ type: 'TRUCK_FETCH_START' });

      // Simulate API call
      setTimeout(() => {
        const mockTrucks: Truck[] = [
          {
            id: 'truck-1',
            name: 'Taco Truck',
            location: {
              latitude: 40.7128,
              longitude: -74.006,
              address: '123 Main St',
              city: 'New York',
              state: 'NY',
              zipCode: '10001',
            },
            status: 'active',
            menu: [
              {
                id: 'item-1',
                name: 'Taco',
                description: 'Delicious taco',
                price: 3.99,
                category: 'Main',
                available: true,
              },
            ],
            operatingHours: {
              monday: { open: '10:00', close: '22:00', closed: false },
              tuesday: { open: '10:00', close: '22:00', closed: false },
              wednesday: { open: '10:00', close: '22:00', closed: false },
              thursday: { open: '10:00', close: '22:00', closed: false },
              friday: { open: '10:00', close: '23:00', closed: false },
              saturday: { open: '11:00', close: '23:00', closed: false },
              sunday: { open: '11:00', close: '21:00', closed: false },
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ];

        dispatch({
          type: 'TRUCK_FETCH_SUCCESS',
          payload: mockTrucks,
        });
      }, 1000);
    };

    fetchTrucks();
  }, [dispatch]);

  const handleSelectTruck = (truck: Truck) => {
    dispatch({
      type: 'TRUCK_SET_CURRENT',
      payload: truck,
    });
  };

  if (truck.loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (truck.error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Error: {truck.error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Food Trucks</Text>

      {truck.currentTruck && (
        <View style={styles.selectedTruck}>
          <Text style={styles.selectedTitle}>Selected: {truck.currentTruck.name}</Text>
          <Text style={styles.selectedSubtitle}>
            {truck.currentTruck.location.address}
          </Text>
        </View>
      )}

      <FlatList
        data={truck.trucks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.truckItem,
              truck.currentTruck?.id === item.id && styles.truckItemSelected,
            ]}
            onPress={() => handleSelectTruck(item)}
          >
            <Text style={styles.truckName}>{item.name}</Text>
            <Text style={styles.truckAddress}>{item.location.address}</Text>
            <Text style={styles.truckStatus}>Status: {item.status}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  selectedTruck: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  selectedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  selectedSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  truckItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  truckItemSelected: {
    borderColor: '#007AFF',
    borderWidth: 2,
    backgroundColor: '#f0f8ff',
  },
  truckName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  truckAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  truckStatus: {
    fontSize: 12,
    color: '#999',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});
