// lib/models/message_model.dart
import 'package:cloud_firestore/cloud_firestore.dart';

enum MessageType { text, image }

enum MessageStatus { sending, sent, delivered, read }

class MessageModel {
  final String id;
  final String senderId;
  final String? text;
  final String? imageUrl;
  final MessageType type;
  final MessageStatus status;
  final DateTime timestamp;
  final bool isDeleted;

  MessageModel({
    required this.id,
    required this.senderId,
    this.text,
    this.imageUrl,
    required this.type,
    this.status = MessageStatus.sending,
    required this.timestamp,
    this.isDeleted = false,
  });

  bool get isImage => type == MessageType.image;
  bool get isText => type == MessageType.text;

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'senderId': senderId,
      'text': text,
      'imageUrl': imageUrl,
      'type': type.name,
      'status': status.name,
      'timestamp': Timestamp.fromDate(timestamp),
      'isDeleted': isDeleted,
    };
  }

  factory MessageModel.fromMap(Map<String, dynamic> map, String docId) {
    return MessageModel(
      id: docId,
      senderId: map['senderId'] ?? '',
      text: map['text'],
      imageUrl: map['imageUrl'],
      type: MessageType.values.firstWhere(
        (e) => e.name == (map['type'] ?? 'text'),
        orElse: () => MessageType.text,
      ),
      status: MessageStatus.values.firstWhere(
        (e) => e.name == (map['status'] ?? 'sent'),
        orElse: () => MessageStatus.sent,
      ),
      timestamp: map['timestamp'] != null
          ? (map['timestamp'] as Timestamp).toDate()
          : DateTime.now(),
      isDeleted: map['isDeleted'] ?? false,
    );
  }

  factory MessageModel.fromDocument(DocumentSnapshot doc) {
    return MessageModel.fromMap(
      doc.data() as Map<String, dynamic>,
      doc.id,
    );
  }

  MessageModel copyWith({
    String? id,
    String? senderId,
    String? text,
    String? imageUrl,
    MessageType? type,
    MessageStatus? status,
    DateTime? timestamp,
    bool? isDeleted,
  }) {
    return MessageModel(
      id: id ?? this.id,
      senderId: senderId ?? this.senderId,
      text: text ?? this.text,
      imageUrl: imageUrl ?? this.imageUrl,
      type: type ?? this.type,
      status: status ?? this.status,
      timestamp: timestamp ?? this.timestamp,
      isDeleted: isDeleted ?? this.isDeleted,
    );
  }
}

class ChatRoom {
  final String id;
  final List<String> participants;
  final MessageModel? lastMessage;
  final DateTime updatedAt;
  final Map<String, bool> typingStatus;
  final Map<String, int> unreadCount;

  ChatRoom({
    required this.id,
    required this.participants,
    this.lastMessage,
    required this.updatedAt,
    this.typingStatus = const {},
    this.unreadCount = const {},
  });

  String getChatId(String userId1, String userId2) {
    final sorted = [userId1, userId2]..sort();
    return '${sorted[0]}_${sorted[1]}';
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'participants': participants,
      'updatedAt': Timestamp.fromDate(updatedAt),
      'typingStatus': typingStatus,
      'unreadCount': unreadCount,
    };
  }

  factory ChatRoom.fromMap(Map<String, dynamic> map, String docId) {
    return ChatRoom(
      id: docId,
      participants: List<String>.from(map['participants'] ?? []),
      updatedAt: map['updatedAt'] != null
          ? (map['updatedAt'] as Timestamp).toDate()
          : DateTime.now(),
      typingStatus: Map<String, bool>.from(map['typingStatus'] ?? {}),
      unreadCount: Map<String, int>.from(map['unreadCount'] ?? {}),
    );
  }

  factory ChatRoom.fromDocument(DocumentSnapshot doc) {
    return ChatRoom.fromMap(doc.data() as Map<String, dynamic>, doc.id);
  }
}
