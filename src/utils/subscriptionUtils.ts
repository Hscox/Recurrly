import { icons } from "@/constants/icons";

export interface BrandInfo {
  name: string;
  aliases: string[];
  category: string;
  color: string;
  icon?: any;
  iconType: "image" | "vector" | "monogram";
  vectorIcon?: string;
  monogram?: string;
  iconBg?: string;
  iconColor?: string;
}

export const CATEGORY_COLORS: Record<string, string> = {
  Entertainment: "#ff7666",
  "AI Tools": "#cfe2fe",
  "Developer Tools": "#ded2f9",
  Design: "#f3b744",
  Productivity: "#c6f1d6",
  Cloud: "#bedafc",
  Storage: "#bedafc",
  Music: "#88e7a4",
  Other: "#fed7aa",
};

export const COLOR_PALETTE = [
  { name: "Coral", value: "#ff7666" },
  { name: "Amber", value: "#f3b744" },
  { name: "Lavender", value: "#ded2f9" },
  { name: "Sky", value: "#cfe2fe" },
  { name: "Mint", value: "#c6f1d6" },
  { name: "Spring", value: "#88e7a4" },
  { name: "Periwinkle", value: "#bedafc" },
  { name: "Peach", value: "#fed7aa" },
  { name: "Sand", value: "#eadece" },
  { name: "Rose", value: "#ffc5bf" },
];

export const KNOWN_BRANDS: BrandInfo[] = [
  {
    name: "Gemini Pro",
    aliases: ["gemini", "gemini pro", "gemini advanced", "google gemini", "bard"],
    category: "AI Tools",
    color: "#cfe2fe",
    icon: icons.gemini,
    iconType: "image",
    monogram: "GP",
    iconBg: "#0e1320",
    iconColor: "#ffffff",
    vectorIcon: "sparkles",
  },
  {
    name: "Netflix",
    aliases: ["netflix", "nflx"],
    category: "Entertainment",
    color: "#ff7666",
    icon: icons.netflix,
    iconType: "image",
    monogram: "NF",
    iconBg: "#e50914",
    iconColor: "#ffffff",
  },
  {
    name: "Spotify",
    aliases: ["spotify"],
    category: "Entertainment",
    color: "#88e7a4",
    icon: icons.spotify,
    iconType: "image",
    monogram: "SP",
    iconBg: "#1db954",
    iconColor: "#ffffff",
  },
  {
    name: "Claude Pro",
    aliases: ["claude", "claude pro", "anthropic"],
    category: "AI Tools",
    color: "#cfe2fe",
    icon: icons.claude,
    iconType: "image",
    monogram: "CP",
    iconBg: "#d97706",
    iconColor: "#ffffff",
  },
  {
    name: "Adobe Creative Cloud",
    aliases: ["adobe", "creative cloud", "photoshop", "illustrator"],
    category: "Design",
    color: "#f3b744",
    icon: icons.adobe,
    iconType: "image",
    monogram: "AD",
    iconBg: "#ff0000",
    iconColor: "#ffffff",
  },
  {
    name: "GitHub Pro",
    aliases: ["github", "github pro"],
    category: "Developer Tools",
    color: "#ded2f9",
    icon: icons.github,
    iconType: "image",
    monogram: "GH",
    iconBg: "#181717",
    iconColor: "#ffffff",
  },
  {
    name: "Canva Pro",
    aliases: ["canva", "canva pro"],
    category: "Design",
    color: "#c6f1d6",
    icon: icons.canva,
    iconType: "image",
    monogram: "CV",
    iconBg: "#00c4cc",
    iconColor: "#ffffff",
  },
  {
    name: "Figma",
    aliases: ["figma"],
    category: "Design",
    color: "#ffc5bf",
    icon: icons.figma,
    iconType: "image",
    monogram: "FG",
    iconBg: "#f24e1e",
    iconColor: "#ffffff",
  },
  {
    name: "Notion",
    aliases: ["notion"],
    category: "Productivity",
    color: "#eadece",
    icon: icons.notion,
    iconType: "image",
    monogram: "NT",
    iconBg: "#000000",
    iconColor: "#ffffff",
  },
  {
    name: "Dropbox",
    aliases: ["dropbox"],
    category: "Cloud",
    color: "#bedafc",
    icon: icons.dropbox,
    iconType: "image",
    monogram: "DB",
    iconBg: "#0061ff",
    iconColor: "#ffffff",
  },
  {
    name: "ChatGPT / OpenAI",
    aliases: ["openai", "chatgpt", "gpt"],
    category: "AI Tools",
    color: "#c6f1d6",
    icon: icons.openai,
    iconType: "image",
    monogram: "AI",
    iconBg: "#10a37f",
    iconColor: "#ffffff",
  },
  {
    name: "Medium",
    aliases: ["medium"],
    category: "Entertainment",
    color: "#f6eecf",
    icon: icons.medium,
    iconType: "image",
    monogram: "MD",
    iconBg: "#000000",
    iconColor: "#ffffff",
  },
  {
    name: "YouTube Premium",
    aliases: ["youtube", "yt", "youtube premium", "youtube music"],
    category: "Entertainment",
    color: "#ffc5bf",
    iconType: "monogram",
    monogram: "YT",
    iconBg: "#ff0000",
    iconColor: "#ffffff",
    vectorIcon: "play-circle",
  },
  {
    name: "Disney+",
    aliases: ["disney", "disney+", "disney plus"],
    category: "Entertainment",
    color: "#cfe2fe",
    iconType: "monogram",
    monogram: "D+",
    iconBg: "#113ccf",
    iconColor: "#ffffff",
    vectorIcon: "film",
  },
  {
    name: "Apple One / Music",
    aliases: ["apple", "apple music", "icloud", "apple tv"],
    category: "Music",
    color: "#e2e8f0",
    iconType: "monogram",
    monogram: "AP",
    iconBg: "#000000",
    iconColor: "#ffffff",
    vectorIcon: "logo-apple",
  },
  {
    name: "Amazon Prime",
    aliases: ["amazon", "prime", "prime video", "amazon prime"],
    category: "Entertainment",
    color: "#bedafc",
    iconType: "vector",
    vectorIcon: "play-circle",
    monogram: "AM",
    iconBg: "#00a8e1",
    iconColor: "#ffffff",
  },
  {
    name: "Microsoft Copilot",
    aliases: ["copilot", "microsoft copilot", "bing chat"],
    category: "AI Tools",
    color: "#cfe2fe",
    iconType: "vector",
    vectorIcon: "sparkles",
    monogram: "CO",
    iconBg: "#0078d4",
    iconColor: "#ffffff",
  },
  {
    name: "Perplexity AI",
    aliases: ["perplexity", "perplexity ai"],
    category: "AI Tools",
    color: "#cfe2fe",
    iconType: "vector",
    vectorIcon: "sparkles",
    monogram: "PX",
    iconBg: "#20808d",
    iconColor: "#ffffff",
  },
];

export function getInitials(name: string): string {
  if (!name || !name.trim()) return "SUB";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.trim().slice(0, 2).toUpperCase();
}

export function detectBrand(name: string): BrandInfo | null {
  if (!name) return null;
  const clean = name.toLowerCase().trim();
  for (const b of KNOWN_BRANDS) {
    if (
      b.aliases.some((alias) => {
        const cleanAlias = alias.toLowerCase().trim();
        return (
          clean === cleanAlias ||
          clean.startsWith(cleanAlias) ||
          clean.includes(cleanAlias) ||
          (cleanAlias.length >= 4 && cleanAlias.includes(clean))
        );
      })
    ) {
      return b;
    }
  }
  return null;
}

export function getSubscriptionColor(
  name?: string,
  category?: string,
): string {
  if (name) {
    const brand = detectBrand(name);
    if (brand?.color) return brand.color;
  }
  if (category && CATEGORY_COLORS[category]) {
    return CATEGORY_COLORS[category];
  }
  return "#fed7aa";
}

export function getMonogramBackground(
  name: string,
  category?: string,
): string {
  if (name) {
    const brand = detectBrand(name);
    if (brand?.iconBg) return brand.iconBg;
  }
  const darks = [
    "#1e293b",
    "#0f172a",
    "#18181b",
    "#312e81",
    "#14532d",
    "#701a75",
    "#7c2d12",
  ];
  let hash = 0;
  for (let i = 0; i < (name || "").length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  return darks[Math.abs(hash) % darks.length];
}
