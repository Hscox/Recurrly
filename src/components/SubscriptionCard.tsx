import clsx from "@/utils/clsx";
import React, { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { useSubscriptions } from "@/context/SubscriptionContext";
import SubscriptionIcon from "./SubscriptionIcon";
import { getSubscriptionColor } from "@/utils/subscriptionUtils";

export interface SubscriptionItemData {
  id: string;
  name: string;
  category: string;
  price: string;
  billing: string;
  firstBill?: string;
  paymentMethod?: string;
  status?: string;
  startDate?: string;
  renewalDate?: string;
  icon?: any;
  imageUrl?: string;
  color?: string;
  frequency?: "Monthly" | "Yearly";
  iconType?: "image" | "vector" | "monogram";
  vectorIcon?: string;
  monogram?: string;
  iconBg?: string;
  iconColor?: string;
}

interface SubscriptionCardProps {
  item: SubscriptionItemData;
}

export default function SubscriptionCard({ item }: SubscriptionCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { removeSubscription } = useSubscriptions();

  const cardColor =
    item.color || getSubscriptionColor(item.name, item.category);

  const handleCancel = () => {
    Alert.alert(
      "Cancel Subscription",
      `Are you sure you want to cancel your ${item.name} subscription?`,
      [
        { text: "Keep", style: "cancel" },
        {
          text: "Cancel Subscription",
          style: "destructive",
          onPress: () => {
            removeSubscription(item.id);
          },
        },
      ]
    );
  };

  return (
    <Pressable
      onPress={() => setExpanded(!expanded)}
      style={{ backgroundColor: cardColor }}
      className={clsx(
        "rounded-2xl p-4 mb-3 border border-black/5 shadow-sm",
        expanded && "shadow-md"
      )}
    >
      <View className="sub-head">
        <View className="sub-main">
          <SubscriptionIcon item={item} size={54} />
          <View className="sub-copy">
            <Text className="sub-title" numberOfLines={1}>
              {item.name}
            </Text>
            <Text className="sub-meta" numberOfLines={1}>
              {item.category}
            </Text>
          </View>
        </View>
        <View className="sub-price-box">
          <Text className="sub-price">{item.price}</Text>
          <Text className="sub-billing">{item.billing}</Text>
        </View>
      </View>

      {expanded && (
        <View className="mt-4 pt-3 border-t border-black/10">
          <View className="sub-details">
            {item.firstBill && (
              <View className="sub-row">
                <Text className="sub-label">First bill:</Text>
                <Text className="sub-value">{item.firstBill}</Text>
              </View>
            )}
            {item.paymentMethod && (
              <View className="sub-row">
                <Text className="sub-label">Payment:</Text>
                <Text className="sub-value">{item.paymentMethod}</Text>
              </View>
            )}
          </View>

          {/* Cancel Subscription Button */}
          <Pressable
            onPress={handleCancel}
            className="mt-4 items-center justify-center rounded-full bg-[#081126] py-3.5 active:opacity-90"
          >
            <Text className="font-sans-bold text-white text-sm">
              Cancel Subscription
            </Text>
          </Pressable>
        </View>
      )}
    </Pressable>
  );
}
