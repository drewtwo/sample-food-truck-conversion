#!/bin/bash
# Flutter Project Build and Verification Commands
# This script documents all commands needed to verify and build the Flutter project

# ============================================================================
# SETUP AND VERIFICATION COMMANDS
# ============================================================================

# 1. Install Flutter Dependencies
echo "Step 1: Installing Flutter dependencies..."
flutter pub get

# 2. Verify Flutter Installation
echo "Step 2: Verifying Flutter installation..."
flutter doctor

# 3. Analyze Dart Code
echo "Step 3: Analyzing Dart code..."
flutter analyze

# ============================================================================
# iOS BUILD COMMANDS
# ============================================================================

# 4. Build iOS for Simulator
echo "Step 4: Building iOS for simulator..."
flutter build ios --simulator

# 5. Run on iOS Simulator
echo "Step 5: Running on iOS simulator..."
flutter run -d iPhone

# ============================================================================
# ANDROID BUILD COMMANDS
# ============================================================================

# 6. Build Android APK
echo "Step 6: Building Android APK..."
flutter build apk

# 7. Build Android App Bundle
echo "Step 7: Building Android App Bundle..."
flutter build appbundle

# 8. Run on Android Emulator
echo "Step 8: Running on Android emulator..."
flutter run -d emulator-5554

# ============================================================================
# TESTING COMMANDS
# ============================================================================

# 9. Run Tests
echo "Step 9: Running tests..."
flutter test

# 10. Run Tests with Coverage
echo "Step 10: Running tests with coverage..."
flutter test --coverage

# ============================================================================
# CODE QUALITY COMMANDS
# ============================================================================

# 11. Format Dart Code
echo "Step 11: Formatting Dart code..."
dart format lib/ test/

# 12. Check Code Formatting
echo "Step 12: Checking code formatting..."
dart format --set-exit-if-changed lib/ test/

# ============================================================================
# CLEAN AND REBUILD COMMANDS
# ============================================================================

# 13. Clean Build
echo "Step 13: Cleaning build..."
flutter clean

# 14. Clean iOS Build
echo "Step 14: Cleaning iOS build..."
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..

# 15. Clean Android Build
echo "Step 15: Cleaning Android build..."
cd android
./gradlew clean
cd ..

# ============================================================================
# VERIFICATION COMMANDS
# ============================================================================

# 16. Verify iOS Configuration
echo "Step 16: Verifying iOS configuration..."
grep -r "IPHONEOS_DEPLOYMENT_TARGET" ios/
grep "platform :ios" ios/Podfile

# 17. Verify Android Configuration
echo "Step 17: Verifying Android configuration..."
grep "minSdkVersion" android/app/build.gradle
grep "targetSdkVersion" android/app/build.gradle

# 18. Verify Flutter Configuration
echo "Step 18: Verifying Flutter configuration..."
grep "sdk:" pubspec.yaml
grep "uses-material-design" pubspec.yaml

# ============================================================================
# DEVICE/EMULATOR COMMANDS
# ============================================================================

# 19. List Available Devices
echo "Step 19: Listing available devices..."
flutter devices

# 20. Get Device IDs
echo "Step 20: Getting device IDs..."
adb devices  # For Android
xcrun simctl list devices  # For iOS

# ============================================================================
# RELEASE BUILD COMMANDS
# ============================================================================

# 21. Build iOS Release
echo "Step 21: Building iOS release..."
flutter build ios --release

# 22. Build Android Release
echo "Step 22: Building Android release..."
flutter build apk --release

# 23. Build Android App Bundle for Play Store
echo "Step 23: Building Android App Bundle..."
flutter build appbundle --release

# ============================================================================
# TROUBLESHOOTING COMMANDS
# ============================================================================

# 24. Full Clean and Rebuild
echo "Step 24: Full clean and rebuild..."
flutter clean
rm -rf pubspec.lock
flutter pub get
flutter pub upgrade

# 25. iOS Troubleshooting
echo "Step 25: iOS troubleshooting..."
cd ios
rm -rf Pods Podfile.lock .symlinks/ Flutter/Flutter.framework Flutter/Flutter.podspec
pod repo update
pod install
cd ..

# 26. Android Troubleshooting
echo "Step 26: Android troubleshooting..."
cd android
./gradlew clean
./gradlew build
cd ..

# ============================================================================
# CONFIGURATION VERIFICATION
# ============================================================================

# 27. Check iOS Minimum Deployment Target
echo "Step 27: Checking iOS minimum deployment target..."
echo "Expected: 16.4"
grep "IPHONEOS_DEPLOYMENT_TARGET" ios/Runner.xcodeproj/project.pbxproj | head -1

# 28. Check Android Minimum SDK Version
echo "Step 28: Checking Android minimum SDK version..."
echo "Expected: 31"
grep "minSdkVersion" android/app/build.gradle

# 29. Check Flutter Version Requirements
echo "Step 29: Checking Flutter version requirements..."
echo "Expected: >=3.0.0 <4.0.0"
grep "sdk:" pubspec.yaml

# ============================================================================
# QUICK START COMMANDS
# ============================================================================

# Quick Start: Setup and Run on iOS
echo "Quick Start: Setup and run on iOS..."
flutter pub get
flutter run -d iPhone

# Quick Start: Setup and Run on Android
echo "Quick Start: Setup and run on Android..."
flutter pub get
flutter run -d emulator-5554

# Quick Start: Build Everything
echo "Quick Start: Build everything..."
flutter pub get
flutter build ios --simulator
flutter build apk
flutter build appbundle

# ============================================================================
# DOCUMENTATION
# ============================================================================

# For more information, see:
# - README_FLUTTER.md - Project overview and setup
# - SETUP_GUIDE.md - Detailed setup instructions
# - BUILD_CONFIG.md - Build configuration reference
# - PROJECT_INIT.md - Complete file list
# - VERIFICATION_REPORT.md - Verification results

# ============================================================================
# NOTES
# ============================================================================

# iOS Configuration:
# - Minimum Deployment Target: 16.4
# - Build System: Xcode with CocoaPods
# - Language: Swift

# Android Configuration:
# - Minimum SDK Version: 31
# - Build System: Gradle 7.6.1
# - Language: Kotlin

# Flutter Configuration:
# - Minimum Version: 3.0.0
# - Dart Version: 3.0.0+
# - Material Design: Enabled

# ============================================================================
