import { useClerk, useUser } from "@clerk/clerk-expo";
import { posthog } from "@/config/posthog";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out of your Recurrly account?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            setSigningOut(true);
            try {
              await signOut();
              posthog?.reset();
              router.replace("/(auth)/sign-in");
            } catch (err) {
              Alert.alert("Error", "Failed to sign out. Please try again.");
            } finally {
              setSigningOut(false);
            }
          },
        },
      ]
    );
  };

  const displayName =
    user?.firstName ||
    user?.fullName ||
    user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] ||
    "Adrian";

  const emailAddress =
    user?.primaryEmailAddress?.emailAddress ||
    user?.emailAddresses?.[0]?.emailAddress ||
    "adrianhajdin00@gmail.com";

  const avatarSource = user?.imageUrl
    ? { uri: user.imageUrl }
    : require("@/assets/images/avatar.png");

  // Format account id and joined date
  const accountId = user?.id || "user_3BSCWwxsAQf1QKP8792";
  const displayAccountId =
    accountId.length > 20 ? `${accountId.slice(0, 20)}...` : accountId;

  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "25.03.2026.";

  return (
    <SafeAreaView
      className="flex-1 bg-background"
      style={{ flex: 1, backgroundColor: "#fff9e3" }}
      edges={["top"]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 110,
        }}
      >
        <Text className="text-3xl font-sans-bold text-primary mb-6">
          Settings
        </Text>

        {/* Profile Card */}
        <View
          className="rounded-3xl border border-black/10 p-5 mb-5 flex-row items-center gap-4"
          style={{ backgroundColor: "#fff8e7" }}
        >
          <View className="w-16 h-16 rounded-2xl overflow-hidden bg-[#e0e7ff] items-center justify-center">
            <Image
              source={avatarSource}
              style={{ width: 64, height: 64 }}
              resizeMode="cover"
            />
          </View>
          <View className="flex-1">
            <Text className="text-xl font-sans-bold text-primary">
              {displayName}
            </Text>
            <Text className="text-sm font-sans-medium text-black/60 mt-0.5">
              {emailAddress}
            </Text>
          </View>
        </View>

        {/* Account Info Card */}
        <View
          className="rounded-3xl border border-black/10 p-5 mb-6"
          style={{ backgroundColor: "#fff8e7" }}
        >
          <Text className="text-sm font-sans-bold text-primary mb-4">
            Account
          </Text>

          <View className="flex-row items-center justify-between py-2 border-b border-black/5">
            <Text className="text-sm font-sans-medium text-black/60">
              Account ID
            </Text>
            <Text className="text-xs font-sans-medium text-primary">
              {displayAccountId}
            </Text>
          </View>

          <View className="flex-row items-center justify-between py-2 pt-3">
            <Text className="text-sm font-sans-medium text-black/60">
              Joined
            </Text>
            <Text className="text-xs font-sans-medium text-primary">
              {joinedDate}
            </Text>
          </View>
        </View>

        {/* Sign Out Button */}
        <Pressable
          onPress={handleSignOut}
          disabled={signingOut}
          className="items-center justify-center rounded-2xl py-4 active:opacity-90 shadow-sm"
          style={{ backgroundColor: "#ea7a53" }}
        >
          {signingOut ? (
            <ActivityIndicator size="small" color="#081126" />
          ) : (
            <Text className="text-base font-sans-bold text-primary">
              Sign Out
            </Text>
          )}
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
