# Flutter Project Setup Guide

## Project Initialization Complete

This Flutter project has been initialized with support for iOS and Android platforms. The project structure is configured with the following specifications:

### Platform Configuration

#### iOS
- **Minimum Deployment Target**: 16.4
- **Configuration Files**:
  - `ios/Podfile` - CocoaPods dependency management
  - `ios/Runner.xcodeproj/project.pbxproj` - Xcode project configuration
  - `ios/Flutter/Generated.xcconfig` - Flutter build configuration
  - `ios/Runner/Info.plist` - App information property list

#### Android
- **Minimum SDK Version**: 31
- **Target SDK Version**: Latest available
- **Configuration Files**:
  - `android/app/build.gradle` - App-level build configuration
  - `android/build.gradle` - Project-level build configuration
  - `android/settings.gradle` - Gradle settings
  - `android/gradle.properties` - Gradle properties

### Project Structure

```
food_truck_app/
├── lib/
│   ├── main.dart              # Application entry point
│   └── app.dart               # Main app widget
├── test/
│   └── widget_test.dart       # Widget tests
├── ios/
│   ├── Runner/                # iOS app target
│   ├── Podfile                # CocoaPods configuration
│   └── Flutter/               # Flutter iOS configuration
├── android/
│   ├── app/                   # Android app module
│   ├── build.gradle           # Android build configuration
│   └── settings.gradle        # Android project settings
├── web/
│   └── index.html             # Web entry point (reference only)
├── pubspec.yaml               # Flutter dependencies
├── analysis_options.yaml      # Dart analysis configuration
├── .gitignore                 # Git ignore patterns
└── .metadata                  # Flutter project metadata
```

## Next Steps

### 1. Install Flutter Dependencies

```bash
flutter pub get
```

### 2. Verify Installation

```bash
flutter doctor
```

This command will check your environment and display a report of the status of your Flutter installation.

### 3. Configure Android (if building for Android)

Update `android/local.properties` with your Android SDK path:

```properties
sdk.dir=/path/to/android/sdk
flutter.sdk=/path/to/flutter/sdk
```

### 4. Build and Run

**iOS Simulator:**
```bash
flutter run -d iPhone
```

**Android Emulator:**
```bash
flutter run -d emulator-5554
```

## Build Commands

### Development Build

```bash
# iOS
flutter build ios --simulator

# Android
flutter build apk
```

### Release Build

```bash
# iOS
flutter build ios --release

# Android
flutter build appbundle
```

### Code Analysis

```bash
flutter analyze
```

### Run Tests

```bash
flutter test
```

## Important Notes

- **macOS Support**: This project is configured for iOS and Android only. macOS support has been excluded.
- **Web Support**: Web support is not configured for this project.
- **Minimum Requirements**:
  - iOS: 16.4 or later
  - Android: API level 31 or later
  - Flutter: 3.0.0 or later

## Troubleshooting

### Clean Build

If you encounter build issues, perform a clean build:

```bash
flutter clean
flutter pub get
```

### iOS-Specific Issues

```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
flutter pub get
```

### Android-Specific Issues

```bash
cd android
./gradlew clean
cd ..
flutter clean
flutter pub get
```

## Documentation

- [Flutter Documentation](https://flutter.dev/docs)
- [Dart Documentation](https://dart.dev/guides)
- [iOS Development Guide](https://flutter.dev/docs/development/ios-project-migration)
- [Android Development Guide](https://flutter.dev/docs/development/android-project-migration)

## Support

For additional help, refer to the main README_FLUTTER.md file or visit the Flutter documentation website.
