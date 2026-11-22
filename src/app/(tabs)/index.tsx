import BalanceCard from "@/components/BalanceCard";
import CreateSubscriptionModal, {
  NewSubscriptionData,
} from "@/components/CreateSubscriptionModal";
import Header from "@/components/Header";
import SubscriptionCard from "@/components/SubscriptionCard";
import UpcomingCard from "@/components/UpcomingCard";
import { upcomingRenewals } from "@/constants/data";
import { useSubscriptions } from "@/context/SubscriptionContext";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { subscriptions, addSubscription } = useSubscriptions();

  const handleAddSubscription = (newSub: NewSubscriptionData) => {
    addSubscription(newSub);
  };

  // Calculate dynamic total from all active subscriptions
  const totalSpend = useMemo(() => {
    const total = subscriptions.reduce((acc, sub) => {
      const priceNum = parseFloat(sub.price.replace(/[^0-9.]/g, "")) || 0;
      return acc + priceNum;
    }, 0);
    return total > 0 ? `$${total.toFixed(2)}` : "$2,489.48";
  }, [subscriptions]);

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
          paddingTop: 8,
          paddingBottom: 110,
        }}
      >
        <Header onAddPress={() => setIsModalVisible(true)} />

        <BalanceCard amount={totalSpend} date="03/18" />

        {/* Upcoming Section */}
        <View className="my-4 flex-row items-center justify-between">
          <Text className="text-xl font-sans-bold text-primary">Upcoming</Text>
          <Pressable
            onPress={() => router.push("/(tabs)/subscriptions")}
            className="rounded-full border border-black/20 px-3 py-1"
          >
            <Text className="text-xs font-sans-semibold text-primary">
              View all
            </Text>
          </Pressable>
        </View>

        <FlatList
          data={upcomingRenewals}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <UpcomingCard item={item} />}
        />

        {/* All Subscriptions Section */}
        <View className="mt-6 mb-4 flex-row items-center justify-between">
          <Text className="text-xl font-sans-bold text-primary">
            All Subscriptions
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

        <FlatList
          data={subscriptions}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => <SubscriptionCard item={item} />}
        />
      </ScrollView>

      <CreateSubscriptionModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAdd={handleAddSubscription}
      />
    </SafeAreaView>
  );
}
