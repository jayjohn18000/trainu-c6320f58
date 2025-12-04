import { trainuTheme } from "./trainuTheme";

export type ThemeConfig = {
  background: string;
  text: string;
  primary: string;
  accent: string;
};

export const applyTrainerTheme = (override?: Partial<ThemeConfig>): ThemeConfig => {
  if (!override) return trainuTheme;
  return { ...trainuTheme, ...override };
};
