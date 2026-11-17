import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants/icons";
import { posthog } from "@/config/posthog";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView
      className="flex-1 bg-background justify-between px-6 py-8"
      style={{ backgroundColor: "#fff9e3" }}
    >
      <View className="items-center mt-8">
        <View className="h-16 w-16 rounded-2xl bg-accent items-center justify-center shadow-md mb-6">
          <Text className="text-3xl font-sans-extrabold text-background">R</Text>
        </View>

        <Text className="text-4xl font-sans-extrabold text-primary text-center">
          Recurrly
        </Text>
        <Text className="text-sm font-sans-bold uppercase tracking-[2px] text-muted-foreground mt-1 mb-4">
          SUBSCRIPTION TRACKER
        </Text>
        <Text className="text-base font-sans-medium text-muted-foreground text-center max-w-[280px]">
          Take back control of your recurring subscriptions, memberships, and monthly bills.
        </Text>
      </View>

      <View className="gap-5 my-8">
        <View className="flex-row items-center gap-4 rounded-3xl bg-card border border-border p-4">
          <View className="h-12 w-12 rounded-2xl bg-accent/15 items-center justify-center">
            <Ionicons name="wallet-outline" size={24} color="#ea7a53" />
          </View>
          <View className="flex-1">
            <Text className="text-base font-sans-bold text-primary">
              All Plans in One Place
            </Text>
            <Text className="text-xs font-sans-medium text-muted-foreground">
              Monitor monthly & yearly commitments effortlessly.
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-4 rounded-3xl bg-card border border-border p-4">
          <View className="h-12 w-12 rounded-2xl bg-subscription/40 items-center justify-center">
            <Ionicons name="notifications-outline" size={24} color="#081126" />
          </View>
          <View className="flex-1">
            <Text className="text-base font-sans-bold text-primary">
              Renewal Reminders
            </Text>
            <Text className="text-xs font-sans-medium text-muted-foreground">
              Never get caught off guard by surprise auto-renewals.
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-4 rounded-3xl bg-card border border-border p-4">
          <View className="h-12 w-12 rounded-2xl bg-[#ded2f9] items-center justify-center">
            <Ionicons name="pie-chart-outline" size={24} color="#081126" />
          </View>
          <View className="flex-1">
            <Text className="text-base font-sans-bold text-primary">
              Smart Spending Insights
            </Text>
            <Text className="text-xs font-sans-medium text-muted-foreground">
              Visualize breakdown by category and find opportunities to save.
            </Text>
          </View>
        </View>
      </View>

      <View className="mb-4">
        <Pressable
          onPress={() => {
            posthog?.capture("onboarding_completed");
            posthog?.logger?.info("onboarding completed", {
              event: "onboarding_completed",
            });
            router.replace("/(tabs)");
          }}
          className="rounded-2xl bg-accent py-4 items-center justify-center shadow-md active:opacity-90"
        >
          <Text className="text-base font-sans-bold text-primary">
            Get Started
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
