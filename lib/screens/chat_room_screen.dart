// lib/screens/chat_room_screen.dart
import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../services/chat_service.dart';
import '../services/auth_service.dart';
import '../models/message_model.dart';
import '../models/user_model.dart';
import '../widgets/chat_bubble.dart';
import '../widgets/message_input.dart';
import '../widgets/typing_indicator.dart';
import '../utils/theme.dart';
import '../utils/constants.dart';

class ChatRoomScreen extends ConsumerStatefulWidget {
  final String chatId;
  final UserModel otherUser;
  final UserModel currentUser;

  const ChatRoomScreen({
    super.key,
    required this.chatId,
    required this.otherUser,
    required this.currentUser,
  });

  @override
  ConsumerState<ChatRoomScreen> createState() => _ChatRoomScreenState();
}

class _ChatRoomScreenState extends ConsumerState<ChatRoomScreen> {
  final ScrollController _scrollController = ScrollController();
  bool _autoDelete = false;

  @override
  void initState() {
    super.initState();
    // Mark messages as read when entering
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(chatServiceProvider).markMessagesAsRead(
            chatId: widget.chatId,
            userId: widget.currentUser.uid,
          );
    });
  }

  @override
  void dispose() {
    _scrollController.dispose();
    // Clear typing status on exit
    ref.read(chatServiceProvider).setTypingStatus(
          chatId: widget.chatId,
          userId: widget.currentUser.uid,
          isTyping: false,
        );
    super.dispose();
  }

  void _scrollToBottom({bool animated = true}) {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        if (animated) {
          _scrollController.animateTo(
            0,
            duration: const Duration(milliseconds: 300),
            curve: Curves.easeOut,
          );
        } else {
          _scrollController.jumpTo(0);
        }
      }
    });
  }

  Future<void> _sendText(String text) async {
    await ref.read(chatServiceProvider).sendTextMessage(
          chatId: widget.chatId,
          senderId: widget.currentUser.uid,
          text: text,
          autoDelete: _autoDelete,
        );
    _scrollToBottom();
  }

  Future<void> _sendImage(File file) async {
    await ref.read(chatServiceProvider).sendImageMessage(
          chatId: widget.chatId,
          senderId: widget.currentUser.uid,
          imageFile: file,
          autoDelete: _autoDelete,
        );
    _scrollToBottom();
  }

  void _onTypingStart() {
    ref.read(chatServiceProvider).setTypingStatus(
          chatId: widget.chatId,
          userId: widget.currentUser.uid,
          isTyping: true,
        );
  }

  void _onTypingStop() {
    ref.read(chatServiceProvider).setTypingStatus(
          chatId: widget.chatId,
          userId: widget.currentUser.uid,
          isTyping: false,
        );
  }

  void _showMessageOptions(BuildContext context, MessageModel message) {
    if (message.senderId != widget.currentUser.uid) return;
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (_) => Container(
        margin: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: Theme.of(context).cardColor,
          borderRadius: BorderRadius.circular(24),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const SizedBox(height: 12),
            Container(
              width: 40,
              height: 4,
              decoration: BoxDecoration(
                color: AppColors.textLight,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            const SizedBox(height: 16),
            ListTile(
              leading: const Icon(Icons.delete_outline_rounded, color: Colors.red),
              title: const Text('Delete message'),
              onTap: () {
                Navigator.pop(context);
                ref.read(chatServiceProvider).deleteMessage(
                      chatId: widget.chatId,
                      messageId: message.id,
                    );
              },
            ),
            const SizedBox(height: 8),
          ],
        ),
      ),
    );
  }

  Future<void> _exportChat() async {
    try {
      final messages = await ref.read(chatServiceProvider).exportChat(widget.chatId);
      final json = jsonEncode(messages);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Exported ${messages.length} messages'),
            backgroundColor: AppColors.hotPink,
            action: SnackBarAction(
              label: 'View',
              textColor: Colors.white,
              onPressed: () => _showExportedData(json),
            ),
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Export failed: $e')),
        );
      }
    }
  }

  void _showExportedData(String json) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: const Text('Exported Chat'),
        content: SingleChildScrollView(
          child: SelectableText(
            json,
            style: const TextStyle(fontFamily: 'monospace', fontSize: 11),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Close'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final messagesAsync = ref.watch(messagesProvider(widget.chatId));
    final typingAsync = ref.watch(typingStatusProvider(widget.chatId));
    final otherUserAsync = ref.watch(userProvider(widget.otherUser.uid));
    final isDark = Theme.of(context).brightness == Brightness.dark;

    // Get the latest online status
    final otherUser = otherUserAsync.when(
      data: (u) => u ?? widget.otherUser,
      loading: () => widget.otherUser,
      error: (_, __) => widget.otherUser,
    );

    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.background,
      appBar: _buildAppBar(context, otherUser, isDark),
      body: Column(
        children: [
          // Messages list
          Expanded(
            child: messagesAsync.when(
              data: (messages) {
                if (messages.isEmpty) {
                  return _buildEmptyChat(context);
                }
                return _buildMessagesList(context, messages);
              },
              loading: () => const Center(
                child: CircularProgressIndicator(
                  valueColor: AlwaysStoppedAnimation(AppColors.hotPink),
                  strokeWidth: 2,
                ),
              ),
              error: (e, _) => Center(child: Text('Error: $e')),
            ),
          ),

          // Typing indicator
          typingAsync.when(
            data: (typingMap) {
              final otherTyping =
                  typingMap[widget.otherUser.uid] ?? false;
              return otherTyping
                  ? TypingIndicator(userName: otherUser.name)
                  : const SizedBox.shrink();
            },
            loading: () => const SizedBox.shrink(),
            error: (_, __) => const SizedBox.shrink(),
          ),

          // Message input
          MessageInput(
            onSendText: _sendText,
            onSendImage: _sendImage,
            onTypingStart: _onTypingStart,
            onTypingStop: _onTypingStop,
          ),
        ],
      ),
    );
  }

  PreferredSizeWidget _buildAppBar(
      BuildContext context, UserModel otherUser, bool isDark) {
    return AppBar(
      backgroundColor: isDark ? AppColors.darkSurface : AppColors.white,
      elevation: 0,
      leading: IconButton(
        icon: const Icon(Icons.arrow_back_ios_rounded),
        onPressed: () => Navigator.pop(context),
      ),
      title: Row(
        children: [
          Stack(
            children: [
              CircleAvatar(
                radius: 20,
                backgroundColor: AppColors.pink,
                backgroundImage: otherUser.avatarUrl.isNotEmpty
                    ? NetworkImage(otherUser.avatarUrl)
                    : null,
                child: otherUser.avatarUrl.isEmpty
                    ? Text(
                        otherUser.name[0].toUpperCase(),
                        style: const TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                        ),
                      )
                    : null,
              ),
              if (otherUser.isOnline)
                Positioned(
                  right: 0,
                  bottom: 0,
                  child: Container(
                    width: 10,
                    height: 10,
                    decoration: BoxDecoration(
                      color: AppColors.onlineGreen,
                      shape: BoxShape.circle,
                      border: Border.all(
                        color: isDark ? AppColors.darkSurface : AppColors.white,
                        width: 2,
                      ),
                    ),
                  ),
                ),
            ],
          ),
          const SizedBox(width: 10),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                otherUser.name,
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontSize: 15,
                    ),
              ),
              Text(
                otherUser.isOnline ? AppStrings.online : 'Offline',
                style: TextStyle(
                  fontSize: 11,
                  color: otherUser.isOnline
                      ? AppColors.onlineGreen
                      : AppColors.textLight,
                ),
              ),
            ],
          ),
        ],
      ),
      actions: [
        PopupMenuButton<String>(
          icon: const Icon(Icons.more_vert_rounded),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          onSelected: (val) {
            switch (val) {
              case 'autoDelete':
                setState(() => _autoDelete = !_autoDelete);
                ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                  content: Text(
                    _autoDelete
                        ? '⏰ Auto-delete enabled (24h)'
                        : 'Auto-delete disabled',
                  ),
                  backgroundColor: AppColors.hotPink,
                ));
                break;
              case 'export':
                _exportChat();
                break;
            }
          },
          itemBuilder: (_) => [
            PopupMenuItem(
              value: 'autoDelete',
              child: Row(
                children: [
                  Icon(
                    _autoDelete
                        ? Icons.timer_off_outlined
                        : Icons.timer_outlined,
                    color: AppColors.hotPink,
                    size: 20,
                  ),
                  const SizedBox(width: 12),
                  Text(_autoDelete ? 'Disable Auto-Delete' : AppStrings.autoDelete),
                ],
              ),
            ),
            const PopupMenuItem(
              value: 'export',
              child: Row(
                children: [
                  Icon(Icons.download_outlined,
                      color: AppColors.hotPink, size: 20),
                  SizedBox(width: 12),
                  Text(AppStrings.exportChat),
                ],
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildEmptyChat(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: 80,
            height: 80,
            decoration: BoxDecoration(
              color: AppColors.pink.withOpacity(0.2),
              shape: BoxShape.circle,
            ),
            child: const Icon(
              Icons.waving_hand_rounded,
              size: 36,
              color: AppColors.hotPink,
            ),
          ),
          const SizedBox(height: 16),
          Text(
            'Say hi to ${widget.otherUser.name}! 👋',
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: AppColors.textLight,
                ),
          ),
        ],
      ),
    ).animate().scale(duration: 400.ms).fadeIn(duration: 400.ms);
  }

  Widget _buildMessagesList(
      BuildContext context, List<MessageModel> messages) {
    return ListView.builder(
      controller: _scrollController,
      reverse: true,
      padding: const EdgeInsets.only(top: 8, bottom: 8),
      itemCount: messages.length,
      itemBuilder: (ctx, index) {
        final message = messages[index];
        final isSentByMe = message.senderId == widget.currentUser.uid;

        // Check if we need a date separator
        bool showDate = false;
        if (index == messages.length - 1) {
          showDate = true;
        } else {
          final nextMessage = messages[index + 1];
          final msgDate = DateTime(
            message.timestamp.year,
            message.timestamp.month,
            message.timestamp.day,
          );
          final nextDate = DateTime(
            nextMessage.timestamp.year,
            nextMessage.timestamp.month,
            nextMessage.timestamp.day,
          );
          showDate = msgDate != nextDate;
        }

        return Column(
          children: [
            if (showDate) DateSeparator(date: message.timestamp),
            ChatBubble(
              message: message,
              isSentByMe: isSentByMe,
              showAvatar: !isSentByMe,
              senderAvatarUrl: widget.otherUser.avatarUrl,
              senderName: widget.otherUser.name,
              onLongPress: () => _showMessageOptions(context, message),
            ),
          ],
        );
      },
    );
  }
}
