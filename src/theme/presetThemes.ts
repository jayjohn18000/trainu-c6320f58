// Color palette options for trainers
export const primaryColors = {
  orange: { name: "Orange", hsl: "16 100% 57%", hex: "#ff5f26" },
  red: { name: "Red", hsl: "0 84% 60%", hex: "#ef4444" },
  blue: { name: "Blue", hsl: "217 91% 60%", hex: "#3b82f6" },
  green: { name: "Green", hsl: "142 76% 45%", hex: "#22c55e" },
  purple: { name: "Purple", hsl: "270 70% 65%", hex: "#a855f7" },
  gold: { name: "Gold", hsl: "38 92% 50%", hex: "#f59e0b" },
  pink: { name: "Pink", hsl: "340 75% 55%", hex: "#ec4899" },
  cyan: { name: "Cyan", hsl: "189 94% 55%", hex: "#22d3ee" },
} as const;

export const backgroundStyles = {
  dark: {
    name: "Dark",
    background: "222 47% 4%",
    foreground: "210 40% 98%",
    card: "217 33% 8%",
    muted: "217 33% 12%",
    border: "217 33% 15%",
  },
  light: {
    name: "Light",
    background: "0 0% 100%",
    foreground: "222 47% 11%",
    card: "0 0% 98%",
    muted: "220 14% 96%",
    border: "220 13% 91%",
  },
} as const;

export type PrimaryColorKey = keyof typeof primaryColors;
export type BackgroundStyleKey = keyof typeof backgroundStyles;

// Generate CSS variables for a theme combination
export function getThemeVariables(
  primaryColor: PrimaryColorKey = "orange",
  backgroundStyle: BackgroundStyleKey = "dark"
) {
  const primary = primaryColors[primaryColor] || primaryColors.orange;
  const bg = backgroundStyles[backgroundStyle] || backgroundStyles.dark;

  return {
    "--primary": primary.hsl,
    "--primary-foreground": backgroundStyle === "dark" ? "222 47% 4%" : "0 0% 100%",
    "--accent": primary.hsl,
    "--accent-foreground": backgroundStyle === "dark" ? "222 47% 4%" : "0 0% 100%",
    "--ring": primary.hsl,
    "--background": bg.background,
    "--foreground": bg.foreground,
    "--card": bg.card,
    "--card-foreground": bg.foreground,
    "--muted": bg.muted,
    "--muted-foreground": backgroundStyle === "dark" ? "215 20% 55%" : "220 9% 46%",
    "--border": bg.border,
    "--input": bg.muted,
    "--popover": bg.card,
    "--popover-foreground": bg.foreground,
    "--secondary": bg.muted,
    "--secondary-foreground": bg.foreground,
  };
}
