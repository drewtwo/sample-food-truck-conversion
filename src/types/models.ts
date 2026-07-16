/**
 * Core data models for the Food Truck application.
 * These types are ported from the FoodTruckKit Swift package.
 */

/**
 * Flavor profile representing the taste characteristics of a donut ingredient.
 * Each flavor dimension is represented as an integer value.
 */
export interface FlavorProfile {
  /** Salty flavor intensity */
  salty: number;
  /** Sweet flavor intensity */
  sweet: number;
  /** Bitter flavor intensity */
  bitter: number;
  /** Sour flavor intensity */
  sour: number;
  /** Savory flavor intensity */
  savory: number;
  /** Spicy flavor intensity */
  spicy: number;
}

/**
 * Flavor type enumeration for donut ingredients.
 */
export enum Flavor {
  Salty = 'salty',
  Sweet = 'sweet',
  Bitter = 'bitter',
  Sour = 'sour',
  Savory = 'savory',
  Spicy = 'spicy',
}

/**
 * Base interface for donut ingredients (dough, glaze, topping).
 */
export interface Ingredient {
  /** Display name of the ingredient */
  name: string;
  /** Asset name for the ingredient image */
  imageAssetName: string;
  /** Flavor profile of the ingredient */
  flavors: FlavorProfile;
}

/**
 * Donut dough type.
 * Represents the base of a donut with specific flavor characteristics.
 */
export interface DonutDough extends Ingredient {
  /** Unique identifier for the dough type */
  id: string;
  /** Background color asset name */
  backgroundColor?: string;
}

/**
 * Donut glaze type.
 * Represents the coating applied to a donut.
 */
export interface DonutGlaze extends Ingredient {
  /** Unique identifier for the glaze type */
  id: string;
}

/**
 * Donut topping type.
 * Represents decorative toppings applied to a donut.
 */
export interface DonutTopping extends Ingredient {
  /** Unique identifier for the topping type */
  id: string;
}

/**
 * Donut model representing a complete donut with all its components.
 * Ported from FoodTruckKit's Donut struct.
 */
export interface Donut {
  /** Unique identifier for the donut */
  id: number;
  /** Display name of the donut */
  name: string;
  /** Dough component (required) */
  dough: DonutDough;
  /** Glaze component (optional) */
  glaze?: DonutGlaze;
  /** Topping component (optional) */
  topping?: DonutTopping;
}

/**
 * Order status enumeration.
 * Represents the current state of an order in the fulfillment process.
 */
export enum OrderStatus {
  /** Order has been placed but not yet started */
  Placed = 'placed',
  /** Order is currently being prepared */
  Preparing = 'preparing',
  /** Order is ready for pickup */
  Ready = 'ready',
  /** Order has been completed */
  Completed = 'completed',
}

/**
 * Order model representing a customer order.
 * Ported from FoodTruckKit's Order struct.
 */
export interface Order {
  /** Unique identifier for the order */
  id: string;
  /** Current status of the order */
  status: OrderStatus;
  /** Array of donuts in the order */
  donuts: Donut[];
  /** Sales count per donut ID */
  sales: Record<number, number>;
  /** Total price of the order */
  grandTotal: number;
  /** ID of the city where the order is being fulfilled */
  city: string;
  /** ID of the parking spot where the order is being fulfilled */
  parkingSpot: string;
  /** Timestamp when the order was created */
  creationDate: string; // ISO 8601 date string
  /** Timestamp when the order was completed (if applicable) */
  completionDate?: string; // ISO 8601 date string
  /** Temperature at the time of the order */
  temperature: {
    value: number;
    unit: 'celsius' | 'fahrenheit';
  };
  /** Whether it was raining at the time of the order */
  wasRaining: boolean;
}

/**
 * Parking spot model representing a location where the food truck can park.
 * Ported from FoodTruckKit's ParkingSpot struct.
 */
export interface ParkingSpot {
  /** Unique identifier (same as name) */
  id: string;
  /** Display name of the parking spot */
  name: string;
  /** Geographic location coordinates */
  location: {
    latitude: number;
    longitude: number;
  };
  /** Camera distance for map view (in meters) */
  cameraDistance?: number;
}

/**
 * City model representing a location where the food truck operates.
 * Ported from FoodTruckKit's City struct.
 */
export interface City {
  /** Unique identifier (same as name) */
  id: string;
  /** Display name of the city */
  name: string;
  /** Array of available parking spots in the city */
  parkingSpots: ParkingSpot[];
}

/**
 * User model representing the current user's authentication state.
 * Ported from FoodTruckKit's User enum.
 */
export type User =
  | {
      /** Default unauthenticated user state */
      type: 'default';
    }
  | {
      /** Authenticated user state */
      type: 'authenticated';
      /** Username of the authenticated user */
      username: string;
    };

/**
 * Helper type to check if a user is authenticated.
 */
export function isAuthenticatedUser(user: User): user is Extract<User, { type: 'authenticated' }> {
  return user.type === 'authenticated';
}

/**
 * Donut sales data model.
 * Represents sales information for a specific donut.
 */
export interface DonutSales {
  /** Donut ID */
  donutId: number;
  /** Number of units sold */
  unitsSold: number;
  /** Total revenue from this donut */
  revenue: number;
}

/**
 * Order summary model.
 * Represents aggregated information about an order.
 */
export interface OrderSummary {
  /** Order ID */
  orderId: string;
  /** Total number of donuts in the order */
  totalDonuts: number;
  /** Total revenue from the order */
  totalRevenue: number;
  /** Order status */
  status: OrderStatus;
  /** Formatted date string for display */
  formattedDate: string;
}
