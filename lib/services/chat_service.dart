// lib/services/chat_service.dart
import 'dart:io';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:uuid/uuid.dart';
import '../models/message_model.dart';
import '../models/user_model.dart';
import '../utils/constants.dart';

final chatServiceProvider = Provider<ChatService>((ref) {
  return ChatService(
    firestore: FirebaseFirestore.instance,
    storage: FirebaseStorage.instance,
  );
});

// Provider for all users (for chat list / new chat)
final allUsersProvider = StreamProvider.family<List<UserModel>, String>((ref, currentUserId) {
  return FirebaseFirestore.instance
      .collection(AppConstants.usersCollection)
      .where('uid', isNotEqualTo: currentUserId)
      .snapshots()
      .map((snapshot) => snapshot.docs
          .map((doc) => UserModel.fromDocument(doc))
          .toList()
        ..sort((a, b) => b.isOnline ? 1 : -1));
});

// Provider for messages in a chat room
final messagesProvider = StreamProvider.family<List<MessageModel>, String>((ref, chatId) {
  return FirebaseFirestore.instance
      .collection(AppConstants.chatsCollection)
      .doc(chatId)
      .collection(AppConstants.messagesSubcollection)
      .orderBy('timestamp', descending: true)
      .limit(AppConstants.messageQueryLimit)
      .snapshots()
      .map((snapshot) => snapshot.docs
          .map((doc) => MessageModel.fromDocument(doc))
          .toList());
});

// Provider for typing status
final typingStatusProvider = StreamProvider.family<Map<String, bool>, String>((ref, chatId) {
  return FirebaseFirestore.instance
      .collection(AppConstants.chatsCollection)
      .doc(chatId)
      .snapshots()
      .map((doc) {
    if (!doc.exists) return <String, bool>{};
    final data = doc.data() as Map<String, dynamic>;
    return Map<String, bool>.from(data['typingStatus'] ?? {});
  });
});

// Provider for a single user
final userProvider = StreamProvider.family<UserModel?, String>((ref, userId) {
  return FirebaseFirestore.instance
      .collection(AppConstants.usersCollection)
      .doc(userId)
      .snapshots()
      .map((doc) => doc.exists ? UserModel.fromDocument(doc) : null);
});

class ChatService {
  final FirebaseFirestore _firestore;
  final FirebaseStorage _storage;
  final _uuid = const Uuid();

  ChatService({
    required FirebaseFirestore firestore,
    required FirebaseStorage storage,
  })  : _firestore = firestore,
        _storage = storage;

  // ── Generate Chat ID ──────────────────────────────────────────────────────
  String getChatId(String userId1, String userId2) {
    final sorted = [userId1, userId2]..sort();
    return '${sorted[0]}_${sorted[1]}';
  }

  // ── Send Text Message ─────────────────────────────────────────────────────
  Future<void> sendTextMessage({
    required String chatId,
    required String senderId,
    required String text,
    bool autoDelete = false,
  }) async {
    final messageId = _uuid.v4();
    final now = DateTime.now();

    final message = MessageModel(
      id: messageId,
      senderId: senderId,
      text: text,
      type: MessageType.text,
      status: MessageStatus.sent,
      timestamp: now,
    );

    final batch = _firestore.batch();

    // Add message to subcollection
    final messageRef = _firestore
        .collection(AppConstants.chatsCollection)
        .doc(chatId)
        .collection(AppConstants.messagesSubcollection)
        .doc(messageId);
    batch.set(messageRef, message.toMap());

    // Update chat room metadata
    final chatRef = _firestore
        .collection(AppConstants.chatsCollection)
        .doc(chatId);
    batch.set(chatRef, {
      'lastMessage': {
        'text': text,
        'senderId': senderId,
        'timestamp': Timestamp.fromDate(now),
        'type': 'text',
      },
      'updatedAt': FieldValue.serverTimestamp(),
      'participants': FieldValue.arrayUnion([senderId]),
    }, SetOptions(merge: true));

    await batch.commit();

    // Schedule auto-delete if enabled
    if (autoDelete) {
      _scheduleMessageDelete(chatId, messageId);
    }
  }

  // ── Send Image Message ────────────────────────────────────────────────────
  Future<void> sendImageMessage({
    required String chatId,
    required String senderId,
    required File imageFile,
    bool autoDelete = false,
  }) async {
    final messageId = _uuid.v4();
    final now = DateTime.now();

    // Upload image to Firebase Storage
    final imageUrl = await _uploadChatImage(senderId, messageId, imageFile);

    final message = MessageModel(
      id: messageId,
      senderId: senderId,
      imageUrl: imageUrl,
      type: MessageType.image,
      status: MessageStatus.sent,
      timestamp: now,
    );

    final batch = _firestore.batch();

    final messageRef = _firestore
        .collection(AppConstants.chatsCollection)
        .doc(chatId)
        .collection(AppConstants.messagesSubcollection)
        .doc(messageId);
    batch.set(messageRef, message.toMap());

    final chatRef = _firestore
        .collection(AppConstants.chatsCollection)
        .doc(chatId);
    batch.set(chatRef, {
      'lastMessage': {
        'text': '📷 Photo',
        'senderId': senderId,
        'timestamp': Timestamp.fromDate(now),
        'type': 'image',
      },
      'updatedAt': FieldValue.serverTimestamp(),
      'participants': FieldValue.arrayUnion([senderId]),
    }, SetOptions(merge: true));

    await batch.commit();

    if (autoDelete) {
      _scheduleMessageDelete(chatId, messageId);
    }
  }

  // ── Mark Messages as Read ─────────────────────────────────────────────────
  Future<void> markMessagesAsRead({
    required String chatId,
    required String userId,
  }) async {
    // Update unread count for user to 0
    await _firestore
        .collection(AppConstants.chatsCollection)
        .doc(chatId)
        .update({'unreadCount.$userId': 0});
  }

  // ── Update Typing Status ──────────────────────────────────────────────────
  Future<void> setTypingStatus({
    required String chatId,
    required String userId,
    required bool isTyping,
  }) async {
    await _firestore
        .collection(AppConstants.chatsCollection)
        .doc(chatId)
        .set({'typingStatus': {userId: isTyping}}, SetOptions(merge: true));
  }

  // ── Delete Message ────────────────────────────────────────────────────────
  Future<void> deleteMessage({
    required String chatId,
    required String messageId,
  }) async {
    await _firestore
        .collection(AppConstants.chatsCollection)
        .doc(chatId)
        .collection(AppConstants.messagesSubcollection)
        .doc(messageId)
        .update({'isDeleted': true, 'text': null});
  }

  // ── Export Chat ───────────────────────────────────────────────────────────
  Future<List<Map<String, dynamic>>> exportChat(String chatId) async {
    final snapshot = await _firestore
        .collection(AppConstants.chatsCollection)
        .doc(chatId)
        .collection(AppConstants.messagesSubcollection)
        .orderBy('timestamp')
        .get();

    return snapshot.docs.map((doc) {
      final data = doc.data();
      return {
        'id': doc.id,
        'senderId': data['senderId'],
        'text': data['text'],
        'imageUrl': data['imageUrl'],
        'type': data['type'],
        'timestamp': (data['timestamp'] as Timestamp).toDate().toIso8601String(),
      };
    }).toList();
  }

  // ── Get User's Chats ──────────────────────────────────────────────────────
  Stream<List<Map<String, dynamic>>> getUserChats(String userId) {
    return _firestore
        .collection(AppConstants.chatsCollection)
        .where('participants', arrayContains: userId)
        .orderBy('updatedAt', descending: true)
        .snapshots()
        .map((snapshot) => snapshot.docs
            .map((doc) => {'id': doc.id, ...doc.data()})
            .toList());
  }

  // ── Private Helpers ───────────────────────────────────────────────────────
  Future<String> _uploadChatImage(
      String userId, String messageId, File file) async {
    final ref = _storage
        .ref()
        .child(AppConstants.chatImagesPath)
        .child(userId)
        .child('$messageId.jpg');
    final uploadTask = await ref.putFile(file);
    return await uploadTask.ref.getDownloadURL();
  }

  void _scheduleMessageDelete(String chatId, String messageId) {
    Future.delayed(
      const Duration(hours: 24),
      () => deleteMessage(chatId: chatId, messageId: messageId),
    );
  }
}
