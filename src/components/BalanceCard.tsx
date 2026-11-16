import React from "react";
import { Text, View } from "react-native";

interface BalanceCardProps {
  amount?: string;
  date?: string;
}

export default function BalanceCard({
  amount = "$2,489.48",
  date = "03/18",
}: BalanceCardProps) {
  return (
    <View
      className="my-3 min-h-[160px] justify-between p-6 rounded-bl-[36px] rounded-tr-[36px] rounded-tl-2xl rounded-br-2xl"
      style={{ backgroundColor: "#ea7a53" }}
    >
      <Text className="text-base font-sans-medium text-white/80">
        Balance
      </Text>
      <View className="flex-row items-baseline justify-between">
        <Text className="text-3xl font-sans-extrabold text-white">
          {amount}
        </Text>
        <Text className="text-base font-sans-medium text-white/80">
          {date}
        </Text>
      </View>
    </View>
  );
}
