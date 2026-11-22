import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

interface HeaderProps {
  onAddPress?: () => void;
  showAdd?: boolean;
}

export default function Header({ onAddPress, showAdd = true }: HeaderProps) {
  const { user } = useUser();

  const userEmail =
    user?.primaryEmailAddress?.emailAddress ||
    user?.emailAddresses?.[0]?.emailAddress ||
    user?.firstName ||
    "adrianhajdin00@gmail.com";

  const avatarSource = user?.imageUrl
    ? { uri: user.imageUrl }
    : require("@/assets/images/avatar.png");

  return (
    <View className="mb-2 flex-row items-center justify-between pt-1">
      <View className="flex-row items-center gap-3 flex-1 pr-2">
        <View className="w-12 h-12 rounded-full overflow-hidden bg-[#6366f1] items-center justify-center">
          <Image
            source={avatarSource}
            style={{ width: 48, height: 48, borderRadius: 24 }}
            resizeMode="cover"
          />
        </View>
        <Text
          className="text-base font-sans-bold text-primary flex-1"
          numberOfLines={1}
        >
          {userEmail}
        </Text>
      </View>

      {showAdd && onAddPress && (
        <Pressable
          onPress={onAddPress}
          className="w-11 h-11 items-center justify-center rounded-full active:opacity-70"
          hitSlop={12}
        >
          <Ionicons name="add" size={32} color="#081126" />
        </Pressable>
      )}
    </View>
  );
}
