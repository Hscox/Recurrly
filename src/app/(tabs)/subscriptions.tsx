import CreateSubscriptionModal, {
  NewSubscriptionData,
} from "@/components/CreateSubscriptionModal";
import SubscriptionCard from "@/components/SubscriptionCard";
import { useSubscriptions } from "@/context/SubscriptionContext";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { FlatList, Pressable, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SubscriptionsScreen() {
  const { subscriptions, addSubscription } = useSubscriptions();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSubscriptions = useMemo(() => {
    if (!searchQuery.trim()) return subscriptions;
    const q = searchQuery.toLowerCase().trim();
    return subscriptions.filter(
      (s) =>
        (s?.name || "").toLowerCase().includes(q) ||
        (s?.category || "").toLowerCase().includes(q),
    );
  }, [subscriptions, searchQuery]);

  const handleAddSubscription = (newSub: NewSubscriptionData) => {
    addSubscription(newSub);
  };

  return (
    <SafeAreaView
      className="flex-1 bg-background"
      style={{ flex: 1, backgroundColor: "#fff9e3" }}
      edges={["top"]}
    >
      <FlatList
        data={filteredSubscriptions}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 110,
        }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="mb-4">
            {/* Search Input Bar & Add Button */}
            <View className="flex-row items-center gap-2">
              <View
                className="flex-1 flex-row items-center rounded-2xl border px-4 py-3"
                style={{
                  backgroundColor: "#fff8e7",
                  borderColor: "rgba(0, 0, 0, 0.08)",
                }}
              >
                <Ionicons
                  name="search-outline"
                  size={18}
                  color="rgba(8, 17, 38, 0.45)"
                  style={{ marginRight: 8 }}
                />
                <TextInput
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Search subscriptions..."
                  placeholderTextColor="rgba(8, 17, 38, 0.4)"
                  className="flex-1 text-base font-sans-medium text-primary"
                  autoCapitalize="none"
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                />
              </View>

              <Pressable
                onPress={() => setIsModalVisible(true)}
                className="w-12 h-12 rounded-2xl items-center justify-center shadow-sm active:opacity-80"
                style={{ backgroundColor: "#ea7a53" }}
                hitSlop={8}
              >
                <Ionicons name="add" size={26} color="#081126" />
              </Pressable>
            </View>
          </View>
        }
        renderItem={({ item }) => <SubscriptionCard item={item} />}
      />

      <CreateSubscriptionModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAdd={handleAddSubscription}
      />
    </SafeAreaView>
  );
}
