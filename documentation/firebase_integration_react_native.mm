
# Firebase Integration in React Native

## Introduction
This document explains how Firebase services were integrated into a React Native application, specifically using Analytics, App Core, and Authentication modules.

## Prerequisites
- React Native environment already set up
- Node.js and npm installed
- Android Studio and/or Xcode for platform-specific development
- A Firebase project created in [Firebase Console](https://console.firebase.google.com/)

## Packages Installed
The following Firebase packages were installed:

```bash
npm install @react-native-firebase/analytics
npm install @react-native-firebase/app
npm install @react-native-firebase/auth
```

---

## Android Configuration

To allow Firebase to use the credentials on Android, the **Google Services** plugin must be configured properly.

### 1. Add Google Services Classpath

In the project-level `android/build.gradle` file, inside the `buildscript` block, add the Google Services dependency:

```gradle
buildscript {
    dependencies {
        // ... other dependencies
        classpath 'com.google.gms:google-services:4.4.2' // <-- Add this line
    }
}
```

### 2. Apply Google Services Plugin

In the app-level `android/app/build.gradle` file, apply the plugin at the bottom of the file:

```gradle
apply plugin: 'com.android.application'
apply plugin: 'com.google.gms.google-services' // <-- Add this line
```

This ensures that the Firebase configuration (`google-services.json`) is processed correctly.

### 3. Add Firebase BoM (Bill of Materials)

In the app-level `android/app/build.gradle`, inside the `dependencies` block, add the Firebase BoM to manage Firebase library versions:

```gradle
dependencies {
    // ... other dependencies
    implementation platform('com.google.firebase:firebase-bom:33.1.2')
    
    // Add any Firebase dependencies you use without specifying versions, e.g.:
    // implementation 'com.google.firebase:firebase-analytics'
    // implementation 'com.google.firebase:firebase-auth'
}
```

The **Firebase BoM** ensures all Firebase libraries you use stay compatible with each other automatically.

### 4. Add `google-services.json` to Your Project

- Download the `google-services.json` file from your Firebase Console (Project Settings → General → Your Apps → Android App → Download `google-services.json`).
- Move the downloaded file into the `android/app/` folder.
- Open the project in Android Studio and sync the gradle files.

### 5. Modify `Podfile` for Static Linking

To ensure compatibility with Firebase libraries, add the following lines to your `Podfile` inside the `ios/` directory:

- Enable static framework linking by adding:

```ruby
use_frameworks! :linkage => :static
```

- Set the environment variable to link React Native Firebase as a static framework:

```ruby
$RNFirebaseAsStaticFramework = true
```

This configuration helps in resolving some dependency issues that can arise with dynamic frameworks in certain versions of React Native.

---

## iOS Configuration

To set up Firebase for iOS:

### 1. Install CocoaPods Dependencies

After installing the Firebase packages, navigate to the `ios/` directory of your project and install the required pods:

```bash
cd ios
pod install
cd ..
```

This will ensure all Firebase native modules are properly linked to your Xcode project.

### 2. Open iOS Project in Xcode

After installing the pods, open the iOS project using Xcode:

```bash
xed .
```

This command opens the iOS project (`.xcworkspace` file) in Xcode, which is necessary for configuring Firebase settings and managing iOS-specific files.

### 3. Add Firebase Initialization in AppDelegate

In the `AppDelegate.swift` file (found inside the `ios/` folder), initialize Firebase by following these steps:

- Import `FirebaseCore` at the top:

```swift
import FirebaseCore
```

- Inside the `application(_:didFinishLaunchingWithOptions:)` method, configure Firebase:

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    FirebaseApp.configure()
    return true
}
```

- After adding, **hold Command** and **click on `FirebaseApp`** to verify that it navigates to the Firebase SDK reference — this ensures the SDK is properly linked.

### 4. Add `GoogleService-Info.plist` to Xcode

- Move the `GoogleService-Info.plist` file into the `ios/` folder.
- Open your project in Xcode.
- From the Xcode project navigator, **right-click and choose "Add Files to [Your Project]"**.
- Select the `GoogleService-Info.plist` file and ensure that it is added to your Xcode project.

This step ensures that the Firebase configuration is linked correctly for iOS.

### 5. Modify `Podfile` for Static Linking

To ensure compatibility with Firebase libraries, add the following lines to your `Podfile` inside the `ios/` directory:

- Enable static framework linking by adding:

```ruby
use_frameworks! :linkage => :static
```

- Set the environment variable to link React Native Firebase as a static framework:

```ruby
$RNFirebaseAsStaticFramework = true
```

This configuration helps in resolving some dependency issues that can arise with dynamic frameworks in certain versions of React Native.

### 6. Final Step: Install Pods and Run the Project

After making all the necessary changes, perform the final steps:

- Run the following command in the `ios/` directory to install the necessary pods:

```bash
cd ios
pod install
cd ..
```

- Now, run the project on your desired platform (Android or iOS):

```bash
npx react-native run-android   # For Android
npx react-native run-ios       # For iOS
```

This will build and run the project, and you should now be able to test Firebase functionalities like Analytics and Authentication in your app.

---
