# Flutter Project Structure & Conventions

This document outlines the project structure and conventions for the Food Truck Flutter application.

## Directory Structure

```
lib/
├── main.dart                 # Application entry point
├── ui/                       # UI layer (screens, widgets, pages)
│   ├── screens/             # Full-screen views
│   ├── widgets/             # Reusable UI components
│   └── pages/               # Page-level compositions
├── models/                  # Data models (freezed classes, entities)
├── stores/                  # State management (Provider, Riverpod stores)
├── services/                # Business logic & API services
│   ├── api/                 # HTTP client and API endpoints
│   ├── local_storage/       # SharedPreferences and local data
│   └── platform_channels/   # Native platform communication
├── constants/               # App-wide constants
│   ├── app_constants.dart   # General constants
│   ├── colors.dart          # Color palette
│   ├── strings.dart         # Localized strings
│   └── dimensions.dart      # Spacing, padding, sizes
└── utils/                   # Utility functions and helpers

android/                      # Android platform-specific code
ios/                         # iOS platform-specific code
test/                        # Unit and widget tests
pubspec.yaml                 # Dart dependencies and configuration
```

## Key Conventions

### 1. State Management (Provider)
- Use `Provider` for simple state and dependency injection
- Use `StateNotifier` + `StateNotifierProvider` for complex state
- Place all providers in `lib/stores/` directory
- Naming: `*_provider.dart` or `*_store.dart`

Example:
```dart
// lib/stores/truck_store.dart
final truckProvider = StateNotifierProvider<TruckNotifier, TruckState>((ref) {
  return TruckNotifier();
});
```

### 2. Navigation (GoRouter)
- Define all routes in a centralized router configuration
- Use named routes for type-safe navigation
- Place router configuration in `lib/services/router.dart`

Example:
```dart
final router = GoRouter(
  routes: [
    GoRoute(path: '/', builder: (context, state) => const HomePage()),
    GoRoute(path: '/truck', builder: (context, state) => const TruckPage()),
  ],
);
```

### 3. Data Models (Freezed)
- Use `@freezed` annotation for immutable data classes
- Generate models with `freezed_annotation` and `freezed` code generator
- Place models in `lib/models/`
- Naming: `*_model.dart`

Example:
```dart
// lib/models/truck_model.dart
import 'package:freezed_annotation/freezed_annotation.dart';

part 'truck_model.freezed.dart';
part 'truck_model.g.dart';

@freezed
class Truck with _$Truck {
  const factory Truck({
    required String id,
    required String name,
    required double latitude,
    required double longitude,
  }) = _Truck;

  factory Truck.fromJson(Map<String, dynamic> json) => _$TruckFromJson(json);
}
```

### 4. API Services
- Create service classes in `lib/services/api/`
- Use `http` package for HTTP requests
- Implement error handling and retry logic
- Naming: `*_service.dart`

Example:
```dart
// lib/services/api/truck_service.dart
class TruckService {
  final http.Client _client;
  
  TruckService(this._client);
  
  Future<List<Truck>> getTrucks() async {
    final response = await _client.get(Uri.parse('$baseUrl/trucks'));
    if (response.statusCode == 200) {
      return (jsonDecode(response.body) as List)
          .map((e) => Truck.fromJson(e))
          .toList();
    }
    throw Exception('Failed to load trucks');
  }
}
```

### 5. Local Storage (SharedPreferences)
- Use `shared_preferences` for persistent local data
- Create wrapper services in `lib/services/local_storage/`
- Naming: `*_storage.dart`

Example:
```dart
// lib/services/local_storage/user_storage.dart
class UserStorage {
  static const String _userKey = 'user_data';
  final SharedPreferences _prefs;
  
  UserStorage(this._prefs);
  
  Future<void> saveUser(User user) async {
    await _prefs.setString(_userKey, jsonEncode(user.toJson()));
  }
  
  User? getUser() {
    final json = _prefs.getString(_userKey);
    return json != null ? User.fromJson(jsonDecode(json)) : null;
  }
}
```

### 6. Constants
- Organize constants by category in `lib/constants/`
- Use `const` for compile-time constants
- Avoid magic numbers and strings

Example:
```dart
// lib/constants/app_constants.dart
const String appName = 'Food Truck';
const String apiBaseUrl = 'https://api.example.com';
const Duration apiTimeout = Duration(seconds: 30);

// lib/constants/dimensions.dart
const double paddingSmall = 8.0;
const double paddingMedium = 16.0;
const double paddingLarge = 24.0;
```

### 7. Localization (intl)
- Use `intl` package for multi-language support
- Create localization files in `lib/l10n/`
- Use `Intl.message()` for translatable strings

Example:
```dart
// lib/l10n/messages.dart
String greeting(String name) => Intl.message(
  'Hello, $name!',
  name: 'greeting',
  args: [name],
);
```

### 8. Charts (fl_chart)
- Use `fl_chart` for data visualization
- Create custom chart widgets in `lib/ui/widgets/charts/`
- Encapsulate chart logic in dedicated widget classes

Example:
```dart
// lib/ui/widgets/charts/sales_chart.dart
class SalesChart extends StatelessWidget {
  final List<double> salesData;
  
  const SalesChart({required this.salesData});
  
  @override
  Widget build(BuildContext context) {
    return LineChart(
      LineChartData(
        lineBarsData: [
          LineChartBarData(
            spots: salesData.asMap().entries.map((e) => FlSpot(e.key.toDouble(), e.value)).toList(),
          ),
        ],
      ),
    );
  }
}
```

### 9. Platform Channels (iOS/Android)
- Create platform channel services in `lib/services/platform_channels/`
- Use method channels for native communication
- Naming: `*_channel.dart`

Example:
```dart
// lib/services/platform_channels/location_channel.dart
class LocationChannel {
  static const platform = MethodChannel('com.example.foodtruck/location');
  
  Future<Map<String, double>> getCurrentLocation() async {
    try {
      final result = await platform.invokeMethod<Map>('getLocation');
      return result?.cast<String, double>() ?? {};
    } catch (e) {
      throw Exception('Failed to get location: $e');
    }
  }
}
```

### 10. Testing
- Place unit tests in `test/unit/`
- Place widget tests in `test/widget/`
- Use `flutter_test` for testing
- Naming: `*_test.dart`

Example:
```dart
// test/unit/truck_model_test.dart
void main() {
  group('Truck Model', () {
    test('creates instance with correct values', () {
      final truck = Truck(
        id: '1',
        name: 'Truck 1',
        latitude: 0.0,
        longitude: 0.0,
      );
      
      expect(truck.id, '1');
      expect(truck.name, 'Truck 1');
    });
  });
}
```

## Code Generation

Run the following commands to generate code:

```bash
# Generate freezed models
flutter pub run build_runner build

# Watch for changes
flutter pub run build_runner watch
```

## Best Practices

1. **Immutability**: Use `@freezed` for data classes to ensure immutability
2. **Type Safety**: Leverage Dart's type system; avoid `dynamic` when possible
3. **Error Handling**: Always handle exceptions in services and provide meaningful error messages
4. **Dependency Injection**: Use Provider for dependency injection to improve testability
5. **Separation of Concerns**: Keep UI, business logic, and data layers separate
6. **Naming Conventions**: Use clear, descriptive names for files, classes, and functions
7. **Documentation**: Add comments for complex logic and public APIs
8. **Performance**: Use `const` constructors for widgets to optimize rebuilds
9. **Accessibility**: Ensure all UI components are accessible (semantic labels, contrast ratios)
10. **Testing**: Aim for >80% code coverage in services and models

## Dependencies

See `pubspec.yaml` for the complete list of dependencies and their versions.

## Getting Started

1. Clone the repository
2. Run `flutter pub get` to install dependencies
3. Run `flutter pub run build_runner build` to generate code
4. Run `flutter run` to start the application

## Additional Resources

- [Flutter Documentation](https://flutter.dev/docs)
- [Provider Documentation](https://pub.dev/packages/provider)
- [GoRouter Documentation](https://pub.dev/packages/go_router)
- [Freezed Documentation](https://pub.dev/packages/freezed)
- [intl Documentation](https://pub.dev/packages/intl)
- [fl_chart Documentation](https://pub.dev/packages/fl_chart)
