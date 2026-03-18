// lib/widgets/chat_bubble.dart
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:intl/intl.dart';
import '../models/message_model.dart';
import '../utils/theme.dart';

class ChatBubble extends StatelessWidget {
  final MessageModel message;
  final bool isSentByMe;
  final bool showAvatar;
  final String? senderAvatarUrl;
  final String? senderName;
  final VoidCallback? onLongPress;

  const ChatBubble({
    super.key,
    required this.message,
    required this.isSentByMe,
    this.showAvatar = false,
    this.senderAvatarUrl,
    this.senderName,
    this.onLongPress,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 3),
      child: Row(
        mainAxisAlignment:
            isSentByMe ? MainAxisAlignment.end : MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          if (!isSentByMe) ...[
            _buildAvatar(context),
            const SizedBox(width: 8),
          ],
          Flexible(
            child: GestureDetector(
              onLongPress: onLongPress,
              child: Column(
                crossAxisAlignment: isSentByMe
                    ? CrossAxisAlignment.end
                    : CrossAxisAlignment.start,
                children: [
                  if (!isSentByMe && senderName != null)
                    Padding(
                      padding: const EdgeInsets.only(left: 4, bottom: 2),
                      child: Text(
                        senderName!,
                        style: Theme.of(context).textTheme.bodySmall?.copyWith(
                              color: AppColors.hotPink,
                              fontWeight: FontWeight.w600,
                            ),
                      ),
                    ),
                  _buildBubble(context, isDark),
                  const SizedBox(height: 2),
                  _buildTimestamp(context),
                ],
              ),
            ),
          ),
          if (isSentByMe) ...[
            const SizedBox(width: 4),
            _buildStatusIcon(context),
          ],
        ],
      ),
    )
        .animate()
        .slideX(
          begin: isSentByMe ? 0.3 : -0.3,
          end: 0,
          duration: 300.ms,
          curve: Curves.easeOutCubic,
        )
        .fadeIn(duration: 250.ms);
  }

  Widget _buildAvatar(BuildContext context) {
    if (!showAvatar) return const SizedBox(width: 32);
    return CircleAvatar(
      radius: 16,
      backgroundColor: AppColors.pink,
      backgroundImage: senderAvatarUrl != null && senderAvatarUrl!.isNotEmpty
          ? NetworkImage(senderAvatarUrl!)
          : null,
      child: senderAvatarUrl == null || senderAvatarUrl!.isEmpty
          ? Text(
              (senderName ?? 'U')[0].toUpperCase(),
              style: const TextStyle(
                color: Colors.white,
                fontSize: 12,
                fontWeight: FontWeight.bold,
              ),
            )
          : null,
    );
  }

  Widget _buildBubble(BuildContext context, bool isDark) {
    final sentColor = isSentByMe
        ? (isDark ? AppColors.darkSentBubble : AppColors.sentBubble)
        : (isDark ? AppColors.darkReceivedBubble : AppColors.receivedBubble);

    final textColor = isSentByMe
        ? Colors.white
        : (isDark ? Colors.white : AppColors.textDark);

    if (message.isDeleted) {
      return _buildDeletedBubble(context, sentColor);
    }

    if (message.isImage) {
      return _buildImageBubble(context, sentColor);
    }

    return Container(
      constraints: BoxConstraints(
        maxWidth: MediaQuery.of(context).size.width * 0.72,
      ),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      decoration: BoxDecoration(
        color: sentColor,
        borderRadius: BorderRadius.only(
          topLeft: const Radius.circular(20),
          topRight: const Radius.circular(20),
          bottomLeft: Radius.circular(isSentByMe ? 20 : 4),
          bottomRight: Radius.circular(isSentByMe ? 4 : 20),
        ),
        boxShadow: [
          BoxShadow(
            color: isSentByMe
                ? AppColors.hotPink.withOpacity(0.2)
                : Colors.black.withOpacity(0.05),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Text(
        message.text ?? '',
        style: Theme.of(context).textTheme.bodyLarge?.copyWith(
              color: textColor,
              height: 1.4,
            ),
      ),
    );
  }

  Widget _buildImageBubble(BuildContext context, Color bgColor) {
    return Container(
      constraints: BoxConstraints(
        maxWidth: MediaQuery.of(context).size.width * 0.65,
        maxHeight: 260,
      ),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.only(
          topLeft: const Radius.circular(20),
          topRight: const Radius.circular(20),
          bottomLeft: Radius.circular(isSentByMe ? 20 : 4),
          bottomRight: Radius.circular(isSentByMe ? 4 : 20),
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      clipBehavior: Clip.antiAlias,
      child: CachedNetworkImage(
        imageUrl: message.imageUrl!,
        fit: BoxFit.cover,
        placeholder: (context, url) => Container(
          height: 200,
          width: 200,
          color: AppColors.lightGrey,
          child: const Center(
            child: CircularProgressIndicator(
              valueColor: AlwaysStoppedAnimation(AppColors.hotPink),
              strokeWidth: 2,
            ),
          ),
        ),
        errorWidget: (context, url, error) => Container(
          height: 120,
          width: 120,
          color: AppColors.lightGrey,
          child: const Icon(Icons.broken_image_rounded, color: AppColors.textLight),
        ),
      ),
    );
  }

  Widget _buildDeletedBubble(BuildContext context, Color bgColor) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
      decoration: BoxDecoration(
        color: bgColor.withOpacity(0.5),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: AppColors.textLight.withOpacity(0.3),
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            Icons.block_rounded,
            size: 14,
            color: AppColors.textLight,
          ),
          const SizedBox(width: 6),
          Text(
            'Message deleted',
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  fontStyle: FontStyle.italic,
                  color: AppColors.textLight,
                ),
          ),
        ],
      ),
    );
  }

  Widget _buildTimestamp(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(left: 4, right: 4),
      child: Text(
        DateFormat('h:mm a').format(message.timestamp),
        style: Theme.of(context).textTheme.bodySmall?.copyWith(
              fontSize: 10,
              color: AppColors.textLight,
            ),
      ),
    );
  }

  Widget _buildStatusIcon(BuildContext context) {
    if (!isSentByMe) return const SizedBox();

    IconData icon;
    Color color;

    switch (message.status) {
      case MessageStatus.sending:
        icon = Icons.access_time_rounded;
        color = AppColors.textLight;
        break;
      case MessageStatus.sent:
        icon = Icons.check_rounded;
        color = AppColors.textLight;
        break;
      case MessageStatus.delivered:
        icon = Icons.done_all_rounded;
        color = AppColors.textLight;
        break;
      case MessageStatus.read:
        icon = Icons.done_all_rounded;
        color = AppColors.hotPink;
        break;
    }

    return Icon(icon, size: 14, color: color);
  }
}

// Date separator widget
class DateSeparator extends StatelessWidget {
  final DateTime date;

  const DateSeparator({super.key, required this.date});

  String _formatDate() {
    final now = DateTime.now();
    final today = DateTime(now.year, now.month, now.day);
    final yesterday = today.subtract(const Duration(days: 1));
    final messageDate = DateTime(date.year, date.month, date.day);

    if (messageDate == today) return 'Today';
    if (messageDate == yesterday) return 'Yesterday';
    return DateFormat('MMMM d, yyyy').format(date);
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 16),
      child: Row(
        children: [
          Expanded(
            child: Divider(color: AppColors.textLight.withOpacity(0.3)),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 12),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
              decoration: BoxDecoration(
                color: AppColors.pink.withOpacity(0.2),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Text(
                _formatDate(),
                style: Theme.of(context).textTheme.bodySmall?.copyWith(
                      color: AppColors.hotPink,
                      fontWeight: FontWeight.w500,
                    ),
              ),
            ),
          ),
          Expanded(
            child: Divider(color: AppColors.textLight.withOpacity(0.3)),
          ),
        ],
      ),
    );
  }
}
