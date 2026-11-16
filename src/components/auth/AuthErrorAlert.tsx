import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AuthErrorAlertProps {
  message: string | null;
}

export const AuthErrorAlert: React.FC<AuthErrorAlertProps> = ({ message }) => {
  if (!message) return null;

  return (
    <View className="mb-4 flex-row items-center gap-2.5 rounded-2xl border border-destructive/20 bg-destructive/10 p-3.5">
      <Ionicons name="alert-circle" size={20} color="#dc2626" />
      <Text className="flex-1 text-sm font-sans-medium text-destructive">
        {message}
      </Text>
    </View>
  );
};
