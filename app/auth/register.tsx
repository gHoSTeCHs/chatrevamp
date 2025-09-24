import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { RegisterRequest } from '../../types/auth.types';

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
  hospital_code?: string;
}

export default function RegisterScreen() {
  const { colors } = useTheme();
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState<RegisterRequest>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    hospital_code: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (!formData.password_confirmation.trim()) {
      newErrors.password_confirmation = 'Please confirm your password';
    } else if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = 'Passwords do not match';
    }

    if (!formData.hospital_code.trim()) {
      newErrors.hospital_code = 'Hospital code is required';
    } else if (formData.hospital_code.trim().length < 3) {
      newErrors.hospital_code = 'Hospital code must be at least 3 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      await register(formData);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert(
        'Registration Failed',
        error instanceof Error ? error.message : 'An unexpected error occurred',
        [{ text: 'OK' }]
      );
    }
  };

  const updateField = (field: keyof RegisterRequest, value: string) => {
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
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-6 pt-12">
            <View className="mb-8">
              <Text
                className="text-3xl font-bold mb-2"
                style={{ color: colors.text }}
              >
                Create Account
              </Text>
              <Text
                className="text-base"
                style={{ color: colors.textSecondary }}
              >
                {"Join your hospital's communication network"}
              </Text>
            </View>

            <View className="space-y-5">
              <View>
                <Text
                  className="text-sm font-medium mb-2"
                  style={{ color: colors.text }}
                >
                  Full Name
                </Text>
                <View
                  className="flex-row items-center px-4 py-4 rounded-xl border"
                  style={{
                    backgroundColor: colors.surface,
                    borderColor: errors.name ? colors.error : colors.separator,
                  }}
                >
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color={colors.textTertiary}
                    className="mr-3"
                  />
                  <TextInput
                    className="flex-1 text-base"
                    style={{ color: colors.text }}
                    placeholder="Enter your full name"
                    placeholderTextColor={colors.textTertiary}
                    value={formData.name}
                    onChangeText={(text) => updateField('name', text)}
                    autoCapitalize="words"
                    autoCorrect={false}
                    editable={!isLoading}
                  />
                </View>
                {errors.name && (
                  <Text
                    className="text-sm mt-1"
                    style={{ color: colors.error }}
                  >
                    {errors.name}
                  </Text>
                )}
              </View>

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
                  Hospital Code
                </Text>
                <View
                  className="flex-row items-center px-4 py-4 rounded-xl border"
                  style={{
                    backgroundColor: colors.surface,
                    borderColor: errors.hospital_code ? colors.error : colors.separator,
                  }}
                >
                  <Ionicons
                    name="business-outline"
                    size={20}
                    color={colors.textTertiary}
                    className="mr-3"
                  />
                  <TextInput
                    className="flex-1 text-base"
                    style={{ color: colors.text }}
                    placeholder="Enter hospital code"
                    placeholderTextColor={colors.textTertiary}
                    value={formData.hospital_code}
                    onChangeText={(text) => updateField('hospital_code', text)}
                    autoCapitalize="characters"
                    autoCorrect={false}
                    editable={!isLoading}
                  />
                </View>
                {errors.hospital_code && (
                  <Text
                    className="text-sm mt-1"
                    style={{ color: colors.error }}
                  >
                    {errors.hospital_code}
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
                    placeholder="Create a password"
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

              <View>
                <Text
                  className="text-sm font-medium mb-2"
                  style={{ color: colors.text }}
                >
                  Confirm Password
                </Text>
                <View
                  className="flex-row items-center px-4 py-4 rounded-xl border"
                  style={{
                    backgroundColor: colors.surface,
                    borderColor: errors.password_confirmation ? colors.error : colors.separator,
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
                    placeholder="Confirm your password"
                    placeholderTextColor={colors.textTertiary}
                    value={formData.password_confirmation}
                    onChangeText={(text) => updateField('password_confirmation', text)}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!isLoading}
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="ml-2"
                    disabled={isLoading}
                  >
                    <Ionicons
                      name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color={colors.textTertiary}
                    />
                  </TouchableOpacity>
                </View>
                {errors.password_confirmation && (
                  <Text
                    className="text-sm mt-1"
                    style={{ color: colors.error }}
                  >
                    {errors.password_confirmation}
                  </Text>
                )}
              </View>

              <TouchableOpacity
                onPress={handleRegister}
                disabled={isLoading}
                className="py-4 rounded-xl items-center justify-center mt-6"
                style={{
                  backgroundColor: isLoading ? colors.separator : colors.primary,
                }}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text className="text-white text-base font-semibold">
                    Create Account
                  </Text>
                )}
              </TouchableOpacity>

              <View className="flex-row items-center justify-center mt-6 mb-8">
                <Text
                  className="text-base"
                  style={{ color: colors.textSecondary }}
                >
                  Already have an account?{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => router.push('/auth/login')}
                  disabled={isLoading}
                >
                  <Text
                    className="text-base font-semibold"
                    style={{ color: colors.primary }}
                  >
                    Sign In
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