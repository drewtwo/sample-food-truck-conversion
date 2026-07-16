# Food Truck App

A Flutter application for managing food truck operations.

## Project Structure

This project follows Flutter best practices and idioms for code organization:

```
food_truck_app/
├── lib/
│   ├── main.dart              # Application entry point
│   ├── ui/                    # UI screens and widgets
│   ├── models/                # Data models and entities
│   ├── stores/                # State management (Provider, Riverpod, etc.)
│   ├── services/              # Business logic and API services
│   └── constants/             # Application constants and configuration
├── android/                   # Android platform-specific code
├── ios/                       # iOS platform-specific code
├── test/                      # Unit and widget tests
├── pubspec.yaml               # Dart package dependencies
└── README.md                  # This file
```

## Directory Conventions

### `lib/ui/`
Contains all UI-related code:
- Screens (full-page widgets)
- Reusable widgets and components
- UI-specific state management

**Example structure:**
```
ui/
├── screens/
│   ├── home_screen.dart
│   └── menu_screen.dart
└── widgets/
    ├── custom_button.dart
    └── menu_item_card.dart
```

### `lib/models/`
Contains data models and entities:
- Data classes representing API responses
- Domain models
- Enums and constants related to data

**Example structure:**
```
models/
├── food_item.dart
├── order.dart
└── user.dart
```

### `lib/stores/`
Contains state management logic:
- Provider classes for state management
- ChangeNotifier implementations
- Riverpod providers (if using Riverpod)

**Example structure:**
```
stores/
├── menu_store.dart
├── order_store.dart
└── user_store.dart
```

### `lib/services/`
Contains business logic and external service integrations:
- API clients and HTTP services
- Database operations
- Authentication services
- Utility services

**Example structure:**
```
services/
├── api_service.dart
├── auth_service.dart
└── database_service.dart
```

### `lib/constants/`
Contains application-wide constants:
- API endpoints
- String constants
- Theme colors and dimensions
- Configuration values

**Example structure:**
```
constants/
├── api_constants.dart
├── app_colors.dart
├── app_strings.dart
└── app_dimensions.dart
```

## Dependencies

Key dependencies included in `pubspec.yaml`:

- **flutter**: Core Flutter framework
- **provider**: State management solution
- **http**: HTTP client for API calls
- **intl**: Internationalization and localization
- **cupertino_icons**: iOS-style icons

## Getting Started

### Prerequisites
- Flutter SDK (3.0.0 or higher)
- Dart SDK (included with Flutter)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd food_truck_app
```

2. Install dependencies:
```bash
flutter pub get
```

3. Run the app:
```bash
flutter run
```

### Running Tests

```bash
flutter test
```

## Development Conventions

### Naming Conventions
- **Files**: Use snake_case (e.g., `home_screen.dart`)
- **Classes**: Use PascalCase (e.g., `HomeScreen`)
- **Variables/Functions**: Use camelCase (e.g., `getUserData()`)
- **Constants**: Use camelCase (e.g., `const apiBaseUrl = '...'`)

### Code Style
- Follow [Dart Style Guide](https://dart.dev/guides/language/effective-dart/style)
- Use `flutter analyze` to check code quality
- Format code with `flutter format`

### State Management
- Use Provider for simple to moderate state management
- Keep state logic in `stores/` directory
- Separate UI logic from business logic

### API Integration
- All API calls should be in `services/` directory
- Use models to represent API responses
- Handle errors gracefully with try-catch blocks

## Building for Production

### Android
```bash
flutter build apk
```

### iOS
```bash
flutter build ios
```

## Contributing

1. Create a feature branch from `main`
2. Follow the project structure and naming conventions
3. Write tests for new features
4. Submit a pull request with a clear description

## License

This project is licensed under the MIT License - see the LICENSE file for details.
