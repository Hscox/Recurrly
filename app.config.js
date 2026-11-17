const fs = require("fs");
const path = require("path");
const appConfig = require("./app.json");

// Read .env if present
const envPath = path.resolve(__dirname, ".env");
const envVars = {};
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const idx = trimmed.indexOf("=");
      if (idx !== -1) {
        envVars[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim();
      }
    }
  }
}

module.exports = {
  ...appConfig.expo,
  extra: {
    ...(appConfig.expo?.extra || {}),
    posthogProjectToken:
      process.env.EXPO_PUBLIC_POSTHOG_PROJECT_TOKEN ||
      envVars.EXPO_PUBLIC_POSTHOG_PROJECT_TOKEN,
    posthogHost:
      process.env.EXPO_PUBLIC_POSTHOG_HOST ||
      envVars.EXPO_PUBLIC_POSTHOG_HOST ||
      "https://us.i.posthog.com",
  },
};
