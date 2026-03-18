// lib/screens/register_screen.dart
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:image_picker/image_picker.dart';
import '../services/auth_service.dart';
import '../utils/theme.dart';
import '../utils/constants.dart';

class RegisterScreen extends ConsumerStatefulWidget {
  const RegisterScreen({super.key});

  @override
  ConsumerState<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends ConsumerState<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  bool _obscurePassword = true;
  bool _obscureConfirm = true;
  bool _isLoading = false;
  String? _errorMessage;
  File? _avatarFile;

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  Future<void> _pickAvatar() async {
    final picker = ImagePicker();
    final picked = await picker.pickImage(
      source: ImageSource.gallery,
      maxWidth: 400,
      maxHeight: 400,
      imageQuality: 90,
    );
    if (picked != null) {
      setState(() => _avatarFile = File(picked.path));
    }
  }

  Future<void> _register() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });
    try {
      await ref.read(authServiceProvider).signUpWithEmail(
            email: _emailController.text.trim(),
            password: _passwordController.text,
            name: _nameController.text.trim(),
            avatarFile: _avatarFile,
          );
    } catch (e) {
      setState(() => _errorMessage = e.toString());
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.background,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        leading: IconButton(
          onPressed: () => Navigator.pop(context),
          icon: const Icon(Icons.arrow_back_ios_rounded),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 28),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Create Account',
                style: Theme.of(context).textTheme.headlineLarge,
              ).animate().slideX(begin: -0.2, duration: 400.ms).fadeIn(duration: 400.ms),
              const SizedBox(height: 8),
              Text(
                'Join LinkUp and start chatting!',
                style: Theme.of(context).textTheme.bodyMedium,
              ).animate().slideX(begin: -0.2, duration: 400.ms, delay: 100.ms).fadeIn(duration: 400.ms, delay: 100.ms),

              const SizedBox(height: 32),

              // Avatar picker
              Center(child: _buildAvatarPicker(context))
                  .animate()
                  .scale(duration: 500.ms, delay: 150.ms, curve: Curves.elasticOut)
                  .fadeIn(duration: 400.ms, delay: 150.ms),

              const SizedBox(height: 32),

              Form(
                key: _formKey,
                child: Column(
                  children: [
                    _buildField(
                      context,
                      controller: _nameController,
                      hint: 'Full Name',
                      icon: Icons.person_outline_rounded,
                      delay: 200,
                      validator: (val) =>
                          val == null || val.isEmpty ? AppStrings.errorEmptyName : null,
                    ),
                    const SizedBox(height: 14),
                    _buildField(
                      context,
                      controller: _emailController,
                      hint: 'Email address',
                      icon: Icons.email_outlined,
                      delay: 250,
                      keyboardType: TextInputType.emailAddress,
                      validator: (val) {
                        if (val == null || val.isEmpty) return 'Enter email';
                        if (!val.contains('@')) return AppStrings.errorInvalidEmail;
                        return null;
                      },
                    ),
                    const SizedBox(height: 14),
                    _buildPasswordField(
                      context,
                      controller: _passwordController,
                      hint: 'Password',
                      obscure: _obscurePassword,
                      delay: 300,
                      onToggle: () =>
                          setState(() => _obscurePassword = !_obscurePassword),
                      validator: (val) {
                        if (val == null || val.length < 6) {
                          return AppStrings.errorWeakPassword;
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 14),
                    _buildPasswordField(
                      context,
                      controller: _confirmPasswordController,
                      hint: 'Confirm Password',
                      obscure: _obscureConfirm,
                      delay: 350,
                      onToggle: () =>
                          setState(() => _obscureConfirm = !_obscureConfirm),
                      validator: (val) {
                        if (val != _passwordController.text) {
                          return AppStrings.errorPasswordMismatch;
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 24),

                    if (_errorMessage != null) ...[
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: Colors.red.withOpacity(0.1),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Row(
                          children: [
                            const Icon(Icons.error_outline,
                                color: Colors.red, size: 18),
                            const SizedBox(width: 8),
                            Expanded(
                              child: Text(
                                _errorMessage!,
                                style: const TextStyle(
                                    color: Colors.red, fontSize: 13),
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 16),
                    ],

                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        onPressed: _isLoading ? null : _register,
                        child: _isLoading
                            ? const SizedBox(
                                width: 22,
                                height: 22,
                                child: CircularProgressIndicator(
                                  valueColor:
                                      AlwaysStoppedAnimation(Colors.white),
                                  strokeWidth: 2.5,
                                ),
                              )
                            : const Text(AppStrings.signUp),
                      ),
                    ).animate().slideY(begin: 0.2, duration: 400.ms, delay: 400.ms).fadeIn(duration: 400.ms, delay: 400.ms),

                    const SizedBox(height: 24),

                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(AppStrings.alreadyHaveAccount,
                            style: Theme.of(context).textTheme.bodyMedium),
                        GestureDetector(
                          onTap: () => Navigator.pop(context),
                          child: Text(
                            'Sign In',
                            style: Theme.of(context)
                                .textTheme
                                .bodyMedium
                                ?.copyWith(
                                  color: AppColors.hotPink,
                                  fontWeight: FontWeight.w700,
                                ),
                          ),
                        ),
                      ],
                    ).animate().fadeIn(duration: 400.ms, delay: 450.ms),

                    const SizedBox(height: 24),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildAvatarPicker(BuildContext context) {
    return GestureDetector(
      onTap: _pickAvatar,
      child: Stack(
        children: [
          CircleAvatar(
            radius: 50,
            backgroundColor: AppColors.pink.withOpacity(0.3),
            backgroundImage:
                _avatarFile != null ? FileImage(_avatarFile!) : null,
            child: _avatarFile == null
                ? const Icon(
                    Icons.person_rounded,
                    size: 48,
                    color: AppColors.hotPink,
                  )
                : null,
          ),
          Positioned(
            right: 0,
            bottom: 0,
            child: Container(
              width: 32,
              height: 32,
              decoration: const BoxDecoration(
                color: AppColors.hotPink,
                shape: BoxShape.circle,
              ),
              child: const Icon(
                Icons.camera_alt_rounded,
                color: Colors.white,
                size: 16,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildField(
    BuildContext context, {
    required TextEditingController controller,
    required String hint,
    required IconData icon,
    required int delay,
    TextInputType? keyboardType,
    String? Function(String?)? validator,
  }) {
    return TextFormField(
      controller: controller,
      keyboardType: keyboardType,
      textInputAction: TextInputAction.next,
      decoration: InputDecoration(
        hintText: hint,
        prefixIcon: Icon(icon, color: AppColors.hotPink),
      ),
      validator: validator,
    )
        .animate()
        .slideY(begin: 0.2, duration: 400.ms, delay: Duration(milliseconds: delay))
        .fadeIn(duration: 400.ms, delay: Duration(milliseconds: delay));
  }

  Widget _buildPasswordField(
    BuildContext context, {
    required TextEditingController controller,
    required String hint,
    required bool obscure,
    required int delay,
    required VoidCallback onToggle,
    String? Function(String?)? validator,
  }) {
    return TextFormField(
      controller: controller,
      obscureText: obscure,
      textInputAction: TextInputAction.next,
      decoration: InputDecoration(
        hintText: hint,
        prefixIcon: const Icon(Icons.lock_outline_rounded, color: AppColors.hotPink),
        suffixIcon: IconButton(
          onPressed: onToggle,
          icon: Icon(
            obscure ? Icons.visibility_outlined : Icons.visibility_off_outlined,
            color: AppColors.textLight,
          ),
        ),
      ),
      validator: validator,
    )
        .animate()
        .slideY(begin: 0.2, duration: 400.ms, delay: Duration(milliseconds: delay))
        .fadeIn(duration: 400.ms, delay: Duration(milliseconds: delay));
  }
}
