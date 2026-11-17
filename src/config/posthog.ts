import Constants from "expo-constants";
import PostHog from "posthog-react-native";

const extra = Constants.expoConfig?.extra;
const projectToken =
  (process.env.EXPO_PUBLIC_POSTHOG_PROJECT_TOKEN as string | undefined) ||
  (extra?.posthogProjectToken as string | undefined);
const host =
  (process.env.EXPO_PUBLIC_POSTHOG_HOST as string | undefined) ||
  (extra?.posthogHost as string | undefined) ||
  "https://us.i.posthog.com";
const isPostHogConfigured = Boolean(projectToken && host);

if (!isPostHogConfigured && __DEV__) {
  if (!projectToken) {
    console.error(
      "EXPO_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once EXPO_PUBLIC_POSTHOG_PROJECT_TOKEN is configured"
    );
  }

  if (!host) {
    console.error(
      "EXPO_PUBLIC_POSTHOG_HOST variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once EXPO_PUBLIC_POSTHOG_HOST is configured"
    );
  }
}

export const posthog = isPostHogConfigured
  ? new PostHog(projectToken!, {
      host: host!,
      captureAppLifecycleEvents: true,
      flushAt: 1,
      flushInterval: 1000,
      errorTracking: {
        autocapture: {
          uncaughtExceptions: true,
          unhandledRejections: true,
        },
      },
      logs: {
        serviceName: "recurrly-mobile",
        environment: __DEV__ ? "development" : "production",
        serviceVersion: Constants.expoConfig?.version,
      },
    })
  : undefined;

posthog?.debug(__DEV__);

// Polyfill logger if not natively provided by posthog-react-native
if (posthog && !(posthog as any).logger) {
  (posthog as any).logger = {
    info: (msg: string, attr?: any) => {
      if (__DEV__) {
        console.log(`[PostHog Log] ${msg}`, attr || {});
      }
    },
    warn: (msg: string, attr?: any) => {
      if (__DEV__) {
        console.warn(`[PostHog Warn] ${msg}`, attr || {});
      }
    },
    error: (msg: string, attr?: any) => {
      if (__DEV__) {
        console.error(`[PostHog Error] ${msg}`, attr || {});
      }
    },
  };
}
