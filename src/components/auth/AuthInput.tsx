import React, { useState } from 'react';
import { View, Text, TextInput, TextInputProps, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AuthInputProps extends TextInputProps {
  label: string;
  error?: string;
  isPassword?: boolean;
}

export const AuthInput: React.FC<AuthInputProps> = ({
  label,
  error,
  isPassword = false,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="gap-1.5 mb-3.5">
      <Text className="text-sm font-sans-semibold text-primary">
        {label}
      </Text>
      <View
        className="flex-row items-center rounded-2xl border px-4 py-1"
        style={{
          backgroundColor: '#fff9e3',
          borderColor: error ? '#dc2626' : isFocused ? '#ea7a53' : 'rgba(0, 0, 0, 0.1)',
        }}
      >
        <TextInput
          className="flex-1 py-3 text-base font-sans-medium text-primary"
          placeholderTextColor="rgba(8, 17, 38, 0.4)"
          secureTextEntry={isPassword && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
        {isPassword && (
          <Pressable
            hitSlop={10}
            onPress={() => setShowPassword((prev) => !prev)}
            className="pl-2"
          >
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="rgba(8, 17, 38, 0.55)"
            />
          </Pressable>
        )}
      </View>
      {error ? (
        <Text className="text-xs font-sans-medium text-destructive mt-0.5 ml-1">
          {error}
        </Text>
      ) : null}
    </View>
  );
};
