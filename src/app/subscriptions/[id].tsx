import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SubscriptionIcon from "@/components/SubscriptionIcon";
import { posthog } from "@/config/posthog";
import { useSubscriptions } from "@/context/SubscriptionContext";
import { getSubscriptionColor } from "@/utils/subscriptionUtils";

export default function SubscriptionDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { subscriptions, removeSubscription } = useSubscriptions();

  const subscription = subscriptions.find((s) => s.id === id);

  if (!subscription) {
    return (
      <SafeAreaView
        className="flex-1 bg-background justify-center items-center px-6"
        style={{ backgroundColor: "#fff9e3" }}
      >
        <Ionicons name="alert-circle-outline" size={54} color="#ea7a53" />
        <Text className="text-2xl font-sans-bold text-primary mt-4 mb-2">
          Subscription Not Found
        </Text>
        <Text className="text-sm font-sans-medium text-muted-foreground text-center mb-6">
          This plan may have been canceled or removed.
        </Text>
        <Pressable
          onPress={() => router.back()}
          className="rounded-full bg-accent px-6 py-3"
        >
          <Text className="font-sans-bold text-background">Go Back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const cardColor =
    subscription.color ||
    getSubscriptionColor(subscription.name, subscription.category);

  const handleCancel = () => {
    Alert.alert(
      "Cancel Subscription",
      `Are you sure you want to cancel your ${subscription.name} subscription?`,
      [
        { text: "Keep", style: "cancel" },
        {
          text: "Cancel Subscription",
          style: "destructive",
          onPress: () => {
            removeSubscription(subscription.id);
            posthog?.capture("subscription_cancelled", {
              category: subscription.category,
              billing_frequency: subscription.billing.toLowerCase(),
            });
            posthog?.logger?.info("subscription cancelled", {
              event: "subscription_cancelled",
              category: subscription.category,
              billing_frequency: subscription.billing.toLowerCase(),
            });
            router.back();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView
      className="flex-1 bg-background"
      style={{ backgroundColor: "#fff9e3" }}
      edges={["top"]}
    >
      {/* Top Header */}
      <View className="flex-row items-center justify-between border-b border-border/50 px-5 py-3">
        <Pressable
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full bg-card border border-black/10"
        >
          <Ionicons name="arrow-back" size={20} color="#081126" />
        </Pressable>
        <Text className="text-lg font-sans-bold text-primary">
          Plan Details
        </Text>
        <View className="w-10" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
      >
        {/* Main Card Hero */}
        <View
          style={{ backgroundColor: cardColor }}
          className="mt-5 rounded-3xl p-6 border border-black/5 shadow-sm items-center"
        >
          <SubscriptionIcon item={subscription} size={72} />
          <Text className="text-2xl font-sans-bold text-primary mt-4">
            {subscription.name}
          </Text>
          <Text className="text-sm font-sans-medium text-muted-foreground mt-0.5">
            {subscription.category}
          </Text>

          <View className="mt-4 flex-row items-baseline gap-1">
            <Text className="text-4xl font-sans-extrabold text-primary">
              {subscription.price}
            </Text>
            <Text className="text-base font-sans-medium text-muted-foreground">
              {subscription.billing}
            </Text>
          </View>
        </View>

        {/* Details List */}
        <View className="mt-6 rounded-3xl border border-border bg-card p-5">
          <Text className="text-xs font-sans-bold uppercase tracking-[1px] text-muted-foreground mb-4">
            Billing & Payment
          </Text>

          <View className="flex-row items-center justify-between py-3 border-b border-border/50">
            <Text className="text-sm font-sans-medium text-muted-foreground">
              Status
            </Text>
            <View className="flex-row items-center gap-1.5 rounded-full bg-green-500/15 px-3 py-1">
              <View className="h-2 w-2 rounded-full bg-green-600" />
              <Text className="text-xs font-sans-bold text-green-700 capitalize">
                Active
              </Text>
            </View>
          </View>

          {subscription.firstBill ? (
            <View className="flex-row items-center justify-between py-3 border-b border-border/50">
              <Text className="text-sm font-sans-medium text-muted-foreground">
                First Bill
              </Text>
              <Text className="text-sm font-sans-semibold text-primary">
                {subscription.firstBill}
              </Text>
            </View>
          ) : null}

          {subscription.paymentMethod ? (
            <View className="flex-row items-center justify-between py-3 border-b border-border/50">
              <Text className="text-sm font-sans-medium text-muted-foreground">
                Payment Method
              </Text>
              <Text className="text-sm font-sans-semibold text-primary">
                {subscription.paymentMethod}
              </Text>
            </View>
          ) : null}

          <View className="flex-row items-center justify-between py-3">
            <Text className="text-sm font-sans-medium text-muted-foreground">
              Category
            </Text>
            <Text className="text-sm font-sans-semibold text-primary">
              {subscription.category}
            </Text>
          </View>
        </View>

        {/* Cancel Button */}
        <View className="mt-6">
          <Pressable
            onPress={handleCancel}
            className="flex-row items-center justify-center gap-2 rounded-2xl bg-red-500/15 border border-red-500/25 py-4"
          >
            <Ionicons name="trash-outline" size={18} color="#dc2626" />
            <Text className="text-base font-sans-bold text-red-600">
              Cancel Subscription
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
