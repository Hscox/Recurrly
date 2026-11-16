type EventProperties = Record<string, any>;

export const trackEvent = (
  eventName: string,
  properties?: EventProperties,
) => {
  if (__DEV__) {
    console.log(`[Analytics: ${eventName}]`, properties || {});
  }
};

export const analytics = {
  userSignedIn: (userId: string, email?: string) =>
    trackEvent("user_signed_in", { userId, email }),
  
  subscriptionCreated: (subscription: {
    id: string;
    name: string;
    amount: number;
    cycle: string;
    category: string;
  }) => trackEvent("subscription_created", subscription),

  subscriptionDetailsViewed: (subscriptionId: string, name: string) =>
    trackEvent("subscription_details_viewed", { subscriptionId, name }),

  subscriptionStatusUpdated: (subscriptionId: string, status: string) =>
    trackEvent("subscription_status_updated", { subscriptionId, status }),

  subscriptionDeleted: (subscriptionId: string, name: string) =>
    trackEvent("subscription_deleted", { subscriptionId, name }),
};
