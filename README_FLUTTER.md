# Food Truck App - Flutter

A Flutter application for managing food truck operations. This project demonstrates a cross-platform mobile application built with Flutter, supporting both iOS and Android platforms.

## Overview

The Food Truck App is a Flutter-based mobile application that helps food truck operators manage their business efficiently. The app provides features for tracking orders, monitoring sales, and managing operations across iOS and Android devices.

## Project Structure

```
.
├── lib/                          # Dart source code
│   ├── main.dart                 # Application entry point
│   └── app.dart                  # Main app widget and home page
├── test/                         # Test files
│   └── widget_test.dart          # Widget tests
├── ios/                          # iOS-specific code
│   ├── Runner/                   # iOS app target
│   ├── Podfile                   # CocoaPods dependencies
│   └── Flutter/                  # Flutter configuration
├── android/                      # Android-specific code
│   ├── app/                      # Android app module
│   ├── build.gradle              # Android build configuration
│   └── settings.gradle           # Android project settings
├── pubspec.yaml                  # Flutter dependencies and configuration
└── analysis_options.yaml         # Dart analysis configuration
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Flutter SDK**: Version 3.0.0 or higher
  - [Install Flutter](https://flutter.dev/docs/get-started/install)
  
- **Dart SDK**: Included with Flutter

- **iOS Development** (for iOS builds):
  - Xcode 14.3 or later
  - CocoaPods
  - iOS deployment target: 16.4 or later

- **Android Development** (for Android builds):
  - Android SDK (API level 31 or higher)
  - Android Studio or command-line tools
  - Minimum SDK version: 31

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd food_truck_app
```

### 2. Get Dependencies

```bash
flutter pub get
```

### 3. Configure Local Properties (Android)

Create or update `android/local.properties`:

```properties
sdk.dir=/path/to/android/sdk
flutter.sdk=/path/to/flutter/sdk
```

## Building and Running

### Run on iOS Simulator

```bash
flutter run -d iPhone
```

Or build for iOS simulator:

```bash
flutter build ios --simulator
```

### Run on Android Emulator

```bash
flutter run -d emulator-5554
```

Or build APK for Android:

```bash
flutter build apk
```

### Run on Physical Device

**iOS:**
```bash
flutter run -d <device-id>
```

**Android:**
```bash
flutter run -d <device-id>
```

## Development

### Code Analysis

Run Dart analysis to check for errors and warnings:

```bash
flutter analyze
```

### Running Tests

Execute the test suite:

```bash
flutter test
```

### Code Formatting

Format Dart code according to style guidelines:

```bash
dart format lib/ test/
```

## Build Configuration

### iOS Configuration

- **Minimum Deployment Target**: 16.4
- **Configuration File**: `ios/Podfile`
- **Build Settings**: `ios/Runner.xcodeproj/project.pbxproj`

### Android Configuration

- **Minimum SDK Version**: 31
- **Target SDK Version**: Latest available
- **Build Configuration**: `android/app/build.gradle`

## Platform-Specific Notes

### iOS

- The app uses Swift for native code integration
- CocoaPods manages iOS dependencies
- Ensure your development team is configured in Xcode

### Android

- The app uses Kotlin for native code integration
- Gradle manages Android dependencies
- Ensure Android SDK is properly configured

## Troubleshooting

### iOS Build Issues

If you encounter iOS build issues:

1. Clean the build:
   ```bash
   flutter clean
   cd ios && rm -rf Pods Podfile.lock && cd ..
   flutter pub get
   ```

2. Update CocoaPods:
   ```bash
   cd ios && pod repo update && pod install && cd ..
   ```

### Android Build Issues

If you encounter Android build issues:

1. Clean the build:
   ```bash
   flutter clean
   ```

2. Invalidate Android Studio cache:
   - In Android Studio: File > Invalidate Caches > Invalidate and Restart

3. Ensure Gradle is properly configured:
   ```bash
   cd android && ./gradlew clean && cd ..
   ```

## Contributing

When contributing to this project:

1. Follow Dart style guidelines
2. Run `flutter analyze` before committing
3. Write tests for new features
4. Update documentation as needed

## License

This project is licensed under the terms specified in the LICENSE file.

## Support

For issues, questions, or suggestions, please open an issue in the repository.
