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
    backgroundElevated: "0 0% 8%",
    cardBorder: "0 0% 18%",
    gradientCard: "linear-gradient(145deg, hsl(0 0% 12%) 0%, hsl(0 0% 7%) 100%)",
    gradientSurface: "linear-gradient(180deg, hsl(217 33% 8%), hsl(217 33% 6%))",
  },
  light: {
    name: "Light",
    background: "0 0% 100%",
    foreground: "222 47% 11%",
    card: "0 0% 98%",
    muted: "220 14% 96%",
    border: "220 13% 91%",
    backgroundElevated: "220 14% 96%",
    cardBorder: "220 13% 85%",
    gradientCard: "linear-gradient(145deg, hsl(0 0% 100%) 0%, hsl(220 14% 96%) 100%)",
    gradientSurface: "linear-gradient(180deg, hsl(0 0% 100%), hsl(220 14% 96%))",
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
    // Theme-aware background and card styles
    "--background-elevated": bg.backgroundElevated,
    "--card-border": bg.cardBorder,
    "--gradient-card": bg.gradientCard,
    "--gradient-surface": bg.gradientSurface,
    // Dynamic gradients and shadows based on primary color
    "--gradient-primary": `linear-gradient(135deg, hsl(${primary.hsl}), hsl(${primary.hsl} / 0.8))`,
    "--shadow-glow": `0 0 40px -8px hsl(${primary.hsl} / 0.3)`,
    "--shadow-button": `0 4px 24px -4px hsl(${primary.hsl} / 0.4)`,
    "--shadow-glow-intense": `0 0 60px -8px hsl(${primary.hsl} / 0.5)`,
    "--shadow-elevated": `0 8px 40px -8px hsl(${primary.hsl} / 0.15)`,
    "--primary-glow": primary.hsl,
    "--sidebar-primary": primary.hsl,
    "--sidebar-ring": primary.hsl,
  };
}
