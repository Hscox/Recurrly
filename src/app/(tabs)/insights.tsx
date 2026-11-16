import { icons } from "@/constants/icons";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WEEKDAYS = [
  { day: "Mon", height: 80, isHighlighted: false },
  { day: "Tue", height: 68, isHighlighted: false },
  { day: "Wed", height: 50, isHighlighted: false },
  { day: "Thr", height: 105, isHighlighted: true, tooltip: "$40" },
  { day: "Fri", height: 75, isHighlighted: false },
  { day: "Sat", height: 46, isHighlighted: false },
  { day: "Sun", height: 55, isHighlighted: false },
];

export default function InsightsScreen() {
  const router = useRouter();

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
          paddingTop: 12,
          paddingBottom: 110,
        }}
      >
        {/* Top Bar */}
        <View className="flex-row items-center justify-between mb-6">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full items-center justify-center border border-black/10"
            style={{ backgroundColor: "#fff8e7" }}
            hitSlop={8}
          >
            <Ionicons name="chevron-back" size={20} color="#081126" />
          </Pressable>

          <Text className="text-xl font-sans-bold text-primary">
            Monthly Insights
          </Text>

          <Pressable
            className="w-10 h-10 rounded-full items-center justify-center border border-black/10"
            style={{ backgroundColor: "#fff8e7" }}
            hitSlop={8}
          >
            <Ionicons name="ellipsis-horizontal" size={20} color="#081126" />
          </Pressable>
        </View>

        {/* Upcoming Section Header */}
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-xl font-sans-bold text-primary">
            Upcoming
          </Text>
          <Pressable
            onPress={() => router.push("/(tabs)/subscriptions")}
            className="rounded-full border border-black/20 px-3 py-1"
          >
            <Text className="text-xs font-sans-semibold text-primary">
              View all
            </Text>
          </Pressable>
        </View>

        {/* Bar Chart Card */}
        <View
          className="rounded-3xl border border-black/10 p-5 mb-5"
          style={{ backgroundColor: "#fff8e7" }}
        >
          {/* Y-axis grid & Bars container */}
          <View className="h-44 flex-row items-end justify-between px-2 pt-8 pb-2 relative">
            {/* Horizontal Dashed Lines */}
            <View className="absolute left-0 right-0 top-6 border-b border-dashed border-black/10" />
            <View className="absolute left-0 right-0 top-16 border-b border-dashed border-black/10" />
            <View className="absolute left-0 right-0 top-26 border-b border-dashed border-black/10" />
            <View className="absolute left-0 right-0 bottom-6 border-b border-dashed border-black/10" />

            {/* Y-axis labels on left */}
            <View className="absolute -left-1 top-2 bottom-6 justify-between">
              <Text className="text-[10px] font-sans-medium text-black/40">45</Text>
              <Text className="text-[10px] font-sans-medium text-black/40">35</Text>
              <Text className="text-[10px] font-sans-medium text-black/40">25</Text>
              <Text className="text-[10px] font-sans-medium text-black/40">5</Text>
              <Text className="text-[10px] font-sans-medium text-black/40">0</Text>
            </View>

            {/* Bars */}
            <View className="flex-1 flex-row items-end justify-around ml-6">
              {WEEKDAYS.map((w) => (
                <View key={w.day} className="items-center">
                  {w.isHighlighted && w.tooltip && (
                    <View
                      className="px-2 py-0.5 rounded-md mb-1.5 shadow-sm"
                      style={{ backgroundColor: "#ffffff" }}
                    >
                      <Text className="text-[11px] font-sans-bold text-accent">
                        {w.tooltip}
                      </Text>
                    </View>
                  )}
                  <View
                    className="w-2.5 rounded-full"
                    style={{
                      height: w.height,
                      backgroundColor: w.isHighlighted ? "#ea7a53" : "#081126",
                    }}
                  />
                  <Text className="text-xs font-sans-medium text-black/60 mt-2">
                    {w.day}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Expenses Summary Card */}
        <View
          className="rounded-3xl border border-black/10 p-5 mb-6 flex-row items-center justify-between"
          style={{ backgroundColor: "#fff8e7" }}
        >
          <View>
            <Text className="text-base font-sans-bold text-primary">
              Expenses
            </Text>
            <Text className="text-xs font-sans-medium text-black/60 mt-0.5">
              March 2026
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-2xl font-sans-bold text-primary">
              -$424.63
            </Text>
            <Text className="text-xs font-sans-semibold text-emerald-600 mt-0.5">
              +12%
            </Text>
          </View>
        </View>

        {/* History Section Header */}
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-xl font-sans-bold text-primary">
            History
          </Text>
          <Pressable
            onPress={() => router.push("/(tabs)/subscriptions")}
            className="rounded-full border border-black/20 px-3 py-1"
          >
            <Text className="text-xs font-sans-semibold text-primary">
              View all
            </Text>
          </Pressable>
        </View>

        {/* History Cards */}
        <View className="gap-3">
          {/* Card 1: Claude */}
          <View
            className="rounded-2xl p-4 flex-row items-center justify-between shadow-xs"
            style={{ backgroundColor: "#eed766" }}
          >
            <View className="flex-row items-center gap-3 flex-1">
              <View className="w-12 h-12 rounded-xl bg-[#081126] items-center justify-center">
                <Image
                  source={icons.claude}
                  style={{ width: 28, height: 28, tintColor: "#ffffff" }}
                  resizeMode="contain"
                />
              </View>
              <View>
                <Text className="text-base font-sans-bold text-primary">
                  Claude
                </Text>
                <Text className="text-xs font-sans-medium text-black/60 mt-0.5">
                  June 25, 12:00
                </Text>
              </View>
            </View>

            <View className="items-end">
              <Text className="text-base font-sans-bold text-primary">
                $9.84
              </Text>
              <Text className="text-xs font-sans-medium text-black/60">
                per month
              </Text>
            </View>
          </View>

          {/* Card 2: Canva */}
          <View
            className="rounded-2xl p-4 flex-row items-center justify-between shadow-xs"
            style={{ backgroundColor: "#c3eed4" }}
          >
            <View className="flex-row items-center gap-3 flex-1">
              <View className="w-12 h-12 rounded-xl bg-[#081126] items-center justify-center">
                <Image
                  source={icons.canva}
                  style={{ width: 28, height: 28, tintColor: "#ffffff" }}
                  resizeMode="contain"
                />
              </View>
              <View>
                <Text className="text-base font-sans-bold text-primary">
                  Canva
                </Text>
                <Text className="text-xs font-sans-medium text-black/60 mt-0.5">
                  June 30, 16:00
                </Text>
              </View>
            </View>

            <View className="items-end">
              <Text className="text-base font-sans-bold text-primary">
                $43.89
              </Text>
              <Text className="text-xs font-sans-medium text-black/60">
                per month
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
