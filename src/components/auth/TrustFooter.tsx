import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const TrustFooter: React.FC = () => {
  return (
    <View className="mt-8 items-center gap-2">
      <View className="flex-row items-center gap-1.5">
        <Ionicons name="shield-checkmark" size={15} color="#ea7a53" />
        <Text className="text-xs font-sans-medium text-muted-foreground">
          256-bit Bank-Grade Encryption
        </Text>
      </View>
      <Text className="text-[11px] font-sans-regular text-muted-foreground/80 text-center px-6">
        Recurrly keeps your credentials secure and never shares your personal financial data.
      </Text>
    </View>
  );
};
