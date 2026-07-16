# Dart Code Style Guide

This document outlines the coding conventions and best practices for the Food Truck Conversion Flutter project.

## Table of Contents

1. [Naming Conventions](#naming-conventions)
2. [Code Formatting](#code-formatting)
3. [Immutability Patterns](#immutability-patterns)
4. [Documentation](#documentation)
5. [Best Practices](#best-practices)

## Naming Conventions

### Classes and Types (PascalCase)

All class names, enum names, typedef names, and extension names should use PascalCase (also known as UpperCamelCase).

```dart
// ✓ Good
class FoodTruck {
  // ...
}

enum OrderStatus {
  pending,
  confirmed,
  completed,
}

typedef OrderCallback = void Function(Order order);

extension StringExtension on String {
  // ...
}

// ✗ Bad
class food_truck {
  // ...
}

class foodTruck {
  // ...
}
```

### Variables, Properties, and Methods (camelCase)

All variable names, property names, method names, and function names should use camelCase (also known as lowerCamelCase).

```dart
// ✓ Good
String restaurantName = 'Taco Truck';
int numberOfOrders = 5;

void processOrder() {
  // ...
}

String get orderStatus => _orderStatus;

// ✗ Bad
String RestaurantName = 'Taco Truck';
String restaurant_name = 'Taco Truck';

void ProcessOrder() {
  // ...
}
```

### Constants (camelCase or UPPER_SNAKE_CASE)

Constants should use camelCase for most cases. Use UPPER_SNAKE_CASE only for compile-time constants that are part of the public API.

```dart
// ✓ Good
const maxOrderSize = 100;
const defaultTimeout = Duration(seconds: 30);

// ✓ Good (for public API constants)
const String API_BASE_URL = 'https://api.example.com';
const int MAX_RETRIES = 3;

// ✗ Bad
const MAX_ORDER_SIZE = 100;
const DefaultTimeout = Duration(seconds: 30);
```

### Private Members (leading underscore)

Private members should be prefixed with an underscore and use camelCase.

```dart
// ✓ Good
class OrderManager {
  String _apiKey;
  List<Order> _orders = [];
  
  void _validateOrder(Order order) {
    // ...
  }
}

// ✗ Bad
class OrderManager {
  String apiKey;  // Should be private
  List<Order> orders = [];  // Should be private
}
```

### File Names (snake_case)

File names should use snake_case and match the primary class/widget they contain.

```
// ✓ Good
lib/
  screens/
    order_detail_screen.dart
    menu_list_screen.dart
  models/
    food_item.dart
    order.dart
  services/
    api_service.dart
    location_service.dart

// ✗ Bad
lib/
  screens/
    OrderDetailScreen.dart
    menuListScreen.dart
```

## Code Formatting

### Line Length

Maximum line length is **80 characters**. This is enforced by the `dart format` tool.

```dart
// ✓ Good
void processLargeDataSet(
  List<String> items,
  Function(String) callback,
) {
  for (final item in items) {
    callback(item);
  }
}

// ✗ Bad (exceeds 80 characters)
void processLargeDataSet(List<String> items, Function(String) callback) {
  for (final item in items) {
    callback(item);
  }
}
```

### Indentation

Use 2 spaces for indentation (standard Dart convention).

```dart
// ✓ Good
class Order {
  String id;
  
  Order({required this.id});
  
  void process() {
    if (id.isNotEmpty) {
      print('Processing order: $id');
    }
  }
}

// ✗ Bad (4 spaces)
class Order {
    String id;
    
    Order({required this.id});
}
```

### Quotes

Use single quotes for strings unless the string contains single quotes.

```dart
// ✓ Good
String message = 'Hello, World!';
String quote = "It's a beautiful day";

// ✗ Bad
String message = "Hello, World!";
String quote = 'It\'s a beautiful day';
```

### Trailing Commas

Use trailing commas in multi-line argument lists, parameter lists, and collection literals.

```dart
// ✓ Good
Widget build(BuildContext context) {
  return Column(
    children: [
      Text('Item 1'),
      Text('Item 2'),
      Text('Item 3'),
    ],
  );
}

void myFunction(
  String arg1,
  String arg2,
  String arg3,
) {
  // ...
}

// ✗ Bad (no trailing comma)
Widget build(BuildContext context) {
  return Column(
    children: [
      Text('Item 1'),
      Text('Item 2'),
      Text('Item 3')
    ],
  );
}
```

## Immutability Patterns

### Use `final` for Fields

Mark fields as `final` when they are not reassigned after initialization.

```dart
// ✓ Good
class Order {
  final String id;
  final String customerId;
  final List<MenuItem> items;
  
  Order({
    required this.id,
    required this.customerId,
    required this.items,
  });
}

// ✗ Bad (unnecessary mutability)
class Order {
  String id;
  String customerId;
  List<MenuItem> items;
  
  Order({
    required this.id,
    required this.customerId,
    required this.items,
  });
}
```

### Use `const` Constructors

Provide `const` constructors for immutable classes, especially for value objects and configuration classes.

```dart
// ✓ Good
class MenuItem {
  final String name;
  final double price;
  
  const MenuItem({
    required this.name,
    required this.price,
  });
}

// ✓ Good (for widgets)
class OrderCard extends StatelessWidget {
  final Order order;
  
  const OrderCard({
    Key? key,
    required this.order,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Card(
      child: Text(order.id),
    );
  }
}
```

### Immutable Collections

Use immutable collection literals when possible.

```dart
// ✓ Good
const List<String> statuses = ['pending', 'confirmed', 'completed'];
final Map<String, dynamic> config = {
  'timeout': 30,
  'retries': 3,
};

// ✗ Bad (mutable when not needed)
List<String> statuses = ['pending', 'confirmed', 'completed'];
statuses.add('cancelled');  // Unexpected mutation
```

### Use `late` for Lazy Initialization

Use `late` for fields that are initialized after construction but before use.

```dart
// ✓ Good
class OrderService {
  late final ApiClient _apiClient;
  
  Future<void> initialize() async {
    _apiClient = ApiClient();
    await _apiClient.connect();
  }
}

// ✗ Bad (nullable when not needed)
class OrderService {
  ApiClient? _apiClient;
  
  Future<void> initialize() async {
    _apiClient = ApiClient();
    await _apiClient!.connect();
  }
}
```

## Documentation

### Public API Documentation

All public classes, methods, and properties should have documentation comments.

```dart
// ✓ Good
/// Represents a food truck order.
///
/// An order contains one or more menu items and tracks the order status
/// throughout the fulfillment process.
class Order {
  /// The unique identifier for this order.
  final String id;
  
  /// Creates a new [Order] with the given [id].
  Order({required this.id});
  
  /// Processes this order and returns the result.
  ///
  /// Throws [OrderException] if the order cannot be processed.
  Future<OrderResult> process() async {
    // ...
  }
}

// ✗ Bad (missing documentation)
class Order {
  String id;
  
  Order({required this.id});
  
  Future<OrderResult> process() async {
    // ...
  }
}
```

### Comment Style

Use `///` for documentation comments and `//` for regular comments.

```dart
// ✓ Good
/// This is a documentation comment.
/// It describes the public API.
void publicMethod() {
  // This is a regular comment explaining implementation details.
  final result = complexCalculation();
  return result;
}

// ✗ Bad
// This looks like a documentation comment but uses //.
void publicMethod() {
  /// This is a documentation comment in the wrong place.
  final result = complexCalculation();
  return result;
}
```

## Best Practices

### Null Safety

Always use null safety. Use `?` for nullable types and `!` only when you're certain a value is not null.

```dart
// ✓ Good
String? maybeValue = getValue();
if (maybeValue != null) {
  print(maybeValue.length);
}

// ✓ Good (using null coalescing)
String value = maybeValue ?? 'default';

// ✗ Bad (unnecessary null check)
String? maybeValue = getValue();
print(maybeValue!.length);  // Risky
```

### Avoid `print()` in Production Code

Use a proper logging framework instead of `print()`.

```dart
// ✓ Good
import 'package:logger/logger.dart';

final logger = Logger();
logger.i('Order processed successfully');

// ✗ Bad
print('Order processed successfully');
```

### Use Type Annotations

Always provide explicit type annotations for public APIs.

```dart
// ✓ Good
List<Order> getOrders() {
  return _orders;
}

// ✓ Good (with inference for local variables)
final orders = getOrders();

// ✗ Bad (missing return type)
getOrders() {
  return _orders;
}
```

### Prefer Expression Functions

Use expression functions for simple getters and methods.

```dart
// ✓ Good
String get displayName => '$firstName $lastName';

bool isValid() => id.isNotEmpty && price > 0;

// ✗ Bad (unnecessary braces)
String get displayName {
  return '$firstName $lastName';
}

bool isValid() {
  return id.isNotEmpty && price > 0;
}
```

### Use Cascades for Multiple Operations

Use cascade notation (`..`) when performing multiple operations on the same object.

```dart
// ✓ Good
final order = Order(id: '123')
  ..addItem(MenuItem(name: 'Taco', price: 5.0))
  ..addItem(MenuItem(name: 'Burrito', price: 7.0))
  ..process();

// ✗ Bad (verbose)
final order = Order(id: '123');
order.addItem(MenuItem(name: 'Taco', price: 5.0));
order.addItem(MenuItem(name: 'Burrito', price: 7.0));
order.process();
```

### Avoid Magic Numbers

Extract magic numbers into named constants.

```dart
// ✓ Good
const int maxOrderItems = 50;
const Duration orderTimeout = Duration(minutes: 30);

void validateOrder(Order order) {
  if (order.items.length > maxOrderItems) {
    throw OrderException('Too many items');
  }
}

// ✗ Bad (magic numbers)
void validateOrder(Order order) {
  if (order.items.length > 50) {
    throw OrderException('Too many items');
  }
}
```

## Running Linting Checks

To run linting checks locally:

```bash
# Run the analyzer
flutter analyze

# Check and fix formatting
dart format --line-length=80 lib test

# Run the pre-commit hook manually
bash scripts/lint.sh
```

## IDE Configuration

### VS Code

Install the Dart and Flutter extensions. The analyzer will run automatically and highlight issues.

### Android Studio / IntelliJ IDEA

The Dart plugin is included. Enable "Run dart analyzer" in the settings for real-time feedback.

## References

- [Dart Style Guide](https://dart.dev/guides/language/effective-dart/style)
- [Flutter Best Practices](https://flutter.dev/docs/testing/best-practices)
- [Dart Lints](https://dart.dev/lints)
