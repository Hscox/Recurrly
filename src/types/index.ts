export type BillingCycle = "Monthly" | "Yearly" | "Weekly";

export type SubscriptionCategory =
  | "Entertainment"
  | "Music"
  | "Productivity"
  | "Design"
  | "Shopping"
  | "Utilities"
  | "Finance"
  | "Other";

export type SubscriptionStatus = "active" | "inactive";

export interface Subscription {
  id: string;
  name: string;
  category: SubscriptionCategory | string;
  cycle: BillingCycle;
  price: string;
  amount: number;
  status: SubscriptionStatus;
  dueIn: string;
  nextRenewal: string;
  color: string;
  description?: string;
  createdAt: string;
}

export interface PresetService {
  name: string;
  category: SubscriptionCategory;
  defaultPrice: number;
  color: string;
  icon?: string;
}
