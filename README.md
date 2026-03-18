# 💬 LinkUp — Flutter Chat App

> **Connect. Chat. Vibe.**  
> A modern, feature-rich real-time chat application built with Flutter & Firebase.

---

## ✨ Features

| Feature | Status |
|---------|--------|
| Email/Password Authentication | ✅ |
| Google Sign-In | ✅ |
| Real-time Messaging (Firestore) | ✅ |
| Text & Image Messages | ✅ |
| Typing Indicators | ✅ |
| Message Read Receipts | ✅ |
| Online/Offline Status | ✅ |
| Chat Bubble Animations | ✅ |
| Auto-scroll on New Message | ✅ |
| 24-Hour Auto-Delete | ✅ |
| Export Chat (JSON) | ✅ |
| Dark Mode Toggle | ✅ |
| Profile Customization | ✅ |
| User Search | ✅ |
| Message Delete | ✅ |
| Animated Splash Screen | ✅ |

---

## 📁 Project Structure

```
lib/
├── main.dart                    # App entry, Firebase init, routing
├── screens/
│   ├── login_screen.dart        # Sign in with email or Google
│   ├── register_screen.dart     # Create account with avatar
│   ├── chat_list_screen.dart    # Chat list + People tabs + Profile
│   └── chat_room_screen.dart    # Real-time chat UI
├── widgets/
│   ├── chat_bubble.dart         # Animated message bubbles + date separators
│   ├── message_input.dart       # Text input + image picker + send button
│   └── typing_indicator.dart    # Bouncing dots animation
├── models/
│   ├── user_model.dart          # User data model
│   └── message_model.dart       # Message + ChatRoom data models
├── services/
│   ├── auth_service.dart        # Firebase Auth + user profile management
│   └── chat_service.dart        # Firestore messaging + image upload
└── utils/
    ├── constants.dart           # App-wide constants & strings
    └── theme.dart               # Light/Dark theme + AppColors
```

---

## 🚀 Getting Started

### Prerequisites
- Flutter SDK 3.0+
- Dart 3.0+
- Firebase account
- Android Studio / VS Code

### 1. Clone & Install

```bash
# Install dependencies
flutter pub get
```

### 2. Firebase Setup

#### Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project named **LinkUp**
3. Enable **Google Analytics** (optional)

#### Configure Firebase for Flutter
```bash
# Install FlutterFire CLI
dart pub global activate flutterfire_cli

# Configure Firebase (run in project root)
flutterfire configure --project=YOUR_PROJECT_ID
```

This generates `lib/firebase_options.dart` automatically.

#### Enable Authentication
1. Firebase Console → **Authentication** → **Sign-in method**
2. Enable **Email/Password**
3. Enable **Google** (add SHA-1 fingerprint for Android)

#### Create Firestore Database
1. Firebase Console → **Firestore Database** → **Create database**
2. Start in **test mode** (apply rules below later)
3. Choose your preferred region

#### Enable Firebase Storage
1. Firebase Console → **Storage** → **Get started**
2. Start in test mode initially

### 3. Apply Security Rules

**Firestore** → Rules tab → paste contents of `firestore.rules`

**Storage** → Rules tab → paste contents of `storage.rules`

### 4. Update `main.dart`

After running `flutterfire configure`, update the import:

```dart
import 'firebase_options.dart';

// In main():
await Firebase.initializeApp(
  options: DefaultFirebaseOptions.currentPlatform,
);
```

### 5. Android Setup

In `android/app/build.gradle`:
```gradle
android {
    compileSdkVersion 34
    defaultConfig {
        minSdkVersion 21   // Required for Firebase
        targetSdkVersion 34
    }
}
```

Add to `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.CAMERA"/>
```

### 6. iOS Setup

In `ios/Runner/Info.plist`, add:
```xml
<key>NSCameraUsageDescription</key>
<string>LinkUp needs camera access to send photos</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>LinkUp needs photo library access to send images</string>
```

### 7. Run the App

```bash
flutter run
```

---

## 🏗 Firestore Data Structure

```
users/
  {userId}/
    uid: string
    name: string
    email: string
    avatarUrl: string
    isOnline: boolean
    lastSeen: timestamp
    createdAt: timestamp

chats/
  {chatId}/          # chatId = "uid1_uid2" (sorted)
    participants: string[]
    lastMessage: {
      text: string
      senderId: string
      timestamp: timestamp
      type: string
    }
    updatedAt: timestamp
    typingStatus: { userId: boolean }
    unreadCount: { userId: number }

    messages/
      {messageId}/
        id: string
        senderId: string
        text: string | null
        imageUrl: string | null
        type: "text" | "image"
        status: "sending" | "sent" | "delivered" | "read"
        timestamp: timestamp
        isDeleted: boolean
```

---

## 🎨 Design System

### Colors
| Name | Hex | Usage |
|------|-----|-------|
| Pink | `#FFC0CB` | Secondary, avatars |
| Hot Pink | `#FF69B4` | Primary, CTAs |
| Deep Pink | `#E91E8C` | Accents |
| White | `#FFFFFF` | Backgrounds |
| Light Grey | `#F8F8F8` | Input fields |

### Typography
- **Display/Headings**: Montserrat (Bold, Semi-bold)
- **Body/UI**: Poppins (Regular, Medium, Semi-bold)

---

## 📦 Key Packages

| Package | Version | Purpose |
|---------|---------|---------|
| `firebase_auth` | ^4.16 | Authentication |
| `cloud_firestore` | ^4.14 | Real-time database |
| `firebase_storage` | ^11.6 | Image storage |
| `flutter_riverpod` | ^2.4.9 | State management |
| `flutter_animate` | ^4.5 | Smooth animations |
| `cached_network_image` | ^3.3 | Image caching |
| `image_picker` | ^1.0.7 | Camera/gallery |
| `google_fonts` | ^6.1 | Poppins + Montserrat |
| `google_sign_in` | ^6.2 | Google OAuth |
| `intl` | ^0.19 | Date formatting |
| `uuid` | ^4.3 | Message IDs |

---

## 🔧 State Management

The app uses **Riverpod** for state management:

- `authStateProvider` — Firebase auth state stream
- `currentUserProvider` — Current user's Firestore document
- `allUsersProvider` — All other users for chat selection
- `messagesProvider` — Real-time messages for a chat room
- `typingStatusProvider` — Live typing indicators
- `userProvider` — Individual user data stream
- `themeProvider` — Dark/light mode state

---

## 🛡 Security

- Firestore rules ensure users can only read/write their own data
- Storage rules enforce 5MB max file size + image-only uploads
- Chat participants validated via chatId parsing
- Messages can only be sent by authenticated users
- Soft-delete only (no hard deletion of messages)

---

## 🚧 Known Limitations & Future Improvements

- [ ] Push notifications (FCM)
- [ ] Voice messages
- [ ] Group chats
- [ ] Message reactions (emoji)
- [ ] End-to-end encryption
- [ ] Video calling (WebRTC)
- [ ] Message forwarding
- [ ] Pinned messages
- [ ] Stories/Status

---

## 📄 License

MIT License — feel free to use and modify for personal or commercial projects.

---

*Built with ❤️ and Flutter*
