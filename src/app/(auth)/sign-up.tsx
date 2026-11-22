import { AuthButton } from "@/components/auth/AuthButton";
import { AuthErrorAlert } from "@/components/auth/AuthErrorAlert";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { AuthInput } from "@/components/auth/AuthInput";
import { posthog } from "@/config/posthog";
import { useSignIn, useSignUp } from "@clerk/expo/legacy";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Resend cooldown timer
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (resendCooldown > 0) {
      timer = setTimeout(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const validateForm = () => {
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
    } else if (password.length < 15) {
      setPasswordError("Password must be at least 15 characters");
      isValid = false;
    }

    return isValid;
  };

  const handleSignUp = async () => {
    if (!isLoaded || !signUp || !validateForm()) return;

    setLoading(true);
    setGeneralError(null);

    try {
      const emailTrimmed = email.trim();

      await signUp.create({
        emailAddress: emailTrimmed,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
      setResendCooldown(30);
    } catch (err: any) {
      const errMsg =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        err?.message ||
        "Could not create account. Please try again.";
      setGeneralError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!isLoaded || !signUp) return;
    const trimmedCode = code.trim();
    if (!trimmedCode) {
      setCodeError("Please enter the 6-digit verification code");
      return;
    }

    setLoading(true);
    setGeneralError(null);
    setCodeError("");

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: trimmedCode,
      });

      // 1. Success path
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        posthog?.capture("user_signed_up");
        router.replace("/(tabs)");
        return;
      }

      // 2. Missing requirements (such as phone_number in Clerk dashboard)
      if (completeSignUp.status === "missing_requirements") {
        const missing = completeSignUp.missingFields || [];
        if (missing.includes("phone_number")) {
          setGeneralError(
            "Phone number is required in your Clerk Dashboard settings. In Clerk Dashboard -> Configure -> Email, Phone, Username, please disable 'Phone number' (set to Optional or Don't use) to enable email-only sign up.",
          );
          return;
        }

        // Auto sign-in fallback if email was verified
        if (
          completeSignUp.verifications?.emailAddress?.status === "verified" &&
          signIn &&
          password
        ) {
          try {
            const signInRes = await signIn.create({
              identifier: email.trim(),
              password,
            });
            if (signInRes.status === "complete" && signInRes.createdSessionId) {
              await setActive({ session: signInRes.createdSessionId });
              posthog?.capture("user_signed_up");
              router.replace("/(tabs)");
              return;
            }
          } catch (autoErr) {
            console.warn("Auto sign-in fallback error:", autoErr);
          }
        }

        setGeneralError(
          "Verification could not be completed. Please check your Clerk dashboard settings.",
        );
        return;
      }

      if (signUp.createdSessionId) {
        await setActive({ session: signUp.createdSessionId });
        posthog?.capture("user_signed_up");
        router.replace("/(tabs)");
        return;
      }

      setGeneralError("Verification could not be completed.");
    } catch (err: any) {
      const errCode = err?.errors?.[0]?.code || "";
      const errMsg = (
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        err?.message ||
        ""
      ).toLowerCase();

      // If already verified, try setting active or signing in
      if (
        errCode === "verification_already_verified" ||
        errMsg.includes("already verified") ||
        errMsg.includes("already been verified")
      ) {
        if (signUp.createdSessionId) {
          await setActive({ session: signUp.createdSessionId });
          posthog?.capture("user_signed_up");
          router.replace("/(tabs)");
          return;
        }

        if (signIn && email.trim() && password) {
          try {
            const signInRes = await signIn.create({
              identifier: email.trim(),
              password,
            });
            if (signInRes.status === "complete" && signInRes.createdSessionId) {
              await setActive({ session: signInRes.createdSessionId });
              posthog?.capture("user_signed_in");
              router.replace("/(tabs)");
              return;
            }
          } catch (autoErr) {
            console.warn("Auto sign in failed:", autoErr);
          }
        }

        setGeneralError("This email is already verified. Please sign in.");
        return;
      }

      const displayMsg =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        err?.message ||
        "Invalid verification code. Please check and try again.";
      setGeneralError(displayMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!isLoaded || !signUp || resendCooldown > 0) return;

    setLoading(true);
    setGeneralError(null);

    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setResendCooldown(30);
    } catch (err: any) {
      const msg =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        err?.message ||
        "Could not resend code. Please try again later.";
      setGeneralError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (pendingVerification) {
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
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingTop: 32,
              paddingBottom: 40,
              flexGrow: 1,
              justifyContent: "center",
            }}
            keyboardShouldPersistTaps="handled"
          >
            <AuthHeader
              title="Verify your email"
              subtitle="We sent a verification code to"
              email={email}
            />

            <View
              className="rounded-3xl border border-black/10 p-5 shadow-sm"
              style={{ backgroundColor: "#fff8e7" }}
            >
              <AuthErrorAlert message={generalError} />

              <AuthInput
                label="Verification Code"
                placeholder="Enter 6-digit code"
                keyboardType="number-pad"
                maxLength={6}
                value={code}
                onChangeText={(t) => {
                  setCode(t);
                  if (codeError) setCodeError("");
                  if (generalError) setGeneralError(null);
                }}
                error={codeError}
              />

              <AuthButton
                title="Verify Email"
                onPress={handleVerify}
                loading={loading}
                disabled={loading}
              />

              {/* Resend Code link */}
              <Pressable
                disabled={resendCooldown > 0 || loading}
                onPress={handleResendCode}
                className="mt-4 items-center"
                hitSlop={8}
              >
                <Text
                  className="text-sm font-sans-medium"
                  style={{
                    color:
                      resendCooldown > 0 ? "rgba(8, 17, 38, 0.4)" : "#ea7a53",
                  }}
                >
                  {resendCooldown > 0
                    ? `Resend code in ${resendCooldown}s`
                    : "Resend Code"}
                </Text>
              </Pressable>
            </View>

            {/* Link to Sign In */}
            <View className="mt-6 flex-row items-center justify-center gap-1.5">
              <Text className="text-sm font-sans-medium text-black/60">
                Already have an account?
              </Text>
              <Link href="/(auth)/sign-in">
                <Text className="text-sm font-sans-bold text-accent">
                  Sign in
                </Text>
              </Link>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

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
            title="Create your account"
            subtitle="Start tracking your subscriptions and optimize every payment"
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

            <View className="mb-1">
              <AuthInput
                label="Password"
                placeholder="Create a strong password"
                isPassword
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (passwordError) setPasswordError("");
                  if (generalError) setGeneralError(null);
                }}
                error={passwordError}
              />
              <Text className="-mt-2 mb-2 text-xs font-sans-regular text-muted-foreground">
                Minimum 15 characters required
              </Text>
            </View>

            <AuthButton
              title="Create Account"
              onPress={handleSignUp}
              loading={loading}
              disabled={loading}
            />
          </View>

          {/* Switch to Sign In */}
          <View className="mt-6 flex-row items-center justify-center gap-1.5">
            <Text className="text-sm font-sans-medium text-black/60">
              Already have an account?
            </Text>
            <Link href="/(auth)/sign-in">
              <Text className="text-sm font-sans-bold text-accent">
                Sign in
              </Text>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
