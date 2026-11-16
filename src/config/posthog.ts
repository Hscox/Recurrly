export const posthog: any = {
  capture: (event: string, properties?: any) => {
    if (__DEV__) {
      console.log(`[PostHog: ${event}]`, properties || {});
    }
  },
  identify: (distinctId: string, properties?: any) => {
    if (__DEV__) {
      console.log(`[PostHog Identify: ${distinctId}]`, properties || {});
    }
  },
  reset: () => {},
  screen: (screenName: string) => {
    if (__DEV__) {
      console.log(`[PostHog Screen: ${screenName}]`);
    }
  },
  logger: {
    info: (msg: string, attr?: any) => {
      if (__DEV__) {
        console.log(`[PostHog Logger]`, msg, attr || {});
      }
    },
  },
};
