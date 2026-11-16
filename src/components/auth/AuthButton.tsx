import React from 'react';
import { Pressable, Text, ActivityIndicator } from 'react-native';

interface AuthButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
}) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      className={`mt-2 py-4 rounded-2xl items-center justify-center bg-accent ${
        isDisabled ? 'opacity-55' : 'active:opacity-90'
      }`}
    >
      {loading ? (
        <ActivityIndicator color="#081126" size="small" />
      ) : (
        <Text className="text-base font-sans-bold text-primary">{title}</Text>
      )}
    </Pressable>
  );
};
