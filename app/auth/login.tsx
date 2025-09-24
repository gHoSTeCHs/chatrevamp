import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { LoginRequest } from '../../types/auth.types';

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginScreen() {
  const { colors } = useTheme();
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      await login(formData);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert(
        'Login Failed',
        error instanceof Error ? error.message : 'An unexpected error occurred',
        [{ text: 'OK' }]
      );
    }
  };

  const updateField = (field: keyof LoginRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 px-6 pt-12">
            <View className="mb-12">
              <Text
                className="text-3xl font-bold mb-2"
                style={{ color: colors.text }}
              >
                Welcome Back
              </Text>
              <Text
                className="text-base"
                style={{ color: colors.textSecondary }}
              >
                Sign in to continue to your hospital chat
              </Text>
            </View>

            <View className="space-y-6">
              <View>
                <Text
                  className="text-sm font-medium mb-2"
                  style={{ color: colors.text }}
                >
                  Email Address
                </Text>
                <View
                  className="flex-row items-center px-4 py-4 rounded-xl border"
                  style={{
                    backgroundColor: colors.surface,
                    borderColor: errors.email ? colors.error : colors.separator,
                  }}
                >
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color={colors.textTertiary}
                    className="mr-3"
                  />
                  <TextInput
                    className="flex-1 text-base"
                    style={{ color: colors.text }}
                    placeholder="Enter your email"
                    placeholderTextColor={colors.textTertiary}
                    value={formData.email}
                    onChangeText={(text) => updateField('email', text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!isLoading}
                  />
                </View>
                {errors.email && (
                  <Text
                    className="text-sm mt-1"
                    style={{ color: colors.error }}
                  >
                    {errors.email}
                  </Text>
                )}
              </View>

              <View>
                <Text
                  className="text-sm font-medium mb-2"
                  style={{ color: colors.text }}
                >
                  Password
                </Text>
                <View
                  className="flex-row items-center px-4 py-4 rounded-xl border"
                  style={{
                    backgroundColor: colors.surface,
                    borderColor: errors.password ? colors.error : colors.separator,
                  }}
                >
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color={colors.textTertiary}
                    className="mr-3"
                  />
                  <TextInput
                    className="flex-1 text-base"
                    style={{ color: colors.text }}
                    placeholder="Enter your password"
                    placeholderTextColor={colors.textTertiary}
                    value={formData.password}
                    onChangeText={(text) => updateField('password', text)}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!isLoading}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="ml-2"
                    disabled={isLoading}
                  >
                    <Ionicons
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color={colors.textTertiary}
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text
                    className="text-sm mt-1"
                    style={{ color: colors.error }}
                  >
                    {errors.password}
                  </Text>
                )}
              </View>

              <TouchableOpacity
                onPress={handleLogin}
                disabled={isLoading}
                className="py-4 rounded-xl items-center justify-center"
                style={{
                  backgroundColor: isLoading ? colors.separator : colors.primary,
                }}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text className="text-white text-base font-semibold">
                    Sign In
                  </Text>
                )}
              </TouchableOpacity>

              <View className="flex-row items-center justify-center mt-6">
                <Text
                  className="text-base"
                  style={{ color: colors.textSecondary }}
                >
                 {" Don't have an account?"}
                </Text>
                <TouchableOpacity
                  onPress={() => router.push('/auth/register')}
                  disabled={isLoading}
                >
                  <Text
                    className="text-base font-semibold"
                    style={{ color: colors.primary }}
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}