import React, { createContext, useContext, useState } from 'react';
import { allSubscriptions } from '@/constants/data';
import { NewSubscriptionData } from '@/components/CreateSubscriptionModal';
import { SubscriptionItemData } from '@/components/SubscriptionCard';

export type SubscriptionItem = SubscriptionItemData;

interface SubscriptionContextType {
  subscriptions: SubscriptionItem[];
  addSubscription: (newSub: NewSubscriptionData) => void;
  updateSubscription: (updatedSub: SubscriptionItem) => void;
  removeSubscription: (id: string) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>(
    allSubscriptions as SubscriptionItem[]
  );

  const addSubscription = (newSub: NewSubscriptionData) => {
    setSubscriptions((prev) => [newSub, ...prev]);
  };

  const updateSubscription = (updatedSub: SubscriptionItem) => {
    setSubscriptions((prev) =>
      prev.map((item) => (item.id === updatedSub.id ? updatedSub : item))
    );
  };

  const removeSubscription = (id: string) => {
    setSubscriptions((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <SubscriptionContext.Provider
      value={{ subscriptions, addSubscription, updateSubscription, removeSubscription }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscriptions() {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscriptions must be used within a SubscriptionProvider');
  }
  return context;
}
