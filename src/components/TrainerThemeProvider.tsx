import { ReactNode, useMemo } from "react";
import { getThemeVariables, PrimaryColorKey, BackgroundStyleKey } from "@/theme/presetThemes";

type TrainerThemeProviderProps = {
  primaryColor?: string;
  backgroundStyle?: string;
  children: ReactNode;
};

const TrainerThemeProvider = ({
  primaryColor = "orange",
  backgroundStyle = "dark",
  children,
}: TrainerThemeProviderProps) => {
  const themeStyles = useMemo(() => {
    const variables = getThemeVariables(
      primaryColor as PrimaryColorKey,
      backgroundStyle as BackgroundStyleKey
    );
    
    // Convert to CSS custom properties
    return Object.entries(variables).reduce((acc, [key, value]) => {
      acc[key as keyof typeof acc] = value;
      return acc;
    }, {} as Record<string, string>);
  }, [primaryColor, backgroundStyle]);

  return (
    <div style={themeStyles} className="min-h-screen bg-background text-foreground">
      {children}
    </div>
  );
};

export default TrainerThemeProvider;
