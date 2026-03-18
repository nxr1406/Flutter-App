// lib/utils/constants.dart

class AppConstants {
  // App Info
  static const String appName = 'LinkUp';
  static const String appTagline = 'Connect. Chat. Vibe.';

  // Firebase Collections
  static const String usersCollection = 'users';
  static const String chatsCollection = 'chats';
  static const String messagesSubcollection = 'messages';

  // Firebase Storage
  static const String chatImagesPath = 'chat_images';
  static const String avatarsPath = 'avatars';

  // Shared Prefs Keys
  static const String themeKey = 'isDarkMode';
  static const String userIdKey = 'userId';
  static const String autoDeleteKey = 'autoDeleteMessages';

  // Message Limits
  static const int messageQueryLimit = 50;
  static const int maxImageSizeBytes = 5 * 1024 * 1024; // 5MB

  // Animation Durations
  static const Duration shortAnimation = Duration(milliseconds: 200);
  static const Duration mediumAnimation = Duration(milliseconds: 400);
  static const Duration longAnimation = Duration(milliseconds: 600);

  // Auto-delete (24 hours in milliseconds)
  static const int autoDeleteDuration = 24 * 60 * 60 * 1000;

  // Typing indicator timeout
  static const Duration typingTimeout = Duration(seconds: 3);

  // Avatar placeholder
  static const String defaultAvatarUrl = 'https://ui-avatars.com/api/?background=FF69B4&color=fff&size=200';
}

class AppStrings {
  // Auth
  static const String signIn = 'Sign In';
  static const String signUp = 'Create Account';
  static const String signOut = 'Sign Out';
  static const String email = 'Email';
  static const String password = 'Password';
  static const String confirmPassword = 'Confirm Password';
  static const String fullName = 'Full Name';
  static const String forgotPassword = 'Forgot Password?';
  static const String continueWithGoogle = 'Continue with Google';
  static const String alreadyHaveAccount = 'Already have an account? ';
  static const String noAccount = "Don't have an account? ";

  // Chat
  static const String typeMessage = 'Type a message...';
  static const String chats = 'Chats';
  static const String newChat = 'New Chat';
  static const String online = 'Online';
  static const String offline = 'Offline';
  static const String typing = 'typing...';
  static const String send = 'Send';
  static const String today = 'Today';
  static const String yesterday = 'Yesterday';

  // Profile
  static const String editProfile = 'Edit Profile';
  static const String changeAvatar = 'Change Avatar';
  static const String saveChanges = 'Save Changes';
  static const String profile = 'Profile';

  // Settings
  static const String settings = 'Settings';
  static const String darkMode = 'Dark Mode';
  static const String autoDelete = 'Auto-Delete Messages (24h)';
  static const String exportChat = 'Export Chat';

  // Errors
  static const String errorGeneral = 'Something went wrong. Please try again.';
  static const String errorInvalidEmail = 'Please enter a valid email address.';
  static const String errorWeakPassword = 'Password must be at least 6 characters.';
  static const String errorPasswordMismatch = 'Passwords do not match.';
  static const String errorEmptyName = 'Please enter your name.';

  // Success
  static const String successProfileUpdated = 'Profile updated successfully!';
  static const String successChatExported = 'Chat exported successfully!';
}
