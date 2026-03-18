// lib/screens/chat_list_screen.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:intl/intl.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../services/auth_service.dart';
import '../services/chat_service.dart';
import '../models/user_model.dart';
import '../utils/theme.dart';
import '../utils/constants.dart';
import 'chat_room_screen.dart';

// Theme mode provider
final themeProvider = StateProvider<ThemeMode>((ref) => ThemeMode.light);

class ChatListScreen extends ConsumerStatefulWidget {
  const ChatListScreen({super.key});

  @override
  ConsumerState<ChatListScreen> createState() => _ChatListScreenState();
}

class _ChatListScreenState extends ConsumerState<ChatListScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  String _searchQuery = '';
  final _searchController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _loadTheme();
  }

  @override
  void dispose() {
    _tabController.dispose();
    _searchController.dispose();
    super.dispose();
  }

  Future<void> _loadTheme() async {
    final prefs = await SharedPreferences.getInstance();
    final isDark = prefs.getBool(AppConstants.themeKey) ?? false;
    ref.read(themeProvider.notifier).state =
        isDark ? ThemeMode.dark : ThemeMode.light;
  }

  Future<void> _toggleTheme() async {
    final prefs = await SharedPreferences.getInstance();
    final current = ref.read(themeProvider);
    final newMode =
        current == ThemeMode.light ? ThemeMode.dark : ThemeMode.light;
    ref.read(themeProvider.notifier).state = newMode;
    await prefs.setBool(AppConstants.themeKey, newMode == ThemeMode.dark);
  }

  @override
  Widget build(BuildContext context) {
    final currentUserAsync = ref.watch(currentUserProvider);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return currentUserAsync.when(
      data: (currentUser) {
        if (currentUser == null) return const SizedBox();
        return Scaffold(
          backgroundColor: Theme.of(context).colorScheme.background,
          appBar: _buildAppBar(context, currentUser, isDark),
          body: Column(
            children: [
              _buildSearchBar(context, isDark),
              _buildTabBar(context, isDark),
              Expanded(
                child: TabBarView(
                  controller: _tabController,
                  children: [
                    _ChatsTab(
                        currentUser: currentUser,
                        searchQuery: _searchQuery),
                    _PeopleTab(
                        currentUser: currentUser,
                        searchQuery: _searchQuery),
                  ],
                ),
              ),
            ],
          ),
        );
      },
      loading: () => const Scaffold(
        body: Center(
          child: CircularProgressIndicator(
            valueColor: AlwaysStoppedAnimation(AppColors.hotPink),
          ),
        ),
      ),
      error: (_, __) => const Scaffold(
        body: Center(child: Text('Error loading profile')),
      ),
    );
  }

  PreferredSizeWidget _buildAppBar(
      BuildContext context, UserModel user, bool isDark) {
    return AppBar(
      backgroundColor:
          isDark ? AppColors.darkSurface : AppColors.white,
      elevation: 0,
      title: Row(
        children: [
          Container(
            width: 36,
            height: 36,
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                colors: [AppColors.pinkGradientStart, AppColors.pinkGradientEnd],
              ),
              shape: BoxShape.circle,
            ),
            child: const Icon(Icons.chat_bubble_rounded,
                color: Colors.white, size: 18),
          ),
          const SizedBox(width: 10),
          Text(
            AppConstants.appName,
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  color: AppColors.hotPink,
                  fontWeight: FontWeight.w800,
                ),
          ),
        ],
      ),
      actions: [
        // Dark mode toggle
        IconButton(
          onPressed: _toggleTheme,
          icon: AnimatedSwitcher(
            duration: const Duration(milliseconds: 300),
            child: Icon(
              isDark ? Icons.light_mode_rounded : Icons.dark_mode_rounded,
              key: ValueKey(isDark),
              color: isDark ? Colors.amber : AppColors.textMedium,
            ),
          ),
        ),
        // Profile button
        Padding(
          padding: const EdgeInsets.only(right: 12),
          child: GestureDetector(
            onTap: () => _showProfileSheet(context, user),
            child: CircleAvatar(
              radius: 18,
              backgroundColor: AppColors.pink,
              backgroundImage: user.avatarUrl.isNotEmpty
                  ? NetworkImage(user.avatarUrl)
                  : null,
              child: user.avatarUrl.isEmpty
                  ? Text(
                      user.name[0].toUpperCase(),
                      style: const TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                        fontSize: 14,
                      ),
                    )
                  : null,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildSearchBar(BuildContext context, bool isDark) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 4),
      child: Container(
        decoration: BoxDecoration(
          color: isDark ? AppColors.darkCard : AppColors.lightGrey,
          borderRadius: BorderRadius.circular(16),
        ),
        child: TextField(
          controller: _searchController,
          onChanged: (val) => setState(() => _searchQuery = val.toLowerCase()),
          decoration: InputDecoration(
            hintText: 'Search chats or people...',
            prefixIcon: const Icon(Icons.search_rounded, color: AppColors.textLight),
            suffixIcon: _searchQuery.isNotEmpty
                ? IconButton(
                    icon: const Icon(Icons.clear_rounded, color: AppColors.textLight),
                    onPressed: () {
                      _searchController.clear();
                      setState(() => _searchQuery = '');
                    },
                  )
                : null,
            border: InputBorder.none,
            enabledBorder: InputBorder.none,
            focusedBorder: InputBorder.none,
          ),
        ),
      ),
    );
  }

  Widget _buildTabBar(BuildContext context, bool isDark) {
    return TabBar(
      controller: _tabController,
      labelColor: AppColors.hotPink,
      unselectedLabelColor: AppColors.textLight,
      indicatorColor: AppColors.hotPink,
      indicatorSize: TabBarIndicatorSize.label,
      labelStyle: Theme.of(context).textTheme.bodyMedium?.copyWith(
            fontWeight: FontWeight.w600,
          ),
      tabs: const [
        Tab(text: 'Chats'),
        Tab(text: 'People'),
      ],
    );
  }

  void _showProfileSheet(BuildContext context, UserModel user) {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      isScrollControlled: true,
      builder: (_) => _ProfileBottomSheet(user: user),
    );
  }
}

// ── Chats Tab ─────────────────────────────────────────────────────────────────
class _ChatsTab extends ConsumerWidget {
  final UserModel currentUser;
  final String searchQuery;

  const _ChatsTab({required this.currentUser, required this.searchQuery});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final usersAsync = ref.watch(allUsersProvider(currentUser.uid));

    return usersAsync.when(
      data: (users) {
        final filtered = searchQuery.isEmpty
            ? users
            : users
                .where((u) => u.name.toLowerCase().contains(searchQuery))
                .toList();

        if (filtered.isEmpty) {
          return _EmptyState(
            icon: Icons.chat_bubble_outline_rounded,
            message: searchQuery.isNotEmpty
                ? 'No users found'
                : 'No conversations yet.\nTap "People" to start chatting!',
          );
        }

        return ListView.builder(
          padding: const EdgeInsets.symmetric(vertical: 8),
          itemCount: filtered.length,
          itemBuilder: (ctx, i) => _ChatListTile(
            user: filtered[i],
            currentUser: currentUser,
          )
              .animate(delay: Duration(milliseconds: i * 50))
              .slideX(begin: -0.1, duration: 300.ms)
              .fadeIn(duration: 300.ms),
        );
      },
      loading: () => const Center(
        child: CircularProgressIndicator(
          valueColor: AlwaysStoppedAnimation(AppColors.hotPink),
          strokeWidth: 2,
        ),
      ),
      error: (e, _) => Center(child: Text('Error: $e')),
    );
  }
}

class _ChatListTile extends ConsumerWidget {
  final UserModel user;
  final UserModel currentUser;

  const _ChatListTile({required this.user, required this.currentUser});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final chatId = ref.read(chatServiceProvider).getChatId(currentUser.uid, user.uid);

    return ListTile(
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      leading: Stack(
        children: [
          CircleAvatar(
            radius: 26,
            backgroundColor: AppColors.pink,
            backgroundImage: user.avatarUrl.isNotEmpty
                ? NetworkImage(user.avatarUrl)
                : null,
            child: user.avatarUrl.isEmpty
                ? Text(
                    user.name[0].toUpperCase(),
                    style: const TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                        fontSize: 18),
                  )
                : null,
          ),
          if (user.isOnline)
            Positioned(
              right: 1,
              bottom: 1,
              child: Container(
                width: 12,
                height: 12,
                decoration: BoxDecoration(
                  color: AppColors.onlineGreen,
                  shape: BoxShape.circle,
                  border: Border.all(
                    color: Theme.of(context).scaffoldBackgroundColor,
                    width: 2,
                  ),
                ),
              ),
            ),
        ],
      ),
      title: Text(
        user.name,
        style: Theme.of(context).textTheme.titleMedium,
        maxLines: 1,
        overflow: TextOverflow.ellipsis,
      ),
      subtitle: Text(
        user.isOnline ? AppStrings.online : _formatLastSeen(user.lastSeen),
        style: Theme.of(context).textTheme.bodySmall?.copyWith(
              color: user.isOnline ? AppColors.onlineGreen : AppColors.textLight,
            ),
      ),
      trailing: const Icon(Icons.chevron_right_rounded, color: AppColors.textLight),
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => ChatRoomScreen(
              chatId: chatId,
              otherUser: user,
              currentUser: currentUser,
            ),
          ),
        );
      },
    );
  }

  String _formatLastSeen(DateTime? lastSeen) {
    if (lastSeen == null) return 'Offline';
    final diff = DateTime.now().difference(lastSeen);
    if (diff.inMinutes < 1) return 'Just now';
    if (diff.inHours < 1) return '${diff.inMinutes}m ago';
    if (diff.inDays < 1) return '${diff.inHours}h ago';
    return DateFormat('MMM d').format(lastSeen);
  }
}

// ── People Tab ────────────────────────────────────────────────────────────────
class _PeopleTab extends ConsumerWidget {
  final UserModel currentUser;
  final String searchQuery;

  const _PeopleTab({required this.currentUser, required this.searchQuery});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final usersAsync = ref.watch(allUsersProvider(currentUser.uid));

    return usersAsync.when(
      data: (users) {
        final filtered = searchQuery.isEmpty
            ? users
            : users
                .where((u) => u.name.toLowerCase().contains(searchQuery))
                .toList();

        if (filtered.isEmpty) {
          return const _EmptyState(
            icon: Icons.people_outline_rounded,
            message: 'No other users yet.',
          );
        }

        return ListView.builder(
          padding: const EdgeInsets.all(16),
          itemCount: filtered.length,
          itemBuilder: (ctx, i) => _PeopleCard(
            user: filtered[i],
            currentUser: currentUser,
          )
              .animate(delay: Duration(milliseconds: i * 60))
              .slideY(begin: 0.1, duration: 300.ms)
              .fadeIn(duration: 300.ms),
        );
      },
      loading: () => const Center(
        child: CircularProgressIndicator(
          valueColor: AlwaysStoppedAnimation(AppColors.hotPink),
          strokeWidth: 2,
        ),
      ),
      error: (e, _) => Center(child: Text('Error: $e')),
    );
  }
}

class _PeopleCard extends ConsumerWidget {
  final UserModel user;
  final UserModel currentUser;

  const _PeopleCard({required this.user, required this.currentUser});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final chatId = ref.read(chatServiceProvider).getChatId(currentUser.uid, user.uid);

    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      elevation: 0,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      color: Theme.of(context).cardColor,
      child: InkWell(
        borderRadius: BorderRadius.circular(20),
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (_) => ChatRoomScreen(
                chatId: chatId,
                otherUser: user,
                currentUser: currentUser,
              ),
            ),
          );
        },
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            children: [
              Stack(
                children: [
                  CircleAvatar(
                    radius: 28,
                    backgroundColor: AppColors.pink,
                    backgroundImage: user.avatarUrl.isNotEmpty
                        ? NetworkImage(user.avatarUrl)
                        : null,
                    child: user.avatarUrl.isEmpty
                        ? Text(
                            user.name[0].toUpperCase(),
                            style: const TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                              fontSize: 20,
                            ),
                          )
                        : null,
                  ),
                  if (user.isOnline)
                    Positioned(
                      right: 1,
                      bottom: 1,
                      child: Container(
                        width: 14,
                        height: 14,
                        decoration: BoxDecoration(
                          color: AppColors.onlineGreen,
                          shape: BoxShape.circle,
                          border: Border.all(
                            color: Theme.of(context).cardColor,
                            width: 2,
                          ),
                        ),
                      ),
                    ),
                ],
              ),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(user.name,
                        style: Theme.of(context).textTheme.titleMedium),
                    const SizedBox(height: 2),
                    Text(
                      user.email,
                      style: Theme.of(context).textTheme.bodySmall,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ],
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                decoration: BoxDecoration(
                  color: AppColors.hotPink.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: const Text(
                  'Chat',
                  style: TextStyle(
                    color: AppColors.hotPink,
                    fontWeight: FontWeight.w600,
                    fontSize: 13,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// ── Empty State ────────────────────────────────────────────────────────────────
class _EmptyState extends StatelessWidget {
  final IconData icon;
  final String message;

  const _EmptyState({required this.icon, required this.message});

  @override
  Widget build(BuildContext context) {
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
            child: Icon(icon, size: 36, color: AppColors.hotPink),
          ),
          const SizedBox(height: 16),
          Text(
            message,
            textAlign: TextAlign.center,
            style: Theme.of(context)
                .textTheme
                .bodyMedium
                ?.copyWith(color: AppColors.textLight),
          ),
        ],
      ),
    )
        .animate()
        .scale(duration: 400.ms, curve: Curves.easeOut)
        .fadeIn(duration: 400.ms);
  }
}

// ── Profile Bottom Sheet ──────────────────────────────────────────────────────
class _ProfileBottomSheet extends ConsumerStatefulWidget {
  final UserModel user;

  const _ProfileBottomSheet({required this.user});

  @override
  ConsumerState<_ProfileBottomSheet> createState() =>
      _ProfileBottomSheetState();
}

class _ProfileBottomSheetState extends ConsumerState<_ProfileBottomSheet> {
  final _nameController = TextEditingController();
  bool _isEditing = false;
  bool _isSaving = false;

  @override
  void initState() {
    super.initState();
    _nameController.text = widget.user.name;
  }

  @override
  void dispose() {
    _nameController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      margin: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkSurface : AppColors.white,
        borderRadius: BorderRadius.circular(28),
      ),
      padding: const EdgeInsets.all(24),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Handle
          Container(
            width: 40,
            height: 4,
            decoration: BoxDecoration(
              color: AppColors.textLight,
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          const SizedBox(height: 24),

          // Avatar
          CircleAvatar(
            radius: 44,
            backgroundColor: AppColors.pink,
            backgroundImage: widget.user.avatarUrl.isNotEmpty
                ? NetworkImage(widget.user.avatarUrl)
                : null,
            child: widget.user.avatarUrl.isEmpty
                ? Text(
                    widget.user.name[0].toUpperCase(),
                    style: const TextStyle(
                        color: Colors.white,
                        fontSize: 36,
                        fontWeight: FontWeight.bold),
                  )
                : null,
          ),
          const SizedBox(height: 16),

          if (_isEditing)
            TextField(
              controller: _nameController,
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.headlineMedium,
              decoration: const InputDecoration(
                hintText: 'Your name',
              ),
            )
          else
            Text(widget.user.name,
                style: Theme.of(context).textTheme.headlineMedium),

          const SizedBox(height: 4),
          Text(widget.user.email,
              style: Theme.of(context).textTheme.bodyMedium),

          const SizedBox(height: 28),

          // Edit / Save
          SizedBox(
            width: double.infinity,
            child: ElevatedButton.icon(
              onPressed: _isEditing ? _saveProfile : () => setState(() => _isEditing = true),
              icon: _isSaving
                  ? const SizedBox(
                      width: 16,
                      height: 16,
                      child: CircularProgressIndicator(
                          valueColor: AlwaysStoppedAnimation(Colors.white),
                          strokeWidth: 2))
                  : Icon(_isEditing ? Icons.check_rounded : Icons.edit_rounded),
              label: Text(_isEditing ? AppStrings.saveChanges : AppStrings.editProfile),
            ),
          ),

          const SizedBox(height: 12),

          // Sign out
          SizedBox(
            width: double.infinity,
            child: OutlinedButton.icon(
              onPressed: _signOut,
              icon: const Icon(Icons.logout_rounded, color: Colors.red),
              label: const Text(AppStrings.signOut),
              style: OutlinedButton.styleFrom(
                foregroundColor: Colors.red,
                side: const BorderSide(color: Colors.red),
                padding: const EdgeInsets.symmetric(vertical: 14),
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16)),
              ),
            ),
          ),
          const SizedBox(height: 8),
        ],
      ),
    );
  }

  Future<void> _saveProfile() async {
    final name = _nameController.text.trim();
    if (name.isEmpty) return;
    setState(() => _isSaving = true);
    try {
      await ref.read(authServiceProvider).updateProfile(
            uid: widget.user.uid,
            name: name,
          );
      if (mounted) {
        setState(() {
          _isEditing = false;
          _isSaving = false;
        });
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text(AppStrings.successProfileUpdated),
            backgroundColor: AppColors.hotPink,
          ),
        );
      }
    } catch (_) {
      if (mounted) setState(() => _isSaving = false);
    }
  }

  Future<void> _signOut() async {
    Navigator.pop(context);
    await ref.read(authServiceProvider).signOut();
  }
}
