import { NewSubscriptionData } from "@/components/CreateSubscriptionModal";
import { SubscriptionItemData } from "@/components/SubscriptionCard";
import { api } from "@/config/api";
import { allSubscriptions } from "@/constants/data";
import { detectBrand, getSubscriptionColor } from "@/utils/subscriptionUtils";
import React, { createContext, useContext, useEffect, useState } from "react";

export type SubscriptionItem = SubscriptionItemData;

interface SubscriptionContextType {
  subscriptions: SubscriptionItem[];
  addSubscription: (newSub: NewSubscriptionData) => void;
  updateSubscription: (updatedSub: SubscriptionItem) => void;
  removeSubscription: (id: string) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(
  undefined,
);

export function SubscriptionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>(
    allSubscriptions as SubscriptionItem[],
  );

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await api.get("/subscriptions");

        if (Array.isArray(res.data) && res.data.length > 0) {
          const mapped: SubscriptionItem[] = res.data.map((item: any) => {
            const brand = detectBrand(item.name);
            return {
              ...item,
              id: String(item.id),
              icon: brand?.icon,
              iconType: brand?.iconType,
              vectorIcon: brand?.vectorIcon,
              monogram: brand?.monogram,
              iconBg: brand?.iconBg,
              color:
                item.color || getSubscriptionColor(item.name, item.category),
            };
          });
          setSubscriptions(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch subscriptions from Laravel:", err);
      }
    };

    fetchSubscriptions();
  }, []);

  const addSubscription = async (newSub: NewSubscriptionData) => {
    try {
      const res = await api.post("/subscriptions", {
        name: newSub.name,
        price: newSub.price,
        frequency: newSub.frequency,
        category: newSub.category,
        billing: newSub.billing,
        firstBill: newSub.firstBill,
        paymentMethod: newSub.paymentMethod,
        color: newSub.color,
      });

      const savedSub: SubscriptionItem = {
        ...newSub,
        id: String(res.data.id ?? newSub.id),
      };

      setSubscriptions((prev) => [savedSub, ...prev]);
    } catch (err: any) {
      console.error(
        "Failed to save subscription:",
        err?.response?.data || err.message,
      );
      setSubscriptions((prev) => [newSub, ...prev]);
    }
  };

  const updateSubscription = (updatedSub: SubscriptionItem) => {
    setSubscriptions((prev) =>
      prev.map((item) => (item.id === updatedSub.id ? updatedSub : item)),
    );
  };

  const removeSubscription = async (id: string) => {
    setSubscriptions((prev) => prev.filter((item) => item.id !== id));

    try {
      await api.delete(`/subscriptions/${id}`);
    } catch (err: any) {
      console.error(
        "Failed to delete subscription:",
        err?.response?.data || err.message,
      );
    }
  };

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptions,
        addSubscription,
        updateSubscription,
        removeSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscriptions() {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error(
      "useSubscriptions must be used within a SubscriptionProvider",
    );
  }
  return context;
}
