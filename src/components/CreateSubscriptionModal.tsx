import { icons } from "@/constants/icons";
import {
  detectBrand,
  getInitials,
  getMonogramBackground,
} from "@/utils/subscriptionUtils";
import React, { useState } from "react";
import SubscriptionIcon from "./SubscriptionIcon";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface NewSubscriptionData {
  id: string;
  name: string;
  price: string;
  frequency: "Monthly" | "Yearly";
  category: string;
  status: "active";
  startDate: string;
  renewalDate: string;
  firstBill?: string;
  paymentMethod: string;
  icon: any;
  billing: string;
  color: string;
  iconType?: "image" | "vector" | "monogram";
  vectorIcon?: string;
  monogram?: string;
  iconBg?: string;
  iconColor?: string;
}

interface CreateSubscriptionModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (subscription: NewSubscriptionData) => void;
}

const CATEGORIES = [
  "Entertainment",
  "AI Tools",
  "Developer Tools",
  "Design",
  "Productivity",
  "Other",
];

const CATEGORY_DEFAULT_COLORS: Record<string, string> = {
  Entertainment: "#ff7666",
  "AI Tools": "#cfe2fe",
  "Developer Tools": "#ded2f9",
  Design: "#eed766",
  Productivity: "#eadece",
  Other: "#fed7aa",
};

export default function CreateSubscriptionModal({
  visible,
  onClose,
  onAdd,
}: CreateSubscriptionModalProps) {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [frequency, setFrequency] = useState<"Monthly" | "Yearly">("Monthly");
  const [category, setCategory] = useState<string>("Other");

  const detectedBrand = detectBrand(name.trim());

  const handleNameChange = (val: string) => {
    setName(val);
    const matched = detectBrand(val.trim());
    if (matched?.category) {
      setCategory(matched.category);
    }
  };

  const parsedPrice = parseFloat(price);
  const isValid = name.trim().length > 0 && !isNaN(parsedPrice) && parsedPrice > 0;

  const resetForm = () => {
    setName("");
    setPrice("");
    setFrequency("Monthly");
    setCategory("Other");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = () => {
    if (!isValid) return;

    const brand = detectBrand(name.trim());
    const finalCategory = brand ? brand.category : category;
    const finalColor = brand ? brand.color : (CATEGORY_DEFAULT_COLORS[category] || "#eed766");

    let finalIcon: any = icons.wallet;
    let finalIconType: "image" | "vector" | "monogram" = "monogram";
    let finalVectorIcon: string | undefined = undefined;
    let finalMonogram: string | undefined = undefined;
    let finalIconBg: string | undefined = undefined;

    if (brand) {
      finalIcon = brand.icon || icons.wallet;
      finalIconType = brand.iconType;
      finalVectorIcon = brand.vectorIcon;
      finalMonogram = brand.monogram;
      finalIconBg = brand.iconBg;
    } else {
      finalIconType = "monogram";
      finalMonogram = getInitials(name.trim());
      finalIconBg = getMonogramBackground(name.trim(), category);
    }

    const newSub: NewSubscriptionData = {
      id: Date.now().toString(),
      name: name.trim(),
      price: `$${parsedPrice.toFixed(2)}`,
      frequency,
      category: finalCategory,
      status: "active",
      startDate: "Mar 25, 2026",
      renewalDate: frequency === "Monthly" ? "Apr 25, 2026" : "Mar 25, 2027",
      firstBill: "Mar 25, 2026",
      paymentMethod: "Card",
      icon: finalIcon,
      billing: frequency === "Monthly" ? "Monthly" : "Yearly",
      color: finalColor,
      iconType: finalIconType,
      vectorIcon: finalVectorIcon,
      monogram: finalMonogram,
      iconBg: finalIconBg,
      iconColor: "#ffffff",
    };

    onAdd(newSub);
    handleClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View className="flex-1 justify-end bg-black/40">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="w-full"
        >
          <View
            className="rounded-t-3xl p-6"
            style={{
              backgroundColor: "#fff9e3",
              paddingBottom: Math.max(insets.bottom, 24),
            }}
          >
            {/* Header */}
            <View className="flex-row items-center justify-between pb-4">
              <Text className="text-xl font-sans-bold text-primary">
                New Subscription
              </Text>
              <Pressable
                onPress={handleClose}
                className="w-8 h-8 items-center justify-center rounded-full bg-black/5"
                hitSlop={8}
              >
                <Text className="text-sm font-sans-bold text-primary">✕</Text>
              </Pressable>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* Name */}
              <View className="mb-4">
                <Text className="text-sm font-sans-semibold text-primary mb-1.5">
                  Name
                </Text>
                <View
                  className="flex-row items-center rounded-2xl border px-4 py-1.5"
                  style={{
                    backgroundColor: "#fff8e7",
                    borderColor: "rgba(0, 0, 0, 0.08)",
                  }}
                >
                  <TextInput
                    value={name}
                    onChangeText={handleNameChange}
                    placeholder="Subscription name"
                    placeholderTextColor="rgba(8, 17, 38, 0.4)"
                    className="flex-1 py-2 text-base font-sans-medium text-primary"
                    autoCapitalize="words"
                  />
                  {name.trim().length > 0 && (
                    <View className="ml-2">
                      <SubscriptionIcon
                        item={{
                          name: name.trim(),
                          category,
                          icon: detectedBrand?.icon,
                          iconType: detectedBrand?.iconType,
                          vectorIcon: detectedBrand?.vectorIcon,
                          monogram: detectedBrand?.monogram,
                          iconBg: detectedBrand?.iconBg,
                        }}
                        size={34}
                      />
                    </View>
                  )}
                </View>
              </View>

              {/* Price */}
              <View className="mb-4">
                <Text className="text-sm font-sans-semibold text-primary mb-1.5">
                  Price
                </Text>
                <TextInput
                  value={price}
                  onChangeText={setPrice}
                  placeholder="0.00"
                  placeholderTextColor="rgba(8, 17, 38, 0.4)"
                  keyboardType="decimal-pad"
                  className="rounded-2xl border px-4 py-3 text-base font-sans-medium text-primary"
                  style={{
                    backgroundColor: "#fff8e7",
                    borderColor: "rgba(0, 0, 0, 0.08)",
                  }}
                />
              </View>

              {/* Frequency */}
              <View className="mb-4">
                <Text className="text-sm font-sans-semibold text-primary mb-1.5">
                  Frequency
                </Text>
                <View className="flex-row gap-3">
                  <Pressable
                    onPress={() => setFrequency("Monthly")}
                    className="flex-1 py-3 rounded-2xl items-center justify-center border"
                    style={{
                      backgroundColor:
                        frequency === "Monthly" ? "#fbe8e4" : "#fff8e7",
                      borderColor:
                        frequency === "Monthly"
                          ? "#ea7a53"
                          : "rgba(0, 0, 0, 0.08)",
                    }}
                  >
                    <Text
                      className="text-sm font-sans-semibold"
                      style={{
                        color: frequency === "Monthly" ? "#ea7a53" : "#081126",
                      }}
                    >
                      Monthly
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => setFrequency("Yearly")}
                    className="flex-1 py-3 rounded-2xl items-center justify-center border"
                    style={{
                      backgroundColor:
                        frequency === "Yearly" ? "#fbe8e4" : "#fff8e7",
                      borderColor:
                        frequency === "Yearly"
                          ? "#ea7a53"
                          : "rgba(0, 0, 0, 0.08)",
                    }}
                  >
                    <Text
                      className="text-sm font-sans-semibold"
                      style={{
                        color: frequency === "Yearly" ? "#ea7a53" : "#081126",
                      }}
                    >
                      Yearly
                    </Text>
                  </Pressable>
                </View>
              </View>

              {/* Category */}
              <View className="mb-6">
                <Text className="text-sm font-sans-semibold text-primary mb-1.5">
                  Category
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {CATEGORIES.map((cat) => {
                    const isSelected = category === cat;
                    return (
                      <Pressable
                        key={cat}
                        onPress={() => setCategory(cat)}
                        className="px-4 py-2 rounded-full border"
                        style={{
                          backgroundColor: isSelected ? "#fbe8e4" : "#fff8e7",
                          borderColor: isSelected
                            ? "#ea7a53"
                            : "rgba(0, 0, 0, 0.08)",
                        }}
                      >
                        <Text
                          className="text-xs font-sans-semibold"
                          style={{
                            color: isSelected ? "#ea7a53" : "#081126",
                          }}
                        >
                          {cat}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              {/* Create Subscription Button */}
              <Pressable
                onPress={handleSubmit}
                disabled={!isValid}
                className="items-center justify-center rounded-2xl py-4 active:opacity-90 shadow-sm"
                style={{
                  backgroundColor: isValid ? "#ea7a53" : "rgba(234, 122, 83, 0.4)",
                }}
              >
                <Text className="text-base font-sans-bold text-primary">
                  Create Subscription
                </Text>
              </Pressable>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}
