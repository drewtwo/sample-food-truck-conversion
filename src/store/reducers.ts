/**
 * Reducer functions for state management
 * Implements pure functions that handle state transitions
 */

import {
  AuthState,
  AuthAction,
  TruckState,
  TruckAction,
  OrdersState,
  OrdersAction,
} from './types';

/**
 * Authentication reducer
 * Handles all authentication-related state changes
 */
export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'AUTH_LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null,
      };

    case 'AUTH_LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: action.payload,
      };

    case 'AUTH_LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
      };

    case 'AUTH_SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    case 'AUTH_CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

/**
 * Truck reducer
 * Handles all truck-related state changes
 */
export const truckReducer = (state: TruckState, action: TruckAction): TruckState => {
  switch (action.type) {
    case 'TRUCK_FETCH_START':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'TRUCK_FETCH_SUCCESS':
      return {
        ...state,
        trucks: action.payload,
        loading: false,
        error: null,
      };

    case 'TRUCK_FETCH_FAILURE':
      return {
        ...state,
        trucks: [],
        loading: false,
        error: action.payload,
      };

    case 'TRUCK_SET_CURRENT':
      return {
        ...state,
        currentTruck: action.payload,
      };

    case 'TRUCK_UPDATE_START':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'TRUCK_UPDATE_SUCCESS':
      return {
        ...state,
        currentTruck: action.payload,
        trucks: state.trucks.map((truck) =>
          truck.id === action.payload.id ? action.payload : truck
        ),
        loading: false,
        error: null,
      };

    case 'TRUCK_UPDATE_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'TRUCK_SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    case 'TRUCK_CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

/**
 * Orders reducer
 * Handles all order-related state changes
 */
export const ordersReducer = (state: OrdersState, action: OrdersAction): OrdersState => {
  switch (action.type) {
    case 'ORDERS_FETCH_START':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'ORDERS_FETCH_SUCCESS':
      return {
        ...state,
        orders: action.payload,
        loading: false,
        error: null,
      };

    case 'ORDERS_FETCH_FAILURE':
      return {
        ...state,
        orders: [],
        loading: false,
        error: action.payload,
      };

    case 'ORDERS_SET_CURRENT':
      return {
        ...state,
        currentOrder: action.payload,
      };

    case 'ORDERS_CREATE_START':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'ORDERS_CREATE_SUCCESS':
      return {
        ...state,
        orders: [...state.orders, action.payload],
        currentOrder: action.payload,
        loading: false,
        error: null,
      };

    case 'ORDERS_CREATE_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'ORDERS_UPDATE_START':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'ORDERS_UPDATE_SUCCESS':
      return {
        ...state,
        currentOrder: action.payload,
        orders: state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        ),
        loading: false,
        error: null,
      };

    case 'ORDERS_UPDATE_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'ORDERS_SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    case 'ORDERS_CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
