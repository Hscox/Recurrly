import { AuthButton } from "@/components/auth/AuthButton";
import { AuthErrorAlert } from "@/components/auth/AuthErrorAlert";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { AuthInput } from "@/components/auth/AuthInput";
import { posthog } from "@/config/posthog";
import { useAuth, useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const { isSignedIn, isLoaded: isAuthLoaded } = useAuth();
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // If already signed in, immediately navigate to the main app
  useEffect(() => {
    if (isAuthLoaded && isSignedIn) {
      router.replace("/(tabs)");
    }
  }, [isAuthLoaded, isSignedIn]);

  const validate = () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");
    setGeneralError(null);

    const emailTrimmed = email.trim();
    if (!emailTrimmed) {
      setEmailError("Email address is required");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    }

    return isValid;
  };

  const handleSignIn = async () => {
    if (!isLoaded || !signIn || !validate()) return;

    setLoading(true);
    setGeneralError(null);

    try {
      const emailTrimmed = email.trim();

      const signInAttempt = await signIn.create({
        identifier: emailTrimmed,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        posthog?.capture("user_signed_in");
        router.replace("/(tabs)");
        return;
      }

      if (signInAttempt.status === "needs_first_factor") {
        const factors = signInAttempt.supportedFirstFactors || [];
        const passwordFactor = factors.find(
          (f: any) => f.strategy === "password"
        );
        if (passwordFactor) {
          const passRes = await signIn.attemptFirstFactor({
            strategy: "password",
            password,
          });
          if (passRes.status === "complete") {
            await setActive({ session: passRes.createdSessionId });
            posthog?.capture("user_signed_in");
            router.replace("/(tabs)");
            return;
          }
        }
      }

      if (signInAttempt.createdSessionId) {
        await setActive({ session: signInAttempt.createdSessionId });
        posthog?.capture("user_signed_in");
        router.replace("/(tabs)");
        return;
      }

      setGeneralError("Could not complete sign in. Please verify your credentials.");
    } catch (err: any) {
      const errCode = err?.errors?.[0]?.code || "";
      const errMsg =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        err?.message ||
        "";

      if (
        errCode === "session_exists" ||
        errMsg.toLowerCase().includes("session already exists")
      ) {
        router.replace("/(tabs)");
        return;
      }

      if (
        errCode === "form_identifier_not_found" ||
        errMsg.toLowerCase().includes("couldn't find your account") ||
        errMsg.toLowerCase().includes("not found")
      ) {
        setGeneralError(
          "No account found with this email. Please check your email or tap 'Create Account' below."
        );
        return;
      }

      if (
        errCode === "form_password_incorrect" ||
        errMsg.toLowerCase().includes("password is incorrect") ||
        errMsg.toLowerCase().includes("invalid password")
      ) {
        setGeneralError("Incorrect password. Please try again.");
        return;
      }

      setGeneralError(errMsg || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      className="flex-1 bg-background"
      style={{ flex: 1, backgroundColor: "#fff9e3" }}
      edges={["top", "bottom"]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
        style={{ flex: 1 }}
      >
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 16,
            paddingBottom: 40,
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <AuthHeader
            title="Welcome back"
            subtitle="Sign in to continue managing your subscriptions"
          />

          <View
            className="rounded-3xl border border-black/10 p-5 shadow-sm"
            style={{ backgroundColor: "#fff8e7" }}
          >
            <AuthErrorAlert message={generalError} />

            <AuthInput
              label="Email Address"
              placeholder="name@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (emailError) setEmailError("");
                if (generalError) setGeneralError(null);
              }}
              error={emailError}
            />

            <AuthInput
              label="Password"
              placeholder="Enter your password"
              isPassword
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (passwordError) setPasswordError("");
                if (generalError) setGeneralError(null);
              }}
              error={passwordError}
            />

            <AuthButton
              title="Sign in"
              onPress={handleSignIn}
              loading={loading}
              disabled={loading}
            />
          </View>

          {/* Switch to Sign Up */}
          <View className="mt-6 flex-row items-center justify-center gap-1.5">
            <Text className="text-sm font-sans-medium text-black/60">
              Don't have an account?
            </Text>
            <Link href="/(auth)/sign-up">
              <Text className="text-sm font-sans-bold text-accent">
                Create Account
              </Text>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
