// lib/services/auth_service.dart
import 'dart:io';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/user_model.dart';
import '../utils/constants.dart';

// Provider for current Firebase user
final firebaseAuthProvider = Provider<FirebaseAuth>((ref) {
  return FirebaseAuth.instance;
});

// Provider for auth state changes
final authStateProvider = StreamProvider<User?>((ref) {
  return ref.watch(firebaseAuthProvider).authStateChanges();
});

// Provider for current user model
final currentUserProvider = StreamProvider<UserModel?>((ref) {
  final authState = ref.watch(authStateProvider);
  return authState.when(
    data: (user) {
      if (user == null) return Stream.value(null);
      return FirebaseFirestore.instance
          .collection(AppConstants.usersCollection)
          .doc(user.uid)
          .snapshots()
          .map((doc) => doc.exists ? UserModel.fromDocument(doc) : null);
    },
    loading: () => Stream.value(null),
    error: (_, __) => Stream.value(null),
  );
});

final authServiceProvider = Provider<AuthService>((ref) {
  return AuthService(
    auth: ref.watch(firebaseAuthProvider),
    firestore: FirebaseFirestore.instance,
    storage: FirebaseStorage.instance,
  );
});

class AuthService {
  final FirebaseAuth _auth;
  final FirebaseFirestore _firestore;
  final FirebaseStorage _storage;
  final GoogleSignIn _googleSignIn = GoogleSignIn();

  AuthService({
    required FirebaseAuth auth,
    required FirebaseFirestore firestore,
    required FirebaseStorage storage,
  })  : _auth = auth,
        _firestore = firestore,
        _storage = storage;

  User? get currentUser => _auth.currentUser;

  // ── Email / Password Sign Up ──────────────────────────────────────────────
  Future<UserCredential> signUpWithEmail({
    required String email,
    required String password,
    required String name,
    File? avatarFile,
  }) async {
    try {
      final credential = await _auth.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );

      String avatarUrl = '';
      if (avatarFile != null) {
        avatarUrl = await _uploadAvatar(credential.user!.uid, avatarFile);
      }

      await _createUserDocument(
        uid: credential.user!.uid,
        name: name,
        email: email,
        avatarUrl: avatarUrl,
      );

      await credential.user!.updateDisplayName(name);

      return credential;
    } on FirebaseAuthException catch (e) {
      throw _handleAuthException(e);
    }
  }

  // ── Email / Password Sign In ──────────────────────────────────────────────
  Future<UserCredential> signInWithEmail({
    required String email,
    required String password,
  }) async {
    try {
      final credential = await _auth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );
      await _updateOnlineStatus(credential.user!.uid, true);
      return credential;
    } on FirebaseAuthException catch (e) {
      throw _handleAuthException(e);
    }
  }

  // ── Google Sign In ────────────────────────────────────────────────────────
  Future<UserCredential?> signInWithGoogle() async {
    try {
      final GoogleSignInAccount? googleUser = await _googleSignIn.signIn();
      if (googleUser == null) return null;

      final GoogleSignInAuthentication googleAuth =
          await googleUser.authentication;
      final credential = GoogleAuthProvider.credential(
        accessToken: googleAuth.accessToken,
        idToken: googleAuth.idToken,
      );

      final userCredential = await _auth.signInWithCredential(credential);

      // Create or update user document
      final userDoc = await _firestore
          .collection(AppConstants.usersCollection)
          .doc(userCredential.user!.uid)
          .get();

      if (!userDoc.exists) {
        await _createUserDocument(
          uid: userCredential.user!.uid,
          name: userCredential.user!.displayName ?? 'LinkUp User',
          email: userCredential.user!.email ?? '',
          avatarUrl: userCredential.user!.photoURL ?? '',
        );
      } else {
        await _updateOnlineStatus(userCredential.user!.uid, true);
      }

      return userCredential;
    } catch (e) {
      throw Exception('Google sign in failed: ${e.toString()}');
    }
  }

  // ── Sign Out ──────────────────────────────────────────────────────────────
  Future<void> signOut() async {
    if (currentUser != null) {
      await _updateOnlineStatus(currentUser!.uid, false);
    }
    await _googleSignIn.signOut();
    await _auth.signOut();
  }

  // ── Password Reset ────────────────────────────────────────────────────────
  Future<void> sendPasswordResetEmail(String email) async {
    try {
      await _auth.sendPasswordResetEmail(email: email);
    } on FirebaseAuthException catch (e) {
      throw _handleAuthException(e);
    }
  }

  // ── Update Profile ────────────────────────────────────────────────────────
  Future<void> updateProfile({
    required String uid,
    String? name,
    File? avatarFile,
  }) async {
    final updates = <String, dynamic>{};

    if (name != null && name.isNotEmpty) {
      updates['name'] = name;
      await currentUser?.updateDisplayName(name);
    }

    if (avatarFile != null) {
      final avatarUrl = await _uploadAvatar(uid, avatarFile);
      updates['avatarUrl'] = avatarUrl;
    }

    if (updates.isNotEmpty) {
      await _firestore
          .collection(AppConstants.usersCollection)
          .doc(uid)
          .update(updates);
    }
  }

  // ── Private Helpers ───────────────────────────────────────────────────────
  Future<void> _createUserDocument({
    required String uid,
    required String name,
    required String email,
    String avatarUrl = '',
  }) async {
    final user = UserModel(
      uid: uid,
      name: name,
      email: email,
      avatarUrl: avatarUrl,
      isOnline: true,
      createdAt: DateTime.now(),
    );

    await _firestore
        .collection(AppConstants.usersCollection)
        .doc(uid)
        .set(user.toMap());
  }

  Future<String> _uploadAvatar(String uid, File file) async {
    final ref = _storage
        .ref()
        .child(AppConstants.avatarsPath)
        .child('$uid.jpg');
    await ref.putFile(file);
    return await ref.getDownloadURL();
  }

  Future<void> _updateOnlineStatus(String uid, bool isOnline) async {
    await _firestore
        .collection(AppConstants.usersCollection)
        .doc(uid)
        .update({
      'isOnline': isOnline,
      'lastSeen': FieldValue.serverTimestamp(),
    });
  }

  String _handleAuthException(FirebaseAuthException e) {
    switch (e.code) {
      case 'weak-password':
        return AppStrings.errorWeakPassword;
      case 'email-already-in-use':
        return 'An account already exists with that email.';
      case 'invalid-email':
        return AppStrings.errorInvalidEmail;
      case 'user-not-found':
        return 'No account found with that email.';
      case 'wrong-password':
        return 'Incorrect password. Please try again.';
      case 'too-many-requests':
        return 'Too many attempts. Please try again later.';
      default:
        return e.message ?? AppStrings.errorGeneral;
    }
  }
}
