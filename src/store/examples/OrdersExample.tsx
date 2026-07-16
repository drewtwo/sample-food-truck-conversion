/**
 * Example: Using Orders State
 * 
 * This example demonstrates how to use the orders state
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
import { Order } from '../types';

export const OrdersExample: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { orders } = state;

  // Simulate fetching orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      dispatch({ type: 'ORDERS_FETCH_START' });

      // Simulate API call
      setTimeout(() => {
        const mockOrders: Order[] = [
          {
            id: 'order-1',
            truckId: 'truck-1',
            customerId: 'customer-1',
            items: [
              {
                menuItemId: 'item-1',
                name: 'Taco',
                quantity: 2,
                price: 3.99,
              },
              {
                menuItemId: 'item-2',
                name: 'Burrito',
                quantity: 1,
                price: 5.99,
              },
            ],
            status: 'pending',
            totalPrice: 13.97,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            estimatedReadyTime: new Date(Date.now() + 30 * 60000).toISOString(),
            notes: 'Extra salsa please',
          },
          {
            id: 'order-2',
            truckId: 'truck-1',
            customerId: 'customer-2',
            items: [
              {
                menuItemId: 'item-3',
                name: 'Quesadilla',
                quantity: 1,
                price: 4.99,
              },
            ],
            status: 'confirmed',
            totalPrice: 4.99,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ];

        dispatch({
          type: 'ORDERS_FETCH_SUCCESS',
          payload: mockOrders,
        });
      }, 1000);
    };

    fetchOrders();
  }, [dispatch]);

  const handleSelectOrder = (order: Order) => {
    dispatch({
      type: 'ORDERS_SET_CURRENT',
      payload: order,
    });
  };

  const handleCreateOrder = () => {
    dispatch({ type: 'ORDERS_CREATE_START' });

    // Simulate API call
    setTimeout(() => {
      const newOrder: Order = {
        id: `order-${Date.now()}`,
        truckId: 'truck-1',
        customerId: 'customer-3',
        items: [
          {
            menuItemId: 'item-1',
            name: 'Taco',
            quantity: 3,
            price: 3.99,
          },
        ],
        status: 'pending',
        totalPrice: 11.97,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      dispatch({
        type: 'ORDERS_CREATE_SUCCESS',
        payload: newOrder,
      });
    }, 500);
  };

  const handleUpdateOrderStatus = (order: Order) => {
    dispatch({ type: 'ORDERS_UPDATE_START' });

    // Simulate API call
    setTimeout(() => {
      const statusProgression = {
        pending: 'confirmed',
        confirmed: 'preparing',
        preparing: 'ready',
        ready: 'completed',
        completed: 'completed',
      };

      const newStatus = statusProgression[order.status as keyof typeof statusProgression];

      dispatch({
        type: 'ORDERS_UPDATE_SUCCESS',
        payload: {
          ...order,
          status: newStatus as Order['status'],
          updatedAt: new Date().toISOString(),
        },
      });
    }, 500);
  };

  if (orders.loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (orders.error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Error: {orders.error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orders</Text>

      <TouchableOpacity style={styles.createButton} onPress={handleCreateOrder}>
        <Text style={styles.createButtonText}>+ Create New Order</Text>
      </TouchableOpacity>

      {orders.currentOrder && (
        <View style={styles.selectedOrder}>
          <Text style={styles.selectedTitle}>Selected Order: {orders.currentOrder.id}</Text>
          <Text style={styles.selectedSubtitle}>
            Status: {orders.currentOrder.status}
          </Text>
          <Text style={styles.selectedSubtitle}>
            Total: ${orders.currentOrder.totalPrice.toFixed(2)}
          </Text>
          <TouchableOpacity
            style={styles.updateButton}
            onPress={() => handleUpdateOrderStatus(orders.currentOrder!)}
          >
            <Text style={styles.updateButtonText}>Update Status</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={orders.orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.orderItem,
              orders.currentOrder?.id === item.id && styles.orderItemSelected,
            ]}
            onPress={() => handleSelectOrder(item)}
          >
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>Order #{item.id.slice(-4)}</Text>
              <Text style={[styles.status, getStatusStyle(item.status)]}>
                {item.status}
              </Text>
            </View>
            <Text style={styles.orderItems}>
              {item.items.length} item{item.items.length !== 1 ? 's' : ''}
            </Text>
            <Text style={styles.orderTotal}>
              Total: ${item.totalPrice.toFixed(2)}
            </Text>
            {item.notes && <Text style={styles.orderNotes}>Notes: {item.notes}</Text>}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'pending':
      return { color: '#ff9800' };
    case 'confirmed':
      return { color: '#2196f3' };
    case 'preparing':
      return { color: '#9c27b0' };
    case 'ready':
      return { color: '#4caf50' };
    case 'completed':
      return { color: '#4caf50' };
    case 'cancelled':
      return { color: '#f44336' };
    default:
      return { color: '#999' };
  }
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
  createButton: {
    backgroundColor: '#4caf50',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedOrder: {
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
  updateButton: {
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  orderItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  orderItemSelected: {
    borderColor: '#007AFF',
    borderWidth: 2,
    backgroundColor: '#f0f8ff',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
  },
  orderItems: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  orderTotal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  orderNotes: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});
