import React from 'react';
import { View, Text } from 'react-native';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  email?: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle, email }) => {
  return (
    <View className="items-center mt-2 mb-6">
      {/* Brand Logo Row */}
      <View className="flex-row items-center gap-3 mb-6">
        <View className="w-14 h-14 rounded-2xl bg-accent items-center justify-center shadow-sm">
          <Text className="text-2xl font-sans-extrabold text-background">R</Text>
        </View>
        <View>
          <Text className="text-3xl font-sans-extrabold text-primary leading-tight">
            Recurrly
          </Text>
          <Text className="-mt-1 text-[11px] font-sans-semibold uppercase tracking-[1.5px] text-muted-foreground">
            SUBSCRIPTIONS
          </Text>
        </View>
      </View>

      {/* Screen Title & Subtitle */}
      <Text className="text-3xl font-sans-bold text-primary text-center">
        {title}
      </Text>
      <Text className="mt-2 max-w-[320px] text-center text-base font-sans-medium text-muted-foreground">
        {subtitle}
      </Text>
      {email ? (
        <Text className="mt-0.5 text-center text-base font-sans-bold text-primary">
          {email}
        </Text>
      ) : null}
    </View>
  );
};
