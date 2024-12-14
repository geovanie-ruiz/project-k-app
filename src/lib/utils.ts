import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isDarkTheme(
  theme: string | undefined,
  systemTheme: 'dark' | 'light' | undefined
) {
  if (theme === 'light') return false;
  return theme === 'dark' || systemTheme === 'dark';
}